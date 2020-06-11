import styled, { css } from 'styled-components';

interface IContainerProps {
  isClicked: boolean;
}

export const Container = styled.ul<IContainerProps>`
  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;

    ${(props) => props.isClicked && css`
      background: #E1FAEC !important;
      border-color: #34CB79 !important;
    `}
  }
`;
