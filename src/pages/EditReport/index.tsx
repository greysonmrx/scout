import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Rating from 'react-rating';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Wrapper, Top, FormContainer, InputRow, RatingContainer,
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

interface FormData {
  note: string;
  recommendation_note: string;
  recommendation_percentage: number;
}

const EditReport: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch() as any;
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<FormData | undefined>();
  const [players, setPlayers] = useState<{ value: number; label: string; }[]>([]);
  const [player, setPlayer] = useState<number | undefined>();
  const [potentialCapacity, setPotentialCapacity] = useState<number>(0);
  const [currentCapacity, setCurrentCapacity] = useState<number>(0);
  const [pros, setPros] = useState<string[]>(['']);
  const [cons, setCons] = useState<string[]>(['']);

  const handleChangePro = useCallback((value: string, index: number) => {
    const updatedPros = pros.map((pro, itemIndex) => {
      if (itemIndex === index) {
        return value;
      }

      return pro;
    });

    setPros(updatedPros);
  }, [pros]);

  const handleChangeCon = useCallback((value: string, index: number) => {
    setCons((oldState) => oldState.map((pro, itemIndex) => {
      if (itemIndex === index) {
        return value;
      }

      return pro;
    }));
  }, []);

  const handleAddPro = useCallback(() => {
    setPros((oldState) => [...oldState, '']);
  }, []);

  const handleAddCon = useCallback(() => {
    setCons((oldState) => [...oldState, '']);
  }, []);

  const handleRemovePro = useCallback((index: number) => {
    setPros((oldState) => oldState.filter((_, itemIndex) => itemIndex !== index));
  }, []);

  const handleRemoveCon = useCallback((index: number) => {
    setCons((oldState) => oldState.filter((_, itemIndex) => itemIndex !== index));
  }, []);

  async function fetchReportDetails(): Promise<void> {
    try {
      const response = await api.get(`/reports/${params.id}`);

      setPlayer(response.data.player_id);
      setCons(response.data.cons);
      setPros(response.data.pros);
      setPotentialCapacity(response.data.potential_capacity / 2);
      setCurrentCapacity(response.data.current_capacity / 2);
      setInitialData({
        note: response.data.note,
        recommendation_note: response.data.recommendation_note,
        recommendation_percentage: response.data.recommendation_percentage,
      });
    } catch (err) {
      addToast({
        title: 'Erro ao obter o relatório!',
        type: 'error',
        description: err?.response.data.message,
      });
    }
  }

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      note: Yup.string().required(),
      recommendation_note: Yup.string().required(),
      recommendation_percentage: Yup.number().min(0).required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (typeof player === 'number') {
        await api.put(`/reports/${params.id}`, {
          ...data,
          cons: cons.filter((con) => Boolean(con)),
          pros: pros.filter((pro) => Boolean(pro)),
          player_id: player,
          potential_capacity: potentialCapacity * 2,
          current_capacity: currentCapacity * 2,
        });

        addToast({
          title: 'Sucesso!',
          type: 'success',
          description: 'Relatório editado com sucesso.',
        });

        history.push('/reports');
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
  }, [
    player,
    cons,
    pros,
    history,
    params,
    potentialCapacity,
    currentCapacity,
    addToast,
  ]);

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
      await fetchReportDetails();
    })();
  }, []);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Wrapper>
        {initialData ? (
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <Top>
              <h1>Edição de relatórios</h1>
              <div>
                <Button type="button" onClick={handleGoBack}>Voltar</Button>
                <Button type="submit" loading={loading}>Salvar relatório</Button>
              </div>
            </Top>
            <FormContainer>
              <fieldset>
                <legend>Dados</legend>
                <InputRow style={{ gridTemplateColumns: '0.75fr 0.75fr 1fr' }}>
                  <Select
                    name="player"
                    label="Jogador"
                    onChange={({ value }) => setPlayer(value)}
                    placeholder="Selecione um jogador"
                    options={players}
                    defaultValue={{
                      value: player,
                      label: players.find((item) => item.value === player)?.label,
                    }}
                  />
                  <Input
                    name="recommendation_percentage"
                    label="Recomendação"
                    placeholder="Porcentagem da recomendação"
                    type="number"
                    min={0}
                    max={100}
                    required
                  />
                  <div className="ratings-container">
                    <RatingContainer>
                      <label htmlFor="current_capacity">Capacidade atual</label>
                      <Rating
                        fractions={2}
                        emptySymbol={<FaRegStar size={40} color={theme.colors.yellow} />}
                        fullSymbol={<FaStar size={40} color={theme.colors.yellow} />}
                        initialRating={currentCapacity}
                        onChange={setCurrentCapacity}
                      />
                    </RatingContainer>
                    <RatingContainer>
                      <label htmlFor="potential_capacity">Capacidade potencial</label>
                      <Rating
                        fractions={2}
                        emptySymbol={<FaRegStar size={40} color={theme.colors.yellow} />}
                        fullSymbol={<FaStar size={40} color={theme.colors.yellow} />}
                        initialRating={potentialCapacity}
                        onChange={setPotentialCapacity}
                      />
                    </RatingContainer>
                  </div>
                </InputRow>
                <InputRow columns={1}>
                  <TextArea
                    name="note"
                    label="Observações sobre o jogador"
                    placeholder="Insira as observações sobre o jogador"
                    required
                  />
                </InputRow>
                <InputRow columns={1}>
                  <TextArea
                    name="recommendation_note"
                    label="Observações sobre a recomendação"
                    placeholder="Insira as observações sobre a recomendação"
                    required
                  />
                </InputRow>
                <InputRow columns={2}>
                  <div className="pros-cons-container">
                    <label htmlFor="pros">Prós</label>
                    {
                    pros.map((pro, index) => (
                      <div key={`${index}`} className="pros-cons-input-container">
                        <Input
                          name="pro"
                          placeholder="Pró"
                          onChange={(value) => handleChangePro(value.target.value, index)}
                          value={pro}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePro(index)}
                        >
                          <FiTrash2
                            size={24}
                            color={theme.colors.red.error}
                          />
                        </button>
                      </div>
                    ))
                  }
                    <Button type="button" onClick={handleAddPro}>Adicionar pró</Button>
                  </div>
                  <div className="pros-cons-container">
                    <label htmlFor="pros">Contras</label>
                    {
                    cons.map((con, index) => (
                      <div key={`${index}`} className="pros-cons-input-container">
                        <Input
                          name="con"
                          placeholder="Contra"
                          onChange={(value) => handleChangeCon(value.target.value, index)}
                          value={con}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCon(index)}
                        >
                          <FiTrash2
                            size={24}
                            color={theme.colors.red.error}
                          />
                        </button>
                      </div>
                    ))
                  }
                    <Button type="button" onClick={handleAddCon}>Adicionar contra</Button>
                  </div>
                </InputRow>
              </fieldset>
            </FormContainer>
          </Form>
        ) : <p>Carregando...</p>}
      </Wrapper>
    </Container>
  );
};

export default EditReport;
