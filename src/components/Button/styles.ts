import styled from 'styled-components';

export const Container = styled.button`
  width: 260px;
  height: 56px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color .3s;
  cursor: pointer;

  &:hover {
    background: #2FB86E;
  }
`;
