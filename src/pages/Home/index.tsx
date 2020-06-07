import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import {
  Container,
  Content,
  Header,
  Main,
  MainAnchor,
  MainTitle,
  MainText,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <img src={logo} alt="Ecoleta" />
        </Header>

        <Main>
          <MainTitle>Seu marketplace de coleta de resíduos.</MainTitle>

          <MainText>Ajudamos pessoas a encontrar pontos de coleta de forma eficiente</MainText>

          <MainAnchor href="/cadastro">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </MainAnchor>
        </Main>
      </Content>
    </Container>
  );
}

export default Home;
