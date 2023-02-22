import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
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
} from '../styles/askform';
//markdown editor
import MDEditor from '@uiw/react-md-editor';

export function AskForm({ user }) {
  const navigate = useNavigate();
  const URI=process.env.REACT_APP_API_URI;
  //user 프롭이 없으면 더미 데이터 삽입
  if(!user) user='1234';

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
  //tag 제거
  const TagButtonHandler = (e) => {
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
    setIsTagsValid(tags.length > 0);
  }, [tags]);


  //질문 post
  const postButtonHandler=()=>{
    if(!isTitleValid||!isContentValid||!isTagsValid) return;
    const data={
      title,
      content,
      user,
      tags
    };
    // console.log(data)
    axios({
      method:'post',
      url:`${URI}/ask`,
      data
    })
    .then(res=>navigate(`${URI}/question/${res.data.questionid}`))
    .catch(err=>console.log(err))
  }


  return (
    <AskContainer>
      <AskTitle>
        <h1>
          {isReview ? 'Review your question' : 'Ask a public question'}
        </h1>
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
            <img></img>
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
            <AskMdEditorBorder valid={isContentValid} isReview={isReview} focus={isMdEditorFocus}></AskMdEditorBorder>
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
              <img></img>
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
              <img></img>
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
          valid={isTitleValid}
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
                <button value={idx} onClick={TagButtonHandler}>
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
              }}
              onClick={(e) => {
                if (tagInput.length > 0) {
                  setTags([...tags, e.target.value]);
                  setTagInput('');
                }
              }}></input>
          </AskTagInput>
          {isReview && tags.length === 0 ? (
            <AskWarning>
              Please enter at least one tag; see a list of{' '}
              <a href='https://stackoverflow.com/tags'>popular tags.</a>
            </AskWarning>
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
            <img></img>
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
      <div className='post-btn-wrapper'>
        {isReview && (
          <AskFormButton
          onClick={postButtonHandler}
            valid={isTitleValid && isContentValid && isTagsValid}>
            Post your question
          </AskFormButton>
        )}
      </div>
    </AskContainer>
  );
}

const tagList = [
  'javascript',
  'python',
  'java',
  'c#',
  'php',
  'android',
  'html',
  'jquery',
  'c++',
  'css',
  'ios',
  'mysql',
  'sql',
  'r',
  'node.js',
  'reactjs',
  'arrays',
  'c',
  'asp.net',
  'json',
  'ruby-on-rails',
  'python-3.x',
  '.net',
  'sql-server',
  'swift',
  'django',
  'objective-c',
  'angular',
  'excel',
  'pandas',
  'angularjs',
  'regex',
  'ruby',
  'linux',
  'iphone',
  'ajax',
  'xml',
  'typescript',
  'vba',
  'spring',
  'laravel',
  'asp.net-mvc',
  'database',
  'wordpress',
  'string',
  'mongodb',
  'wpf',
  'postgresql',
];
