import styled from 'styled-components';

// Pagination style
export const PaginationContainer = styled.div`
  list-style: none;
  text-align: center;
  color: var(--black);
  padding: 40px 0px;
`;

export const PageButton = styled.button`
  display: inline-block;
  font-size: 13px;
  padding: 5px;
  margin: 0 3px;
  border-radius: 5px;
  width: 25px;
  border: 1px solid var(--lgray);
  background-color: ${props =>
    props.currentPage ? 'var(--orange)' : 'none'};
  color: ${props => (props.currentPage ? 'var(--white)' : 'var(--black)')};

  &:hover {
    cursor: pointer;
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
  &:focus::after {
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
`;

export const PrevButton = styled.button`
  display: inline-block;
  font-size: 13px;
  padding: 5px;
  margin-right: 15px;
  border-radius: 5px;
  width: 50px;
  border: 1px solid var(--lgray);
  background-color: ${props =>
    props.currentPage ? 'var(--orange)' : 'none'};
  color: ${props => (props.currentPage ? 'var(--white)' : 'var(--black)')};

  &:hover {
    cursor: pointer;
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
  &:focus::after {
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
`;

export const NextButton = styled.button`
  display: inline-block;
  font-size: 13px;
  padding: 5px;
  margin-left: 15px;
  border-radius: 5px;
  width: 50px;
  border: 1px solid var(--lgray);
  background-color: ${props =>
    props.currentPage ? 'var(--orange)' : 'none'};
  color: ${props => (props.currentPage ? 'var(--white)' : 'var(--black)')};

  &:hover {
    cursor: pointer;
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
  &:focus::after {
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
`;
