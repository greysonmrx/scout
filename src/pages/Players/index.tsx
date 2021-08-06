import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useTheme } from 'styled-components';
import { FiSearch, FiTrash2 } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';
import { FaFilter } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';
import Input from '../../components/Input';
import Select from '../../components/Select';

import handleBirthDate from '../../utils/handleBirthDate';
import hasPermission from '../../utils/hasPermission';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import positionAttributes from '../../utils/positionAttributes';
import { labels } from '../../utils/handleChartLabels';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import noImage from '../../assets/images/no-image.png';

import handleSlugWord from '../../utils/handleSlugWord';

import {
  Container,
  Wrapper,
  Top,
  Modal,
  Filter,
  PlayerAvatar,
  ClubField,
  RecommendationField,
} from './styles';
import { useAdvancedSearch } from '../../hooks/advancedSearch';

type Attribute = {
  name: string;
  type: string;
  value: number;
  operator: string;
}

type Player = {
  id: number;
  name: string;
  avatar?: string;
  birth_date: string;
  club: {
    name: string;
    shield?: string;
  };
  position: string;
  owner: {
    id: number;
    name: string;
  };
  recommendation: number;
};

const Players: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const filterFormRef = useRef<FormHandles>(null);

  const { user } = useAuth();
  const { addToast } = useToast();
  const {
    attributes,
    position,
    startDate,
    endDate,
    recommendation,
    setPosition,
    setAttributes,
    setEndDate,
    setStartDate,
    setRecommendation,
  } = useAdvancedSearch();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('per_player');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [pagination, setPagination] = useState({
    page_count: 0,
    total_items: 0,
    current_page: 0,
    per_page: 0,
    total_pages: 0,
  });
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [filterModalIsOpened, setFilterModalIsOpened] = useState(false);
  const [positions, setPositions] = useState([]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_player':
        return 'Busque por jogadores';

      case 'per_club':
        return 'Busque por time';

      default:
        return 'Busque por jogadores';
    }
  }, [filter]);

  const handleChangeAttributes = useCallback(
    (position_id: number, field: string, value: string | number) => {
      setAttributes(attributes.map((attribute, index) => {
        if (index === position_id) {
          return {
            ...attribute,
            [field]: value,
          };
        }

        return attribute;
      }));
    }, [attributes],
  );

  const handlePercentageColors = useCallback((percentage: number) => {
    if (percentage > 66) {
      return theme.colors.green;
    }

    if (percentage > 33) {
      return theme.colors.orange;
    }

    return theme.colors.red.error;
  }, []);

  const handleGoToPage = useCallback((path: string, params?: Record<string, unknown>) => {
    history.push(path, params);
  }, [history]);

  const handleViewPlayerDetails = useCallback((player_id: number) => {
    handleGoToPage(`/players/details/${player_id}`);
  }, [handleGoToPage]);

  const handleAdvancedSearch = useCallback(async () => {
    setFilterModalIsOpened(false);

    try {
      const currentDate = new Date();

      const playersResponse = await api.get('/players', {
        params: {
          filter: 'per_advanced_search',
          page,
          limit,
          position_id: position?.value || undefined,
          start_date: startDate ? `${currentDate.getFullYear() - startDate}-01-01` : undefined,
          end_date: endDate ? `${currentDate.getFullYear() - endDate}-01-01` : undefined,
          recommendation_percentage: recommendation || 0,
          attributes: attributes.length > 0 ? JSON.stringify(attributes) : undefined,
        },
      });

      const { players: fetchedPlayers, ...paginationData } = playersResponse.data;

      setPlayers(fetchedPlayers);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter jogadores!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [attributes, position, limit, page, startDate, endDate, recommendation]);

  const handleAddAttribute = useCallback(() => {
    setAttributes([
      ...attributes,
      {
        name: '',
        operator: '=',
        type: '',
        value: 0,
      },
    ]);
  }, [attributes]);

  const handleRemoveAttribute = useCallback((position_id: number) => {
    setAttributes(attributes.filter((_, index) => index !== position_id));
  }, [attributes]);

  async function fetchPositions() {
    try {
      const response = await api.get('/positions', {
        params: {
          limit: 3000,
          page: 1,
        },
      });

      setPositions(response.data.positions.map((fetchedPosition: any) => ({
        value: fetchedPosition.id,
        label: fetchedPosition.name,
      })));
    } catch (err) {
      addToast({
        title: 'Erro ao obter posições!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  async function fetchPlayers(by?: string) {
    try {
      const playersResponse = await api.get('/players', {
        params: {
          limit,
          page,
          search: by ? search : undefined,
          filter,
        },
      });

      const { players: fetchedPlayers, ...paginationData } = playersResponse.data;

      setPlayers(fetchedPlayers);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter jogadores!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const searchPlayers = useCallback(() => {
    setPage(1);

    if (page === 1) {
      fetchPlayers('search');
    }
  }, [search, page]);

  const handleDeletePlayer = useCallback(async (id: number) => {
    try {
      await api.delete(`/players/${id}`);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Jogador excluído com sucesso.',
      });

      if (players.length - 1 === 0 && page !== 1) {
        setPage((oldPage) => oldPage - 1);
      } else {
        setPlayers((oldPlayers) => [...oldPlayers.filter((player) => player.id !== id)]);
        setPagination((oldPagination) => ({
          ...oldPagination,
          page_count: oldPagination.page_count - 1,
          total_items: oldPagination.total_items - 1,
        }));
      }
    } catch (err) {
      addToast({
        title: 'Erro ao excluir o jogador!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [players, page, addToast]);

  useEffect(() => {
    fetchPositions();
  }, []);

  useEffect(() => {
    fetchPlayers('search');
  }, [page]);

  useEffect(() => {
    setPage(1);
    setSearch('');
    fetchPlayers();
  }, [filter]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Gerenciando jogadores</h1>
          <Button onClick={() => handleGoToPage('/players/create')}>
            Cadastrar jogadores
          </Button>
        </Top>
        <MenuTable>
          <ul>
            <li>
              <Filter
                isActive={filter === 'per_player'}
                onClick={() => setFilter('per_player')}
              >
                Todos os jogadores
              </Filter>
            </li>
            <li>
              <Filter
                isActive={filter === 'per_club'}
                onClick={() => setFilter('per_club')}
              >
                Por time
              </Filter>
            </li>
            <li>
              <Filter
                isActive={filter === 'per_advanced_search'}
                onClick={() => setFilter('per_advanced_search')}
              >
                Busca avançada
              </Filter>
            </li>
          </ul>
          <div>
            {
              filter === 'per_advanced_search' ? (
                <Button type="button" onClick={() => setFilterModalIsOpened(true)}>
                  <FaFilter
                    size={14}
                    color={theme.colors.white}
                  />
                  Filtros
                </Button>
              ) : (
                <>
                  <input
                    placeholder={handlePlaceholderText()}
                    type="search"
                    value={search}
                    onChange={({ target }) => setSearch(target.value)}
                    onKeyUp={(event) => event.key === 'Enter' && searchPlayers()}
                  />
                  <FiSearch />
                </>
              )
            }
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Time</th>
              <th>Idade</th>
              <th>Posição</th>
              <th>Recomendação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>
                  <PlayerAvatar>
                    <img
                      src={player.avatar ? player.avatar : noImage}
                      alt={player.name}
                    />
                  </PlayerAvatar>
                </td>
                <td>{player.name}</td>
                <td>
                  <ClubField>
                    <img
                      src={player.club.shield ? player.club.shield : noImage}
                      alt={player.club.name}
                    />
                    {player.club.name}
                  </ClubField>
                </td>
                <td>{handleBirthDate(player.birth_date)}</td>
                <td>{player.position}</td>
                <td>
                  <RecommendationField
                    color={handlePercentageColors(player.recommendation)}
                  >
                    <span>{`${player.recommendation}%`}</span>
                  </RecommendationField>
                </td>
                <td>
                  <Actions>
                    <button
                      type="button"
                      onClick={() => handleViewPlayerDetails(player.id)}
                    >
                      Visualizar
                    </button>
                    {
                      hasPermission(user.id, user.role, player.owner.id) && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleGoToPage(`/players/edit/${player.id}`)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => handleDeletePlayer(player.id)}
                          >
                            Excluir
                          </button>
                        </>
                      )
                    }
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          data={pagination}
          callback={setPage}
        />
      </Wrapper>
      {filterModalIsOpened && (
      <Modal>
        <div>
          <header>
            <h3>Filtros</h3>
            <button type="button" onClick={() => setFilterModalIsOpened(false)}>
              <RiCloseLine
                size={24}
                color={theme.colors.red.error}
              />
            </button>
          </header>
          <main>
            <Form ref={filterFormRef} onSubmit={handleAdvancedSearch}>
              <div className="inputs-container">
                <div className="date">
                  <Input
                    name="start_date"
                    label="Idade"
                    placeholder="De"
                    type="number"
                    min={0}
                    max={100}
                    onChange={(event) => setStartDate(Number(event.target.value))}
                    defaultValue={startDate}
                  />
                  <p>-</p>
                  <Input
                    name="end_date"
                    type="number"
                    placeholder="Até"
                    min={0}
                    max={100}
                    onChange={(event) => setEndDate(Number(event.target.value))}
                    defaultValue={endDate}
                  />
                </div>
                <Select
                  name="position_id"
                  label="Posição"
                  onChange={({ value, label }) => setPosition({ value, label })}
                  placeholder="Selecione uma posição"
                  defaultValue={position}
                  options={[
                    {
                      value: 0,
                      label: 'Selecione uma posição',
                    },
                    ...positions,
                  ]}
                />
                <Input
                  label="Recomendação"
                  placeholder="Recomendação mínima"
                  name="recommendation_percentage"
                  type="number"
                  min={0}
                  max={100}
                  onChange={(event) => setRecommendation(Number(event.target.value))}
                  defaultValue={recommendation}
                />
              </div>
              {
                !!position.value && (
                  <div className="attributes-container">
                    <header>
                      <label htmlFor="attributes">Atributos</label>
                      <button type="button" onClick={handleAddAttribute}>Novo atributo</button>
                    </header>
                    <div className="inputs">
                      {
                      attributes.map((attribute, index) => (
                        <div className="input" key={index}>
                          <Select
                            name="attribute_type"
                            onChange={({ value }) => handleChangeAttributes(index, 'type', value)}
                            label=""
                            placeholder="Tipo"
                            options={Object.keys(
                              positionAttributes[handleSlugWord(position.label)],
                            ).map((type) => ({
                              value: type,
                              label: handleAttributesTypesName(type),
                            }))}
                          />
                          <Select
                            name="attribute_name"
                            onChange={({ value }) => handleChangeAttributes(index, 'name', value)}
                            placeholder="Nome"
                            label=""
                            isDisabled={!attribute.type}
                            options={attribute.type
                              ? positionAttributes[handleSlugWord(position.label)][attribute.type]
                                .map((name) => ({
                                  value: name,
                                  label: labels[name],
                                })) : []}
                          />
                          <Select
                            name="attribute_operator"
                            onChange={({ value }) => handleChangeAttributes(index, 'operator', value)}
                            label=""
                            placeholder="Operador"
                            options={[
                              {
                                value: '>',
                                label: 'Maior',
                              },
                              {
                                value: '<',
                                label: 'Menor',
                              },
                              {
                                value: '>=',
                                label: 'Maior ou igual',
                              },
                              {
                                value: '<=',
                                label: 'Menor ou igual',
                              },
                              {
                                value: '=',
                                label: 'Igual',
                              },
                            ]}
                          />
                          <Input
                            name="attribute_value"
                            placeholder="Valor"
                            type="number"
                            min={0}
                            max={20}
                            value={attribute.value}
                            onChange={(event) => handleChangeAttributes(index, 'value', event.target.value)}
                          />
                          <button type="button" onClick={() => handleRemoveAttribute(index)}>
                            <FiTrash2
                              size={24}
                              color={theme.colors.red.error}
                            />
                          </button>
                        </div>
                      ))
                    }
                    </div>
                  </div>
                )
              }
              <Button type="submit">
                Buscar jogadores
              </Button>
            </Form>
          </main>
        </div>
      </Modal>
      )}
    </Container>
  );
};

export default Players;
