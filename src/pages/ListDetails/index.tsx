import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';
import Rating from '../../components/Rating';

import handleFormatedDate from '../../utils/handleFormatedDate';

import { Container, Top, Wrapper } from './styles';

type List = {
  name: string;
  created_at: string;
  player: {
    id: number;
    name: string;
    avatar: {
      path: string;
    };
  };
  items: {
    player: {
      id: number;
      name: string;
      club: {
        name: string;
      };
      avatar: {
        path: string;
      };
    };
    potential: number;
    capacity: number;
  }[];
};

const ListDetails: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();

  const { params } = useRouteMatch() as any;
  const { addToast } = useToast();

  const [list, setList] = useState<List |undefined>();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  async function fetchListDetails(): Promise<void> {
    try {
      const listResponse = await api.get(`/lists/${params.id}`);

      setList(listResponse.data);
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  useEffect(() => {
    fetchListDetails();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Informações da lista</h1>
          <Button onClick={handleGoBack}>Voltar</Button>
        </Top>
        {
          !list ? (
            <p>Carregando</p>
          ) : (
            <>
              <div className="player-details">
                <main>
                  <div className="avatar">
                    <img src={`http://147.182.206.193:5000/files/${list.player.avatar.path}`} alt={list.player.name} />
                    <Link to={`/players/details/${list.player.id}`}>{list.name}</Link>
                  </div>
                  <div className="right-side">
                    <span>
                      Feito em
                      {' '}
                      <strong>{handleFormatedDate(list.created_at)}</strong>
                    </span>
                  </div>
                </main>
              </div>
              <h3>Substitutos</h3>
              <div className="substitutes">
                {
                  list.items.map((substitute) => (
                    <div className="player-details" key={substitute.player.id}>
                      <main>
                        <div className="avatar">
                          <img src={`http://147.182.206.193:5000/files/${substitute.player.avatar.path}`} alt={substitute.player.name} />
                          <Link to={`/players/details/${substitute.player.id}`}>{substitute.player.name}</Link>
                        </div>
                        <div className="right-side">
                          <div>
                            <span>
                              Capacidade atual:
                            </span>
                            <Rating
                              margin={3}
                              size={20}
                              stars={3}
                              value={substitute.capacity}
                            />
                          </div>
                          <div>
                            <span>
                              Capacidade potencial:
                            </span>
                            <Rating
                              margin={3}
                              size={20}
                              stars={3}
                              value={substitute.potential}
                            />
                          </div>
                        </div>
                      </main>
                    </div>
                  ))
                }

              </div>
            </>
          )
        }
      </Wrapper>
    </Container>
  );
};

export default ListDetails;
