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
  Container, Wrapper, Top, Filter, ClubShield,
} from './styles';

const Clubs: React.FC = () => {
  const history = useHistory();

  const [filter, setFilter] = useState('per_club');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page_count: 5,
    total_items: 5,
    current_page: 1,
    per_page: 5,
    total_pages: 1,
  });
  const [clubs, setClubs] = useState([
    {
      id: 1,
      shield: 'http://localhost:5000/files/sao_paulo.png',
      name: 'São Paulo',
      count_players: 20,
    }, {
      id: 2,
      shield: 'http://localhost:5000/files/psg.png',
      name: 'Paris Saint-Germain',
      count_players: 18,
    }, {
      id: 3,
      shield: 'http://localhost:5000/files/fluminense.png',
      name: 'Fluminense',
      count_players: 25,
    }, {
      id: 4,
      shield: 'http://localhost:5000/files/flamengo.png',
      name: 'Flamengo',
      count_players: 22,
    }, {
      id: 5,
      shield: 'http://localhost:5000/files/barcelona.png',
      name: 'Barcelona',
      count_players: 20,
    },
  ]);

  const handlePlaceholderText = useCallback(() => {
    switch (filter) {
      case 'per_club':
        return 'Busque por times';

      default:
        return 'Busque por times';
    }
  }, [filter]);

  const handleGoToPage = useCallback((path: string) => {
    history.push(path);
  }, []);

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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td>
                  <ClubShield>
                    <img src={club.shield} alt={club.name} />
                  </ClubShield>
                </td>
                <td>{club.name}</td>
                <td>
                  {club.count_players}
                  {' '}
                  {handlePluralWord('jogador', club.count_players, 'es')}
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

export default Clubs;
