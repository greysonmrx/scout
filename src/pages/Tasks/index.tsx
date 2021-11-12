import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import Button from '../../components/Button';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import api from '../../services/api';

import hasPermission from '../../utils/hasPermission';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import noImage from '../../assets/images/no-image.png';

import {
  Container, Filter, Top, Wrapper, PlayerAvatar, RecommendationField,
} from './styles';

type Task = {
  id: number;
  title: string;
  description: string;
  status: number;
  created_at: string;
  owner: {
    id: number;
    name: string;
  };
};

const Tasks: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

  const [filter, setFilter] = useState('per_task');
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
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_task':
        return 'Busque por tarefas';
      case 'per_open':
        return 'Busque por tarefas';
      case 'per_progress':
        return 'Busque por tarefas';
      case 'per_close':
        return 'Busque por tarefas';

      default:
        return 'Busque por listas';
    }
  }, [filter]);

  const handleGoToPage = useCallback((path: string, params?: Record<string, unknown>) => {
    history.push(path, params);
  }, [history]);

  const handleStatusColors = useCallback((status: number) => {
    if (status === 0) {
      return theme.colors.green;
    }

    if (status === 1) {
      return theme.colors.medium;
    }

    return theme.colors.red.error;
  }, []);

  const handleStatusName = useCallback((status: number) => {
    if (status === 0) {
      return 'ABERTA';
    }

    if (status === 1) {
      return 'EM PROGRESSO';
    }

    return 'FECHADA';
  }, []);

  async function fetchTasks(by?: string) {
    try {
      const tasksResponse = await api.get('/tasks', {
        params: {
          limit,
          page,
          search: by ? search : undefined,
          filter,
        },
      });

      const { tasks: fetchedTasks, ...paginationData } = tasksResponse.data;

      setTasks(fetchedTasks);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter as tarefas!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const searchTasks = useCallback(() => {
    setPage(1);

    if (page === 1) {
      fetchTasks('search');
    }
  }, [search, page, filter]);

  const handleDeleteTask = useCallback(async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Tarefa excluída com sucesso.',
      });

      if (tasks.length - 1 === 0 && page !== 1) {
        setPage((oldPage) => oldPage - 1);
      } else {
        setTasks((oldTasks) => [...oldTasks.filter((task) => task.id !== id)]);
        setPagination((oldPagination) => ({
          ...oldPagination,
          page_count: oldPagination.page_count - 1,
          total_items: oldPagination.total_items - 1,
        }));
      }
    } catch (err) {
      addToast({
        title: 'Erro ao excluir a tarefa!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [tasks, page, addToast]);

  useEffect(() => {
    fetchTasks('search');
  }, [page]);

  useEffect(() => {
    setPage(1);
    setSearch('');
    fetchTasks();
  }, [filter]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Gerenciando tarefas</h1>
          <Button onClick={() => handleGoToPage('/tasks/create')}>
            Cadastrar tarefas
          </Button>
        </Top>
        <MenuTable>
          <ul>
            <li>
              <Filter
                isActive={filter === 'per_task'}
                onClick={() => setFilter('per_task')}
              >
                Todas as tarefas
              </Filter>
            </li>
            <li>
              <Filter
                isActive={filter === 'per_open'}
                onClick={() => setFilter('per_open')}
              >
                Abertas
              </Filter>
            </li>
            <li>
              <Filter
                isActive={filter === 'per_progress'}
                onClick={() => setFilter('per_progress')}
              >
                Em progresso
              </Filter>
            </li>
            <li>
              <Filter
                isActive={filter === 'per_close'}
                onClick={() => setFilter('per_close')}
              >
                Fechadas
              </Filter>
            </li>
          </ul>
          <div>
            <input
              placeholder={handlePlaceholderText()}
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={(event) => event.key === 'Enter' && searchTasks()}
            />
            <FiSearch />
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.owner.name}</td>
                <td>
                  <RecommendationField
                    color={handleStatusColors(task.status)}
                  >
                    <span>{handleStatusName(task.status)}</span>
                  </RecommendationField>
                </td>
                <td>
                  <Actions>
                    {
                      hasPermission(user.id, user.role, task.owner.id) && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleGoToPage(`/tasks/edit/${task.id}`, task)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => handleDeleteTask(task.id)}
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

export default Tasks;
