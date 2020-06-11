import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;

  background: #F0F0F5;
  border: 2px solid #F0F0F5;
  border-radius: 8px;
  padding: 16px 24px;
  color: #6C6C80;

  & + div {
    margin-left: 24px;
  }

  ${(props) => props.isFocused && css`
    color: #322153;
    border-color: #322153;
  `}

  ${(props) => props.isFilled && css`
    color: #322153;
  `}

  input {
    border: 0;
    outline: 0;
    background: transparent;
    color: #6C6C80;
    flex: 1;
    font-size: 16px;

    &::placeholder {
      color: #A0A0B2;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
