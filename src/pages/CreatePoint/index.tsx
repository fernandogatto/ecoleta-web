import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
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

interface IItem {
  id: string;
  title: string;
  image_url: string;
}

interface IIBGEStateResponse {
  sigla: string;
}

interface IIBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const history = useHistory();

  const handleSelectUf = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    setSelectedUf(uf);
  }, [selectedUf]);

  const handleSelectCity = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;

    setSelectedCity(city);
  }, [selectedCity]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputData({...inputData, [name]: value});
  }, [inputData]);

  const handleSelectItem = useCallback((id: string) => {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems([...filteredItems]);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }, [selectedItems]);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const { name, email, whatsapp } = inputData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data =  {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items,
    }

    await api.post('/points', data);

    alert('Ponto de coleta criado');

    history.push('/');
  }, [inputData, selectedUf, selectedCity, selectedPosition, selectedItems]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IIBGEStateResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }

    axios
    .get<IIBGECityResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
    )
    .then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    });
  }, [selectedUf]);

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
        <form onSubmit={handleSubmit}>
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
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
                <select
                  name="uf"
                  id="uf"
                  onChange={handleSelectUf}
                  value={selectedUf}
                >
                  <option value="">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </Field>

              <Field>
                <label htmlFor="city">Cidade</label>
                <select
                  name="city"
                  id="city"
                  onChange={handleSelectCity}
                  value={selectedCity}
                >
                  <option value="">Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
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
              {items.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title}/>
                  <span>{item.title}</span>
                </li>
              ))}
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
