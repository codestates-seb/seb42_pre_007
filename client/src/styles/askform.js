import styled from 'styled-components';

const brSm = `3px`;
//styled components
export const AskContainer = styled.section`
  width: 100%;
  padding: 0px 24px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  flex-grow: 1;
`;
export const AskArticle = styled.article`
  width: 100%;
  background-color: #fff;
  padding: 24px;
  text-align: left;
  border-radius: ${brSm};
  border: ${props=>props.isEdit?'0px':'1px'} solid hsl(210, 8%, 90%);
  margin: 12px 0px 0px;
  @media screen and (min-width: 1100px) {
    margin: 0px;
    width: 70%;
  }
`;

export const AskTitle = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  text-align: left;
  height: 130px;
  justify-content: space-between;
  h1 {
    display: block;
    font-weight: 600;
    line-height: 1.3;
    font-size: 27px;
    margin: 24px 0px 27px;
    width: 300px;
    min-width: 300px;
  }
  div {
    @media screen and (min-width: 1100px) {
      width: 500px;
      height: 100%;
      background-repeat: no-repeat;
      background-image: url(/ask-background.svg);
    }
  }
`;
export const AskNotice = styled(AskArticle)`
  margin-top: 0px;
  padding: ${(props) => props.padding}px;
  text-align: left;
  color: #3b4045;
  background-color: #ebf4fb;
  border-radius: ${brSm};
  border: 1px solid #a6ceed;
  h2 {
    font-size: 21px;
    margin: 0px 0px 8px;
  }
  div {
    p:last-child {
      margin: 0px 0px 15px;
    }
    font-size: 15px;
  }
  h5 {
    margin: 0 0 8px;
    font-weight: 600;
    font-size: 13px;
  }
  ul {
    padding-left: auto;
    font-size: 13px;
    list-style: disc;
    list-style-position: inside;
    padding-inline-start: 15px;
    li::marker {
      font-size: 6px;
    }
  }
`;
export const AskSingleForm = styled(AskArticle)`
  @media screen and (min-width: 1100px) {
    min-width: 70%;
  }
  cursor: ${(props) => {
    return props.nowStep >= props.step ? 'auto' : 'not-allowed';
  }};
  opacity: ${(props) => {
    return props.nowStep >= props.step ? '1' : '.3';
  }};
  * {
    pointer-events: ${(props) => {
      return props.nowStep >= props.step ? 'auto' : 'none';
    }};
    cursor: ${(props) => {
      return props.nowStep >= props.step ? 'auto' : 'not-allowed';
    }};
  }

  label.s-label {
    font-size: 15px;
    font-weight: 600;
  }
  label.description {
    margin: 2px 0px 8px;
    font-size: 12px;
  }
  label {
    padding: 0px 2px;
    display: block;
  }
  > input,
  > textarea {
    padding: 7.8px 9.1px;
    width: 100%;
    border: 1px solid
      ${(props) =>
        props.isReview && !props.valid ? '#de4f54' : 'hsl(210, 8%, 75%)'};
    border-radius: ${brSm};
  }
  input {
    ::placeholder {
      color: lightgray;
    }
  }
  > input {
    font-size: 13px;
    height: 32.6px;
    :focus {
      border: 1px solid
        ${(props) =>
          props.isReview && !props.valid ? '#de4f54' : '#59a4de'};
      box-shadow: 0px 0px 0px 4px
        ${(props) =>
          props.isReview && !props.valid ? '#f6e0e0' : '#d9eaf7'};
    }
  }

  > textarea {
    width: 100%;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: ${brSm};
  }
  > button {
    display: ${(props) => {
      return props.nowStep === props.step ? 'inline-block' : 'none';
    }};
  }
`;
export const AskFormButton = styled.button`
  display: block;
  color: #fff;
  background-color: #0a95ff;
  margin: 12px 0px 0px;
  padding: 10.4px;
  font-size: 13px;
  border-radius: ${brSm};
  width: auto;
  cursor: pointer;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  &:hover {
    background-color: #0074cc;
  }
  ${(props) =>
    props.valid ? 'opacity:1;' : 'opacity:.5;pointer-events:none;'}
`;
export const AskIntroduceCard = styled(AskArticle)`
  margin: 12px 0px 0px;
  display: ${(props) => {
    return props.step === props.nowFocus ? 'block' : 'none';
  }};
  padding: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  /* position: absolute; */
  @media screen and (min-width: 1100px) {
    margin: 0px 0px 0px 12px;
  }
  .introduce-card-title {
    padding: 12px;
    font-size: 15px;
    border-bottom: 1px solid hsl(210, 8%, 90%);
    background-color: #f8f9f9;
  }
  .introduce-card-content {
    margin: 16px;
    display: flex;
  }
  .introduce-card-paragraph {
    font-size: 12px;
    p {
      margin: 0px 0px 12px;
    }
    p:last-child {
      margin: 0px;
    }
    a {
      color: #0074cc;
    }
  }
`;
export const AskArticleWrapper = styled.article`
  display: flex;
  flex-direction: column-reverse;
  @media screen and (min-width: 1100px) {
    margin: 12px 0px 0px;
    align-items: flex-start;
    flex-direction: row;
  }
`;
export const AskWarning = styled.span`
  display: block;
  color: rgb(208, 57, 62);
  font-size: 12px;
  margin: 2px 0px;
  padding: 2px;
  a {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;
export const AskTag = styled.span`
  display: flex;
  align-items: center;
  margin: 2px;
  padding: 0px 4px;
  height: 24px;
  font-size: 12px;
  color: #39739d;
  background-color: #e1ecf4;
  border-radius: ${brSm};
  button {
    border-radius: ${brSm};
    margin-left: 4px;
    padding: 1px 3px;
    color: #39739d;
    cursor: pointer;
    &:hover {
      background-color: #39739d;
      color: #e1ecf4;
    }
  }
`;

export const AskTagInput = styled.div`
  ${(props) => (props.focus ? '' : '')};
  position: relative;
  padding: 2px 9px 2px 2px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid
    ${(props) =>
      props.isReview && !props.valid
        ? '#de4f54'
        : props.focus
        ? props.isReview && !props.valid
          ? '#de4f54'
          : '#59a4de'
        : 'hsl(210, 8%, 75%)'};
  /* ${(props) =>
    !props.isReview && props.focus
      ? '#59a4de'
      : props.isReview && !props.valid
      ? '#de4f54'
      : 'hsl(210, 8%, 75%)'}; */
  border-radius: ${brSm};
  font-size: 13px;
  min-height: 37px;
  box-shadow: 0px 0px 0px 4px
    ${(props) =>
      props.focus
        ? props.isReview && !props.valid
          ? '#f6e0e0'
          : '#d9eaf7'
        : 'rgba(0,0,0,0)'};
  > input {
    padding-left: 4px;
    flex-grow: 1;
    flex-shrink: 10px;
  }
`;

export const AskMdEditorWrapper = styled.div`
  position: relative;
`;

export const AskMdEditorBorder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  border-radius: ${brSm};
  border: 1px solid
    ${(props) =>
      props.isReview && !props.valid
        ? '#de4f54'
        : props.focus
        ? props.isReview && !props.valid
          ? '#de4f54'
          : '#59a4de'
        : 'hsl(210, 8%, 75%)'};
  box-shadow: 0px 0px 0px 4px
    ${(props) =>
      props.focus
        ? props.isReview && !props.valid
          ? '#f6e0e0'
          : '#d9eaf7'
        : 'rgba(0,0,0,0)'};
`;

export const AskPostButton = styled(AskFormButton)`
  margin: 0px;
`;
export const AskDiscardButton = styled(AskFormButton)`
  color: #c22e32;
  padding: 10.4px;
  margin: 0px 8px;
  pointer-events: auto;
  opacity: 1;
  background-color: transparent;
  box-shadow: none;
  &:hover {
    background-color: #fdf2f2;
  }
`;

export const AskPostButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0px 0px;
`;
export const AskTagOfferContainer = styled(AskArticle)`

  padding: 6px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  top: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  z-index: 999; ;
`;

export const AskTagOffered = styled.div`
  width: 200px;
  display: flex;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  &:hover {
    background-color: #f1f2f3;
  }
  margin: 5px;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    .ask-tag-offered-count {
      font-size: 11px;
      padding-left: 5px;
    }
  }
`;
