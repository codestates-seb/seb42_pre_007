import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
//styled components
import {
  AskContainer,
  AskNotice,
  AskFormButton,
  AskIntroduceCard,
  AskSingleForm,
  AskTitle,
  AskArticleWrapper,
  AskMdEditorWrapper,
  AskMdEditorBorder,
  AskWarning,
  AskTagInput,
  AskTag,
  AskPostButtonWrapper,
  AskPostButton,
  AskDiscardButton,
  AskTagOfferContainer,
  AskTagOffered,
} from '../styles/askform';
//markdown editor
import MDEditor from '@uiw/react-md-editor';

let getTagsTimeout = null;

export function AskForm({ user, auth }) {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URI;
  //토큰이 없으면 메인으로 네비게이트
  useEffect(() => {
    const authorization = sessionStorage.getItem('authorization');
    if (!authorization) navigate('/');
  }, []);

  //title,content,tags의 내용을 저장
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  //태그 배열에 저장되기 전 input
  const [tagInput, setTagInput] = useState('');
  //isReview
  const [isReview, setIsReview] = useState(false);
  //next버튼을 위한 현재 단계
  const [nowStep, setNowStep] = useState(0);
  //introduceCard를 위한 마지막 focus 위치
  const [nowFocus, setNowFocus] = useState(0);
  //유효성 체크
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isTagsValid, setIsTagsValid] = useState(false);
  //유사 :focus 효과를 위한 state
  const [isMdEditorFocus, setIsMdEditorFocus] = useState(false);
  const [isAskTagInputFocus, setIsAskTagInputFocus] = useState(false);
  //tagInput에 따른 tag 제안
  const [tagsOffer, setTagsOffer] = useState([]);

  //get taglist from stackexchange api after a second
  useEffect(() => {
    if (tagInput.length !== 0) {
      // console.log(`getTagsTimeout Start`);
      if (getTagsTimeout) clearTimeout(getTagsTimeout);
      getTagsTimeout = setTimeout(() => {
        axios({
          method: 'get',
          url: 'https://api.stackexchange.com/2.3/tags',
          params: {
            order: 'desc',
            sort: 'popular',
            site: 'stackoverflow',
            inname: tagInput,
          },
        })
          .then((res) => {
            setTagsOffer(res.data);
            // console.log(`getTagsTimeout Axios`);
          })
          .catch((err) => console.log(err));
      }, 500);
    } else setTagsOffer([]);
  }, [tagInput]);

  //test console.log
  // useEffect(() => {
  //   console.log(tagsOffer);
  // }, [tagsOffer]);

  //next버튼은 현재 step에서 1을 추가합니다.
  const nextButtonHandler = (e) => {
    const nextStep = Number(e.target.value) + 1;
    setNowStep(nextStep);
    setNowFocus(nextStep);
  };

  //title onChange
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  //tag 추가
  const tagInputHandler = (newTag) => {
    // console.log(newTag);
    if (newTag.length === 0) return;
    if (tags.includes(newTag)) {
      setTagInput('');
      setTagsOffer([]);
      return;
    }
    setTags([...tags, newTag]);
    setTagInput('');
    setTagsOffer([]);
  };
  //tag 제거
  const tagButtonHandler = (e) => {
    setTags((prevState) => {
      let newTags = [...prevState];
      newTags.splice(e.target.value, 1);
      return newTags;
    });
  };
  //유효성 검사
  //is title length over 15?
  useEffect(() => {
    setIsTitleValid(title.length > 15);
  }, [title]);
  //is content length is over 30?
  useEffect(() => {
    setIsContentValid(content.length > 30);
  }, [content]);
  //is tags array length not 0?
  useEffect(() => {
    setIsTagsValid(tags.length > 0 && tags.length <= 5);
  }, [tags]);

  //질문 post
  const postButtonHandler = () => {
    if (!isTitleValid || !isContentValid || !isTagsValid) return;
    const data = {
      title,
      content,
      user: user['displayName'],
      tags,
    };
    console.log(URI)
    console.log(JSON.stringify(data))
    axios({
      method: 'post',
      url: `${URI}/questions/ask`,
      data,
      headers: {
        authorization: auth,
      },
    })
      .then((res) => {
        // console.log(res.data)
        navigate(`/questions/${res.data['data']}`);
      })
      .catch((err) => {
        console.log(auth)
        console.log(err);
      });
  };
  //Discard draft 버튼
  const discardButtonHandler = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setIsReview(false);
    setNowStep(0);
    setNowFocus(0);
  };

  // useEffect(()=>{
  //   console.log(URI);
  // },[])

  return (
    <AskContainer>
      <AskTitle>
        <h1>
          {isReview ? 'Review your question' : 'Ask a public question'}
        </h1>
        <div></div>
      </AskTitle>
      {isReview ? (
        <AskNotice padding={16}>
          <div>
            Please do a final review of your question and then post.
          </div>
        </AskNotice>
      ) : (
        <AskNotice padding={24}>
          <h2>Writing a good question</h2>
          <div>
            <p>
              You’re ready to ask a programming-related question and this
              form will help guide you through the process.
            </p>
            <p>
              Looking to ask a non-programming question? See the topics
              here to find a relevant site.
            </p>
          </div>
          <h5>Steps</h5>
          <ul>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>
              Describe what you tried and what you expected to happen.
            </li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </AskNotice>
      )}
      <AskArticleWrapper>
        <AskSingleForm
          step={0}
          nowStep={nowStep}
          isReview={isReview}
          valid={isTitleValid}>
          <label className='s-label' htmlFor='title'>
            Title
          </label>
          <label className='description' htmlFor='title'>
            Be specific and imagine you’re asking a question to another
            person.
          </label>
          <input
            id='title'
            value={title}
            onChange={titleHandler}
            onFocus={() => setNowFocus(0)}
            placeholder='e.g. Is there an R function htmlFor=finding the index of an element in a vector?'></input>
          {isReview && title.length === 0 ? (
            <AskWarning>Title is missing.</AskWarning>
          ) : null}
          {isReview && title.length < 15 && title.length > 0 ? (
            <AskWarning>Title must be at least 15 characters.</AskWarning>
          ) : null}
          <AskFormButton
            valid={true}
            value={0}
            onClick={nextButtonHandler}>
            Next
          </AskFormButton>
        </AskSingleForm>

        <AskIntroduceCard step={0} nowFocus={nowFocus} nowStep={nowStep}>
          <div className='introduce-card-title'>Writing a good title</div>
          <div className='introduce-card-content'>
            <AskSvgPencil />
            <div className='introduce-card-paragraph'>
              <p>Your title should summarize the problem.</p>
              <p>
                You might find that you have a better idea of your title
                after writing out the rest of the question.
              </p>
            </div>
          </div>
        </AskIntroduceCard>
      </AskArticleWrapper>
      <AskArticleWrapper>
        <AskSingleForm step={1} nowStep={nowStep}>
          <label className='s-label' htmlFor='md-editor'>
            Body
          </label>
          <label className='description' htmlFor='md-editor'>
            The body of your question contains your problem details and
            results. Minimum 30 characters.
          </label>
          <AskMdEditorWrapper>
            <AskMdEditorBorder
              valid={isContentValid}
              isReview={isReview}
              focus={isMdEditorFocus}></AskMdEditorBorder>
            <MDEditor
              onFocus={() => {
                setNowFocus(1);
                setIsMdEditorFocus(true);
              }}
              onBlur={() => setIsMdEditorFocus(false)}
              value={content}
              onChange={setContent}
              preview='edit'
              id='md-editor'
            />
          </AskMdEditorWrapper>
          {isReview && content.length === 0 ? (
            <AskWarning>Body is missing.</AskWarning>
          ) : null}
          {isReview && content.length < 30 && content.length > 0 ? (
            <AskWarning>Body must be at least 30 characters.</AskWarning>
          ) : null}
          <AskFormButton
            value={1}
            valid={isContentValid}
            onClick={nextButtonHandler}>
            Next
          </AskFormButton>
        </AskSingleForm>

        {isReview ? (
          <AskIntroduceCard step={1} nowFocus={nowFocus} nowStep={nowStep}>
            <div className='introduce-card-title'>
              Proof-read before posting
            </div>
            <div className='introduce-card-content'>
              <AskSvgPencil />
              <div className='introduce-card-paragraph'>
                <p>
                  Now that you’re ready to post your question, read through
                  it from start to finish. Does it make sense?
                </p>
                <p>
                  Add any details you missed and read through it again. Now
                  is a good time to make sure that your title still
                  describes the problem!
                </p>
              </div>
            </div>
          </AskIntroduceCard>
        ) : (
          <AskIntroduceCard step={1} nowFocus={nowFocus} nowStep={nowStep}>
            <div className='introduce-card-title'>
              Introduce the problem
            </div>
            <div className='introduce-card-content'>
              <AskSvgPencil />
              <div className='introduce-card-paragraph'>
                <p>
                  Explain how you encountered the problem you’re trying to
                  solve, and any difficulties that have prevented you from
                  solving it yourself.
                </p>
              </div>
            </div>
          </AskIntroduceCard>
        )}
      </AskArticleWrapper>
      <AskArticleWrapper>
        <AskSingleForm
          step={2}
          nowStep={nowStep}
          valid={isTagsValid}
          isReview={isReview}>
          <label className='s-label'>Tags</label>
          <label className='description'>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </label>
          <AskTagInput
            isReview={isReview}
            valid={isTagsValid}
            focus={isAskTagInputFocus}>
            {tags.map((str, idx) => (
              <AskTag key={str}>
                {str}
                <button value={idx} onClick={tagButtonHandler}>
                  ✖
                </button>
              </AskTag>
            ))}
            <input
              value={tagInput}
              placeholder={
                tags.length === 0 ? `e.g. (django python .net)` : ''
              }
              onBlur={() => {
                setIsAskTagInputFocus(false);
              }}
              onFocus={() => {
                setIsAskTagInputFocus(true);
                setNowFocus(2);
              }}
              onChange={(e) => {
                setTagInput(e.target.value);
              }}></input>
            <AskTagsOffer
              isAskTagInputFocus={isAskTagInputFocus}
              setIsAskTagInputFocus={setIsAskTagInputFocus}
              tagsOffer={tagsOffer}
              tagInputHandler={tagInputHandler}
            />
          </AskTagInput>
          {isReview && tags.length === 0 ? (
            <AskWarning>
              Please enter at least one tag; see a list of{' '}
              <a href='https://stackoverflow.com/tags'>popular tags.</a>
            </AskWarning>
          ) : null}
          {isReview && tags.length > 5 ? (
            <AskWarning>Please enter no more than 5 tags.</AskWarning>
          ) : null}
          {isReview ? null : (
            <AskFormButton valid={true} onClick={() => setIsReview(true)}>
              Review your question
            </AskFormButton>
          )}
        </AskSingleForm>

        <AskIntroduceCard step={2} nowFocus={nowFocus} nowStep={nowStep}>
          <div className='introduce-card-title'>Adding tags</div>
          <div className='introduce-card-content'>
            <AskSvgPencil />
            <div className='introduce-card-paragraph'>
              <p>
                Tags help ensure that your question will get attention from
                the right people.
              </p>
              <p>
                Tag things in more than one way so people can find them
                more easily. Add tags for product lines, projects, teams,
                and the specific technologies or languages used.
              </p>
              <p>
                <a href='https://stackoverflow.com/help/tagging'>
                  Learn more about tagging
                </a>
              </p>
            </div>
          </div>
        </AskIntroduceCard>
      </AskArticleWrapper>
      <AskPostButtonWrapper>
        {isReview && (
          <AskPostButton
            onClick={postButtonHandler}
            valid={isTitleValid && isContentValid && isTagsValid}>
            Post your question
          </AskPostButton>
        )}
        <AskDiscardButton onClick={discardButtonHandler}>
          Discard draft
        </AskDiscardButton>
      </AskPostButtonWrapper>
    </AskContainer>
  );
}

function AskTagsOffer({
  isAskTagInputFocus,
  setIsAskTagInputFocus,
  tagsOffer,
  tagInputHandler,
}) {
  if (tagsOffer['items'])
    return (
      <AskTagOfferContainer visible={isAskTagInputFocus}>
        {tagsOffer['items'].length > 0 ? (
          tagsOffer['items'].map((obj, idx) => {
            if (idx < 6)
              return (
                <AskTagOffered
                  key={obj.name}
                  onClick={() => {
                    tagInputHandler(obj.name);
                  }}>
                  <div>
                    <AskTag>{obj.name}</AskTag>
                    <span className='ask-tag-offered-count'>
                      {obj.count}
                    </span>
                  </div>
                  <FaQuestionCircle style={{ color: '#6A737C' }} />
                </AskTagOffered>
              );
          })
        ) : (
          <span>No results found</span>
        )}
      </AskTagOfferContainer>
    );
}

function AskSvgPencil() {
  return (
    <svg
      aria-hidden='true'
      className='ask-svg-pencil'
      style={{ width: '48px', minWidth: '48px', height: '48px' }}>
      <path
        d='M31.52 5.2a.34.34 0 0 0-.46.08L7 39.94a.34.34 0 0 0-.06.16l-.54 5.21c-.03.26.24.45.48.34l4.77-2.29c.05-.02.1-.06.13-.1L35.83 8.58a.34.34 0 0 0-.09-.47l-4.22-2.93Z'
        opacity='.2'></path>
      <path d='M28.53 2.82c.4-.58 1.2-.73 1.79-.32l4.22 2.92c.58.4.72 1.2.32 1.79L10.82 41.87c-.13.18-.3.33-.5.43l-4.77 2.28c-.9.44-1.93-.29-1.83-1.29l.55-5.2c.02-.22.1-.43.22-.6L28.53 2.81Zm4.43 3.81L29.74 4.4 28.2 6.6l3.22 2.24 1.53-2.21Zm-2.6 3.76-3.23-2.24-20.32 29.3 3.22 2.24 20.32-29.3ZM5.7 42.4 8.62 41l-2.57-1.78-.34 3.18Zm35.12.3a1 1 0 1 0-.9-1.78 35 35 0 0 1-7.94 3.06c-1.93.43-3.8.3-5.71-.04-.97-.17-1.93-.4-2.92-.64l-.3-.07c-.9-.21-1.81-.43-2.74-.62-2.9-.58-6.6-.49-9.43.65a1 1 0 0 0 .74 1.86c2.4-.96 5.68-1.07 8.3-.55.88.18 1.77.4 2.66.6l.3.08c1 .24 2 .48 3.03.66 2.07.37 4.22.53 6.5.02 3-.67 5.77-1.9 8.41-3.22Z'></path>
    </svg>
  );
}
