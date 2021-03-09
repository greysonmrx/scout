import React, { useCallback, useState } from 'react';
import { useTheme } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import handleBirthDate from '../../utils/handleBirthDate';

import {
  Container,
  Wrapper,
  Top,
  Filter,
  PlayerAvatar,
  ClubField,
  RecommendationField,
} from './styles';

const Players: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('per_player');
  const [pagination, setPagination] = useState({
    page_count: 5,
    total_items: 5,
    current_page: 1,
    per_page: 5,
    total_pages: 1,
  });
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Daniel Alves',
      avatar: 'http://localhost:5000/files/dani_alves.png',
      club: {
        avatar: 'http://localhost:5000/files/sao_paulo.png',
        name: 'São Paulo',
      },
      birth_date: '1983-05-06',
      position: 'Lateral Dir.',
      recommendation: 82,
    },
    {
      id: 2,
      name: 'Neymar Jr.',
      avatar: 'http://localhost:5000/files/neymar.png',
      club: {
        avatar: 'http://localhost:5000/files/psg.png',
        name: 'Paris Saint-Germain',
      },
      birth_date: '1992-02-05',
      position: 'Ponta esquerda',
      recommendation: 91,
    },
    {
      id: 3,
      name: 'Bruno Henrique',
      avatar: 'http://localhost:5000/files/bruno_henrique.png',
      club: {
        avatar: 'http://localhost:5000/files/flamengo.png',
        name: 'Flamengo',
      },
      birth_date: '1990-12-30',
      position: 'Ponta esquerda',
      recommendation: 53,
    },
    {
      id: 4,
      name: 'Gabriel Barbosa',
      avatar: 'http://localhost:5000/files/gabriel_barbosa.png',
      club: {
        avatar: 'http://localhost:5000/files/flamengo.png',
        name: 'Flamengo',
      },
      birth_date: '1996-08-30',
      position: 'Centroavante',
      recommendation: 32,
    },
    {
      id: 5,
      name: 'Lionel Messi',
      avatar: 'http://localhost:5000/files/messi.png',
      club: {
        avatar: 'http://localhost:5000/files/barcelona.png',
        name: 'Barcelona',
      },
      birth_date: '1987-06-24',
      position: 'Ponta Direita',
      recommendation: 23,
    },
  ]);

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

  const handleGoToPage = useCallback((path: string) => {
    history.push(path);
  }, []);

  const handleViewPlayerDetails = useCallback((player_id: number) => {
    handleGoToPage(`/players/details/${player_id}`);
  }, [handleGoToPage]);

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
              value={search}
              onChange={({ target }) => setSearch(target.value)}
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
              <th>Recomendação</th>
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
                    <img src={player.club.avatar} alt={player.club.name} />
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
                    <button
                      type="button"
                      onClick={() => handleGoToPage(`/players/edit/${player.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        /* Mano */
                      }}
                    >
                      Excluir
                    </button>
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          data={pagination}
          callback={(page: number) => setPagination({ ...pagination, current_page: page })}
        />
      </Wrapper>
    </Container>
  );
};

export default Players;
