import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import {
  Container,
  Content,
  Header,
  Main,
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

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </Main>
      </Content>
    </Container>
  );
}

export default Home;
