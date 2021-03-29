import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import handleBirthDate from '../../utils/handleBirthDate';
import hasPermission from '../../utils/hasPermission';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Wrapper,
  Top,
  Filter,
  PlayerAvatar,
  ClubField,
  RecommendationField,
} from './styles';

type Player = {
  id: number;
  name: string;
  avatar: string;
  birth_date: string;
  club: {
    name: string;
    shield: string;
  };
  position: string;
  owner: {
    id: number;
    name: string;
  };
};

const Players: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

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

  async function fetchPlayers() {
    try {
      const playersResponse = await api.get('/players', {
        params: {
          limit,
          page,
          search,
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
      fetchPlayers();
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

      if (players.length - 1 === 0) {
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
  }, [players, addToast]);

  useEffect(() => {
    fetchPlayers();
  }, [page]);

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
          </ul>
          <div>
            <input
              placeholder={handlePlaceholderText()}
              type="search"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={(event) => event.key === 'Enter' && searchPlayers()}
            />
            <FiSearch />
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
              <th>Criador</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>
                  <PlayerAvatar>
                    <img src={player.avatar} alt={player.name} />
                  </PlayerAvatar>
                </td>
                <td>{player.name}</td>
                <td>
                  <ClubField>
                    <img src={player.club.shield} alt={player.club.name} />
                    {player.club.name}
                  </ClubField>
                </td>
                <td>{handleBirthDate(player.birth_date)}</td>
                <td>{player.position}</td>
                <td>
                  {/* <RecommendationField
                    color={handlePercentageColors(player.recommendation)}
                  >
                    <span>{`${player.recommendation}%`}</span>
                  </RecommendationField> */}
                  {player.owner.name}
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
    </Container>
  );
};

export default Players;
