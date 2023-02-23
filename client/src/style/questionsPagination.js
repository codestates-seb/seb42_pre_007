import styled from 'styled-components';

// Pagination style
export const PageUl = styled.ul`
  list-style: none;
  text-align: center;
  color: var(--black);
  padding: 40px 0px;
`;

export const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
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

export const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: ${props => (props.currentPage ? 'none' : 'var(--black)')};
    background-color: ${props =>
      props.currentPage ? 'none' : 'var(--lgray)'};
  }
`;
