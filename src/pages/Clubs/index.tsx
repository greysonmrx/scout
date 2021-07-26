import React, { useCallback, useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import api from '../../services/api';

import handlePluralWord from '../../utils/handlePluralWord';
import hasPermission from '../../utils/hasPermission';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import noImage from '../../assets/images/no-image.png';

import {
  Container, Wrapper, Top, Filter, ClubShield,
} from './styles';

type Club = {
  id: number;
  name: string;
  shield?: string;
  count_players: number;
  owner: {
    id: number;
    name: string;
  }
};

const Clubs: React.FC = () => {
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

  const [filter, setFilter] = useState('per_club');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page_count: 5,
    total_items: 5,
    current_page: 1,
    per_page: 5,
    total_pages: 1,
  });
  const [clubs, setClubs] = useState<Array<Club>>([]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_club':
        return 'Busque por times';

      default:
        return 'Busque por times';
    }
  }, [filter]);

  const handleGoToPage = useCallback((path: string, params?: Record<string, unknown>) => {
    history.push(path, params);
  }, [history]);

  async function fetchClubs() {
    try {
      const clubsResponse = await api.get('/clubs', {
        params: {
          limit,
          page,
          search,
        },
      });

      const { clubs: fetchedClubs, ...paginationData } = clubsResponse.data;

      setClubs(fetchedClubs);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter os times!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const handleDeleteClub = useCallback(async (id: number) => {
    try {
      await api.delete(`/clubs/${id}`);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Time excluído com sucesso.',
      });

      if (clubs.length - 1 === 0 && page !== 1) {
        setPage((oldPage) => oldPage - 1);
      } else {
        setClubs((oldClubs) => [...oldClubs.filter((club) => club.id !== id)]);
        setPagination((oldPagination) => ({
          ...oldPagination,
          page_count: oldPagination.page_count - 1,
          total_items: oldPagination.total_items - 1,
        }));
      }
    } catch (err) {
      addToast({
        title: 'Erro ao excluir o time!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [clubs, page, addToast]);

  const searchClubs = useCallback(() => {
    setPage(1);

    if (page === 1) {
      fetchClubs();
    }
  }, [search, page]);

  useEffect(() => {
    fetchClubs();
  }, [page, filter]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Gerenciando times</h1>
          <Button onClick={() => handleGoToPage('/clubs/create')}>
            Cadastrar times
          </Button>
        </Top>
        <MenuTable>
          <ul>
            <li>
              <Filter
                isActive={filter === 'per_club'}
                onClick={() => setFilter('per_club')}
              >
                Todos os times
              </Filter>
            </li>
          </ul>
          <div>
            <input
              placeholder={handlePlaceholderText()}
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={(event) => event.key === 'Enter' && searchClubs()}
            />
            <FiSearch />
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Escudo</th>
              <th>Nome</th>
              <th>Número de jogadores</th>
              <th>Criador</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td>
                  <ClubShield>
                    <img src={club?.shield ? club.shield : noImage} alt={club.name} />
                  </ClubShield>
                </td>
                <td>{club.name}</td>
                <td>
                  {club.count_players}
                  {' '}
                  {handlePluralWord('jogador', club.count_players, 'es')}
                </td>
                <td>{club.owner.name}</td>
                <td>
                  {
                    hasPermission(user.id, user.role, club.owner.id) && (
                    <Actions>
                      <button
                        type="button"
                        onClick={() => handleGoToPage(`/clubs/edit/${club.id}`, club)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDeleteClub(club.id)}
                      >
                        Excluir
                      </button>
                    </Actions>
                    )
                  }
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

export default Clubs;
