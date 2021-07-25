import React, { useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import Select from '../../components/Select';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import {
  Container, Wrapper, Top, FormContainer,
} from './styles';

type Player = {
  id: number;
  name: string;
  avatar?: string;
  birth_date: string;
  club: {
    name: string;
    shield?: string;
  };
  position: string;
  owner: {
    id: number;
    name: string;
  };
  recommendation: number;
};

const CreateComparison: React.FC = () => {
  const history = useHistory();

  const { addToast } = useToast();

  const [players, setPlayers] = useState<{ value: Player; label: string; }[]>([]);
  const [firstPlayer, setFirstPlayer] = useState<Player | undefined>();
  const [secondPlayer, setSecondPlayer] = useState<Player | undefined>();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  async function fetchPlayers(): Promise<void> {
    try {
      const response = await api.get('/players', {
        params: {
          limit: 3000,
          page: 1,
        },
      });

      setPlayers(response.data.players.map((player: Player) => ({
        value: player,
        label: player.name,
      })));
    } catch (err) {
      addToast({
        title: 'Erro ao obter os jogadores!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const handleComparePlayers = useCallback(() => {
    if (
      firstPlayer
        && secondPlayer
        && firstPlayer.position === secondPlayer.position
    ) {
      history.push(`/comparison/${firstPlayer.id}/${secondPlayer.id}`);
    } else {
      addToast({
        title: 'Erro ao criar a comparação',
        description: 'Selecione dois jogadores que tenham a mesma posição.',
        type: 'error',
      });
    }
  }, [history, firstPlayer, secondPlayer, addToast]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    setButtonIsDisabled(!(firstPlayer && secondPlayer));
  }, [firstPlayer, secondPlayer]);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleComparePlayers}>
          <Top>
            <h1>Comparar jogadores</h1>
            <Button type="submit" disabled={buttonIsDisabled}>
              Comparar Jogadores
            </Button>
          </Top>
          <FormContainer>
            <Select
              name="firstPlayer"
              label="Primeiro jogador"
              onChange={({ value }) => setFirstPlayer(value)}
              placeholder="Selecione o primeiro jogador"
              options={players}
            />
            <Select
              name="secondPlayer"
              label="Segundo jogador"
              onChange={({ value }) => setSecondPlayer(value)}
              placeholder="Selecione o segundo jogador"
              options={players}
            />
          </FormContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreateComparison;
