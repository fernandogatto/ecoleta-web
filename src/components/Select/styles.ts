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
  color: #6C6C80;
  position: relative;

  ${(props) => props.isFocused && css`
    color: #322153;
    border-color: #322153;
  `}

  ${(props) => props.isFilled && css`
    color: #322153;
  `}

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: transparent;
    border-radius: 8px;
    outline: 0;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;
    z-index: 1;
  }

  svg {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 8px;
  }
`;
