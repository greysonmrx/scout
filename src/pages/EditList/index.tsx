import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import Rating from 'react-rating';
import { FiTrash2 } from 'react-icons/fi';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FaRegStar, FaStar } from 'react-icons/fa';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, FormContainer, InputRow, RatingContainer, Top, Wrapper,
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

type Substitute = {
  player_name?: string;
  player_id?: number;
  capacity: number;
  potential: number
};

type FormData = {
  name: string;
};

const EditList: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { params } = useRouteMatch() as any;

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any | undefined>();
  const [players, setPlayers] = useState<{ value: number; label: string; }[]>([]);
  const [player, setPlayer] = useState<number | undefined>();
  const [substitutes, setSubstitutes] = useState<Substitute[]>([]);

  async function fetchListDetails(): Promise<void> {
    try {
      const listResponse = await api.get(`/lists/${params.id}`);

      const { name, items, player_id } = listResponse.data;

      setInitialData({ name, player: listResponse.data.player });
      setPlayer(player_id);
      setSubstitutes(items.map((substitute: any) => ({
        capacity: substitute.capacity / 2,
        potential: substitute.potential / 2,
        player_id: substitute.player_id,
        player_name: substitute.player.name,
      })));
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const handleChangeSubstitute = useCallback((property: string, value: number, index: number) => {
    setSubstitutes((oldState) => oldState.map((substitute, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...substitute,
          [property]: value,
        };
      }

      return substitute;
    }));
  }, []);

  const handleAddSubstitute = useCallback(() => {
    setSubstitutes((oldState) => [...oldState, {
      capacity: 0,
      potential: 0,
      player_id: undefined,
    }]);
  }, []);

  const handleRemoveSubstitute = useCallback((index: number) => {
    if (substitutes.length === 1) {
      return addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: 'Deve haver pelo menos um substituto.',
      });
    }

    return setSubstitutes((oldState) => oldState.filter((_, itemIndex) => itemIndex !== index));
  }, [substitutes]);

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const allFine = substitutes.every((substitute) => {
        const { capacity, potential, player_id } = substitute;

        return typeof capacity === 'number' && typeof potential === 'number' && typeof player_id === 'number';
      });

      if (typeof player === 'number' && allFine) {
        await api.put(`/lists/${params.id}`, {
          name: data.name,
          player_id: player,
          items: substitutes.map((substitute) => ({
            ...substitute,
            capacity: substitute.capacity * 2,
            potential: substitute.potential * 2,
          })),
        });

        addToast({
          title: 'Sucesso!',
          type: 'success',
          description: 'Lista editada com sucesso.',
        });

        history.push('/lists');
      } else {
        setLoading(false);

        addToast({
          title: 'Ocorreu um erro!',
          type: 'error',
          description: 'Preencha todo o formulário.',
        });
      }
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          title: 'Ocorreu um erro!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    }
  }, [player, substitutes, history, addToast]);

  async function fetchPlayers(): Promise<void> {
    try {
      const response = await api.get('/players', {
        params: {
          limit: 3000,
          page: 1,
        },
      });

      setPlayers(response.data.players.map((fetchedPlayer: Player) => ({
        value: fetchedPlayer.id,
        label: fetchedPlayer.name,
      })));
    } catch (err) {
      addToast({
        title: 'Erro ao obter os jogadores!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  useEffect(() => {
    (async () => {
      await fetchPlayers();
      await fetchListDetails();
    })();
  }, []);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Wrapper>
        {
          initialData ? (
            <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
              <Top>
                <h1>Cadastro de listas</h1>
                <div>
                  <Button type="button" onClick={handleGoBack}>Voltar</Button>
                  <Button type="submit" loading={loading}>Salvar lista</Button>
                </div>
              </Top>
              <FormContainer>
                <fieldset>
                  <legend>Dados</legend>
                  <InputRow style={{ gridTemplateColumns: '1.25fr 0.75fr' }}>
                    <Input
                      name="name"
                      label="Nome"
                      placeholder="Nome da lista"
                      type="text"
                      required
                      autoFocus
                    />
                    <Select
                      name="player"
                      label="Jogador"
                      onChange={({ value }) => setPlayer(value)}
                      placeholder="Selecione um jogador"
                      options={players}
                      defaultValue={{
                        value: initialData.player.id,
                        label: initialData.player.name,
                      }}
                    />
                  </InputRow>
                </fieldset>
                <fieldset>
                  <legend>Substitutos</legend>
                  <InputRow columns={1}>
                    <div className="substitutes-container">
                      {
                        substitutes.map((substitute, index) => (
                          <div key={`${index}`} className="substitutes-input-container">
                            <Select
                              name="substitute"
                              label="Jogador"
                              onChange={({ value, label }) => {
                                handleChangeSubstitute('player_id', value, index);
                                handleChangeSubstitute('player_name', label, index);
                              }}
                              placeholder="Selecione um jogador"
                              options={players}
                              defaultValue={{
                                value: substitute.player_id,
                                label: substitute.player_name,
                              }}
                            />
                            <div className="ratings-container">
                              <RatingContainer>
                                <label htmlFor="current_capacity">Capacidade atual</label>
                                <Rating
                                  fractions={2}
                                  emptySymbol={<FaRegStar size={40} color={theme.colors.yellow} />}
                                  fullSymbol={<FaStar size={40} color={theme.colors.yellow} />}
                                  initialRating={substitute.capacity}
                                  onChange={(value) => handleChangeSubstitute('capacity', value, index)}
                                  stop={3}
                                />
                              </RatingContainer>
                              <RatingContainer>
                                <label htmlFor="potential_capacity">Capacidade potencial</label>
                                <Rating
                                  fractions={2}
                                  emptySymbol={<FaRegStar size={40} color={theme.colors.yellow} />}
                                  fullSymbol={<FaStar size={40} color={theme.colors.yellow} />}
                                  initialRating={substitute.potential}
                                  onChange={(value) => handleChangeSubstitute('potential', value, index)}
                                  stop={3}
                                />
                              </RatingContainer>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSubstitute(index)}
                            >
                              <FiTrash2
                                size={24}
                                color={theme.colors.red.error}
                              />
                            </button>
                          </div>
                        ))
                      }
                      <Button type="button" onClick={handleAddSubstitute}>Adicionar substituto</Button>
                    </div>
                  </InputRow>
                </fieldset>
              </FormContainer>
            </Form>
          ) : (
            <p>Carregando...</p>
          )
        }
      </Wrapper>
    </Container>
  );
};

export default EditList;
