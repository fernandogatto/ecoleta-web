import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Button from '../../components/Button';

import api from '../../services/api';
import axios from 'axios';

import logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  Content,
  FieldGroup,
  Field,
  FieldCheck,
  ItemsGrid,
} from './styles';
import './styles.css';

const CreatePoint: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([-22.9042611, -43.2880104]);
    });
  }, []);

  return (
    <Container>
      <Header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>
      </Header>

      <Content>
        <form>
          <h1>Cadastro do <br/>ponto de coleta</h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <FieldGroup>
              <Field>
                <label htmlFor="name">Nome da entidade</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                />
              </Field>

              <Field>
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                />
              </Field>
            </FieldGroup>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} />
            </Map>

            <FieldGroup>
              <Field>
                <label htmlFor="uf">Estado (UF)</label>
                <select name="uf" id="uf">
                  <option value="">Selecione uma UF</option>
                </select>
              </Field>

              <Field>
                <label htmlFor="city">Cidade</label>
                <select name="city" id="city">
                  <option value="">Selecione uma cidade</option>
                </select>
              </Field>
            </FieldGroup>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <ItemsGrid>
              <li className="selected">
                <img src="http://localhost:3333/uploads/oleo.svg" alt=""/>
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt=""/>
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt=""/>
                <span>Óleo de Cozinha</span>
              </li>
            </ItemsGrid>
          </fieldset>

          <Button type="submit">
            Cadastrar ponto de coleta
          </Button>
        </form>
      </Content>
    </Container>
  );
}

export default CreatePoint;
