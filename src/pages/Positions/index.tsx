import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import handlePluralWord from '../../utils/handlePluralWord';
import hasPermission from '../../utils/hasPermission';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container, Wrapper, Top, Filter,
} from './styles';

type Position = {
  id: number;
  name: string;
  count_players: number;
  owner: {
    id: number;
    name: string;
  }
};

const Positions: React.FC = () => {
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

  const [filter, setFilter] = useState('per_position');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [pagination, setPagination] = useState({
    page_count: 5,
    total_items: 5,
    current_page: 1,
    per_page: 5,
    total_pages: 1,
  });
  const [positions, setPositions] = useState<Array<Position>>([]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_position':
        return 'Busque por posições';

      default:
        return 'Busque por posições';
    }
  }, [filter]);

  const handleGoToPage = useCallback((path: string, params?: Record<string, unknown>) => {
    history.push(path, params);
  }, [history]);

  async function fetchPositions() {
    try {
      const positionsResponse = await api.get('/positions', {
        params: {
          limit,
          page,
          search,
        },
      });

      const { positions: fetchedPositions, ...paginationData } = positionsResponse.data;

      setPositions(fetchedPositions);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter as posições!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const searchPositions = useCallback(() => {
    setPage(1);

    if (page === 1) {
      fetchPositions();
    }
  }, [search, page]);

  const handleDeletePosition = useCallback(async (id: number) => {
    try {
      await api.delete(`/positions/${id}`);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Posição excluída com sucesso.',
      });

      if (positions.length - 1 === 0) {
        setPage((oldPage) => oldPage - 1);
      } else {
        setPositions((oldPositions) => [...oldPositions.filter((position) => position.id !== id)]);
        setPagination((oldPagination) => ({
          ...oldPagination,
          page_count: oldPagination.page_count - 1,
          total_items: oldPagination.total_items - 1,
        }));
      }
    } catch (err) {
      addToast({
        title: 'Erro ao excluir a posição!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [positions, addToast]);

  useEffect(() => {
    fetchPositions();
  }, [page]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Gerenciando posições</h1>
          <Button onClick={() => handleGoToPage('/positions/create')}>
            Cadastrar posições
          </Button>
        </Top>
        <MenuTable>
          <ul>
            <li>
              <Filter
                isActive={filter === 'per_position'}
                onClick={() => setFilter('per_position')}
              >
                Todos as posições
              </Filter>
            </li>
          </ul>
          <div>
            <input
              placeholder={handlePlaceholderText()}
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={(event) => event.key === 'Enter' && searchPositions()}
            />
            <FiSearch />
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade de jogadores</th>
              <th>Criador</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id}>
                <td>{position.name}</td>
                <td>
                  {position.count_players}
                  {' '}
                  {handlePluralWord('jogador', position.count_players, 'es')}
                </td>
                <td>{position.owner.name}</td>
                <td>
                  {
                    hasPermission(user.id, user.role, position.owner.id) && (
                    <Actions>
                      <button
                        type="button"
                        onClick={() => handleGoToPage(`/positions/edit/${position.id}`, position)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDeletePosition(position.id)}
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

export default Positions;
