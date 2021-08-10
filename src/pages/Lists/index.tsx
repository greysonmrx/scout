import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

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
  Container, Filter, Top, Wrapper, PlayerAvatar,
} from './styles';

type List = {
  id: number;
  name: string;
  owner: {
    id: number;
    name: string;
  };
  player: {
    name: string;
    avatar: string;
  };
  created_at: string;
  count_players: number;
};

const Lists: React.FC = () => {
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

  const [filter, setFilter] = useState('per_list');
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
  const [lists, setLists] = useState<Array<List>>([]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_list':
        return 'Busque por listas';
      case 'per_player':
        return 'Busque por jogador';

      default:
        return 'Busque por listas';
    }
  }, [filter]);

  const handleGoToPage = useCallback((path: string, params?: Record<string, unknown>) => {
    history.push(path, params);
  }, [history]);

  async function fetchLists(by?: string) {
    try {
      const listsResponse = await api.get('/lists', {
        params: {
          limit,
          page,
          search: by ? search : undefined,
          filter,
        },
      });

      const { lists: fetchedLists, ...paginationData } = listsResponse.data;

      setLists(fetchedLists);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter as listas!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const searchLists = useCallback(() => {
    setPage(1);

    if (page === 1) {
      fetchLists('search');
    }
  }, [search, page, filter]);

  const handleDeleteList = useCallback(async (id: number) => {
    try {
      await api.delete(`/lists/${id}`);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Lista excluída com sucesso.',
      });

      if (lists.length - 1 === 0 && page !== 1) {
        setPage((oldPage) => oldPage - 1);
      } else {
        setLists((oldLists) => [...oldLists.filter((list) => list.id !== id)]);
        setPagination((oldPagination) => ({
          ...oldPagination,
          page_count: oldPagination.page_count - 1,
          total_items: oldPagination.total_items - 1,
        }));
      }
    } catch (err) {
      addToast({
        title: 'Erro ao excluir a lista!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [lists, page, addToast]);

  useEffect(() => {
    fetchLists('search');
  }, [page]);

  useEffect(() => {
    setPage(1);
    setSearch('');
    fetchLists();
  }, [filter]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Gerenciando listas</h1>
          <Button onClick={() => handleGoToPage('/lists/create')}>
            Cadastrar listas
          </Button>
        </Top>
        <MenuTable>
          <ul>
            <li>
              <Filter
                isActive={filter === 'per_list'}
                onClick={() => setFilter('per_list')}
              >
                Todas as listas
              </Filter>
            </li>
            <li>
              <Filter
                isActive={filter === 'per_player'}
                onClick={() => setFilter('per_player')}
              >
                Por jogador
              </Filter>
            </li>
          </ul>
          <div>
            <input
              placeholder={handlePlaceholderText()}
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={(event) => event.key === 'Enter' && searchLists()}
            />
            <FiSearch />
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Jogador</th>
              <th>Nome</th>
              <th>Substitutos</th>
              <th>Criador</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list.id}>
                <td>
                  <PlayerAvatar>
                    <img
                      src={list.player.avatar ? list.player.avatar : noImage}
                      alt={list.player.name}
                      title={list.player.name}
                    />
                    {list.player.name}
                  </PlayerAvatar>
                </td>
                <td>{list.name}</td>
                <td>
                  {list.count_players}
                  {' '}
                  {handlePluralWord('jogador', list.count_players, 'es')}
                </td>
                <td>{list.owner.name}</td>
                <td>
                  <Actions>
                    <button
                      type="button"
                      onClick={() => handleGoToPage(`/lists/details/${list.id}`, list)}
                    >
                      Visualizar
                    </button>
                    {
                    hasPermission(user.id, user.role, list.owner.id) && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleGoToPage(`/lists/edit/${list.id}`, list)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => handleDeleteList(list.id)}
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

export default Lists;
