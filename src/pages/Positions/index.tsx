import React, { useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import MenuTable from '../../components/MenuTable';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import Pagination from '../../components/Pagination';

import handlePluralWord from '../../utils/handlePluralWord';

import {
  Container, Wrapper, Top, Filter,
} from './styles';

const Positions: React.FC = () => {
  const history = useHistory();

  const [filter, setFilter] = useState('per_position');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page_count: 5,
    total_items: 5,
    current_page: 1,
    per_page: 5,
    total_pages: 1,
  });
  const [positions, setPositions] = useState([
    {
      id: 1,
      name: 'Lateral Dir.',
      count_players: 20,
    }, {
      id: 2,
      name: 'Ponta esquerda',
      count_players: 18,
    }, {
      id: 3,
      name: 'Centroavante',
      count_players: 25,
    }, {
      id: 4,
      name: 'Ponta Direita',
      count_players: 22,
    }, {
      id: 5,
      name: 'Zagueiro',
      count_players: 20,
    },
  ]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_position':
        return 'Busque por posições';

      default:
        return 'Busque por posições';
    }
  }, [filter]);

  const handleGoToPage = useCallback((path: string) => {
    history.push(path);
  }, [history]);

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
            />
            <FiSearch />
          </div>
        </MenuTable>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade de jogadores</th>
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
                <td>
                  <Actions>
                    <button
                      type="button"
                      onClick={() => {
                      /* Mano */
                      }}
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

export default Positions;
