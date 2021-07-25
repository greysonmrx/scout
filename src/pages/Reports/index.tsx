import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';
import Rating from '../../components/Rating';

import hasPermission from '../../utils/hasPermission';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import noImage from '../../assets/images/no-image.png';

import {
  Container,
  Wrapper,
  Top,
  Filter,
  PlayerAvatar,
  RecommendationField,
} from './styles';

type Report = {
  id: number;
  player: {
    name: string;
    avatar?: string;
  };
  current_capacity: number;
  potential_capacity: number;
  recommendation_percentage: number;
  owner: {
    id: number;
    name: string;
  }
};

const Reports: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();

  const { user } = useAuth();
  const { addToast } = useToast();

  const [filter, setFilter] = useState('per_player');
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
  const [reports, setReports] = useState<Array<Report>>([]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_player':
        return 'Busque por jogadores';

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

  async function fetchReports() {
    try {
      const reportsResponse = await api.get('/reports', {
        params: {
          limit,
          page,
          search,
        },
      });

      const { reports: fetchedReports, ...paginationData } = reportsResponse.data;

      setReports(fetchedReports);
      setPagination(paginationData);
    } catch (err) {
      addToast({
        title: 'Erro ao obter os relatórios!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const searchReports = useCallback(() => {
    setPage(1);

    if (page === 1) {
      fetchReports();
    }
  }, [search, page]);

  const handleDeleteReport = useCallback(async (id: number) => {
    try {
      await api.delete(`/reports/${id}`);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Relatório excluído com sucesso.',
      });

      if (reports.length - 1 === 0 && page !== 1) {
        setPage((oldPage) => oldPage - 1);
      } else {
        setReports((oldReports) => [...oldReports.filter((report) => report.id !== id)]);
        setPagination((oldPagination) => ({
          ...oldPagination,
          page_count: oldPagination.page_count - 1,
          total_items: oldPagination.total_items - 1,
        }));
      }
    } catch (err) {
      addToast({
        title: 'Erro ao excluir o relatório!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [reports, page, addToast]);

  useEffect(() => {
    fetchReports();
  }, [page]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Gerenciando relatórios</h1>
          <Button onClick={() => handleGoToPage('/reports/create')}>
            Cadastrar relatórios
          </Button>
        </Top>
        <MenuTable>
          <ul>
            <li>
              <Filter
                isActive={filter === 'per_player'}
                onClick={() => setFilter('per_player')}
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
              onKeyUp={(event) => event.key === 'Enter' && searchReports()}
            />
            <FiSearch />
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Jogador</th>
              <th>Capacidade atual</th>
              <th>Capacidade potencial</th>
              <th>Criador</th>
              <th>Recomendação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <PlayerAvatar>
                    <img
                      src={report.player?.avatar ? report.player.avatar : noImage}
                      alt={report.player.name}
                    />
                    {report.player.name}
                  </PlayerAvatar>
                </td>
                <td>
                  <Rating
                    margin={3}
                    size={20}
                    value={report.current_capacity}
                  />
                </td>
                <td>
                  <Rating
                    margin={3}
                    size={20}
                    value={report.potential_capacity}
                  />
                </td>
                <td>{report.owner.name}</td>
                <td>
                  <RecommendationField
                    color={handlePercentageColors(report.recommendation_percentage)}
                  >
                    <span>{`${report.recommendation_percentage}%`}</span>
                  </RecommendationField>
                </td>
                <td>
                  {
                    hasPermission(user.id, user.role, report.owner.id) && (
                    <Actions>
                      <button
                        type="button"
                        onClick={() => handleGoToPage(`/reports/edit/${report.id}`, report)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDeleteReport(report.id)}
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

export default Reports;
