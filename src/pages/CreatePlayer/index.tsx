import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import Rating from 'react-rating';
import { useHistory } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Form } from '@unform/web';
import { Scope, FormHandles } from '@unform/core';
import { useTheme } from 'styled-components';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Select from '../../components/Select';
import File from '../../components/File';

import FormErrors from '../../errors/formErrors';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import positionAttributes from '../../utils/positionAttributes';
import handleSlugWord from '../../utils/handleSlugWord';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import { labels } from '../../utils/handleChartLabels';

import {
  Container,
  Wrapper,
  Top,
  FormContainer,
  InputRow,
  FileInputRow,
  InputsContainer,
  RatingContainer,
} from './styles';

type FormData = {
  player: {
    avatar: File;
    heat_map: File;
    name: string;
    birth_date: string;
    height: number;
    weight: number;
    note: string;
  };
};

type AttributesForm = {
  [attributeType: string]: {
    [attribute: string]: number;
  };
};

type Attribute = {
  name: string;
  value: number;
  type: string;
};

type Club = {
  id: number;
  name: string;
  shield: string;
  count_players: number;
  owner: {
    id: number;
    name: string;
  }
};

type Position = {
  id: number;
  name: string;
  count_players: number;
  owner: {
    id: number;
    name: string;
  }
};

const CreatePlayer: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [position, setPosition] = useState<{ value: number; label: string }>();
  const [preferredFoot, setPreferredFoot] = useState<string>();
  const [club, setClub] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [positions, setPositions] = useState([]);
  const [stars, setStars] = useState<{ [field: string]: number }>();
  const [characteristics, setCharacteristics] = useState({
    close_the_goal: 0,
    fast: 0,
    speed_dribbler: 0,
    opportunist: 0,
    defend_with_the_foot: 0,
    finisher: 0,
    technical_dribbler: 0,
    leadership: 0,
    exit_at_intersections: 0,
    shipowner: 0,
    support_leg_actions: 0,
    air_threat: 0,
    careful_at_intersections: 0,
    physically_strong: 0,
    long_side: 0,
    box_to_box: 0,
    elasticity: 0,
    ball_thief: 0,
    set_ball_specialist: 0,
    attack_the_lines: 0,
  });

  async function fetchClubs() {
    try {
      const clubsResponse = await api.get('/clubs', {
        params: {
          limit: 1000,
          page: 1,
        },
      });

      const { clubs: fetchedClubs } = clubsResponse.data;

      const parsedClubs = fetchedClubs.map((currentClub: Club) => ({
        value: currentClub.id,
        label: currentClub.name,
      }));

      setClubs(parsedClubs);
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: 'Erro ao obter os times.',
      });
    }
  }

  async function fetchPositions() {
    try {
      const positionsResponse = await api.get('/positions', {
        params: {
          limit: 1000,
          page: 1,
        },
      });

      const { positions: fetchedPositions } = positionsResponse.data;

      const parsedPositions = fetchedPositions.map((currentPosition: Position) => ({
        value: currentPosition.id,
        label: currentPosition.name,
      }));

      setPositions(parsedPositions);
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: 'Erro ao obter as posições.',
      });
    }
  }

  const renderInputs = useCallback((fields: string[]) => {
    const parsedFields: {
      [field: string]: number;
    } = {};

    fields.forEach(field => {
      parsedFields[field] = 0;
    });

    setStars(parsedFields);

    return fields.map((field) => {
      return (
        <RatingContainer key={field}>
          <label htmlFor="">{labels[field] || field}</label>
          <Rating
            fractions={2}
            emptySymbol={<FaRegStar size={40} color={theme.colors.yellow} />}
            fullSymbol={<FaStar size={40} color={theme.colors.yellow} />}
            initialRating={0}
            stop={3}
            onChange={console.log}
          />
        </RatingContainer>
      )
    });
  }, []);

  const renderFieldsets = useCallback((fields: Record<string, string[]>) => {
    return Object.keys(fields).map((fieldKey) => (
      <fieldset key={fieldKey}>
        <legend>Atributos {handleAttributesTypesName(fieldKey)}</legend>
        <InputsContainer>
          <Scope path={fieldKey}>
            {renderInputs(fields[fieldKey])}
          </Scope>
        </InputsContainer>
      </fieldset>
    ));
  }, [renderInputs]);

  useEffect(() => {
    const parsedFields: {
      [field: string]: number;
    } = {};

    if (position) {
      const fields = positionAttributes[handleSlugWord(position.label)];
      fields.technical_attributes.forEach(field => {
        parsedFields[field] = 0;
      });
    }

    setStars(parsedFields);
  }, [position]);

  const handleChangeStar = useCallback((star: string, value: number) => {
    setStars(oldState => ({
      ...oldState,
      [star]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      player: Yup.object().shape({
        name: Yup.string().required(FormErrors.REQUIRED),
        birth_date: Yup.string().required(FormErrors.REQUIRED),
        height: Yup.number().min(0).required(FormErrors.REQUIRED),
        weight: Yup.number().default(0).min(0).required(FormErrors.REQUIRED),
        note: Yup.string().required(FormErrors.REQUIRED),
      }),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { player } = data;

      let avatarId: number | undefined;
      let heatMapId: number | undefined;

      if (player.avatar) {
        const avatarData = new FormData();

        avatarData.set('file', player.avatar);

        const avatarResponse = await api.post('/files', avatarData);

        avatarId = avatarResponse.data.id;
      }

      if (player.heat_map) {
        const heatMapData = new FormData();

        heatMapData.set('file', player.heat_map);

        const heatMapResponse = await api.post('/files', heatMapData);

        heatMapId = heatMapResponse.data.id;
      }

      if (
        position
          && preferredFoot
          && club
      ) {

        const attributes: Attribute[] = [];

        if (stars) {
          Object.keys(stars).forEach(star => {
            attributes.push({
              name: star,
              type: 'technical_attributes',
              value: stars[star] * 2,
            });
          });
        }

        Object.keys(characteristics).forEach((characteristic) => {
          attributes.push({
            name: characteristic,
            type: 'characteristics',
            value: characteristics[characteristic as never],
          });
        });

        await api.post('/players', {
          ...player,
          attributes,
          club_id: club,
          position_id: position.value,
          preferred_footer: preferredFoot,
          heat_map_id: heatMapId,
          avatar_id: avatarId,
        });

        addToast({
          title: 'Sucesso!',
          type: 'success',
          description: 'Jogador cadastrado com sucesso.',
        });

        history.push('/players');
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
  }, [history, addToast, position, preferredFoot, club, characteristics, stars]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    fetchClubs();
    fetchPositions();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Top>
            <h1>Cadastro de jogadores</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar jogador</Button>
            </div>
          </Top>
          <FormContainer>
            <fieldset>
              <legend>Dados</legend>
              <FileInputRow>
                <File name="player.avatar" width={200} height={200} placeholder="Selecione a imagem do jogador" />
                <File name="player.heat_map" width={275} height={200} placeholder="Selecione a imagem do mapa de calor" />
              </FileInputRow>
              <InputRow columns={3}>
                <Input
                  name="player.name"
                  label="Nome do jogador"
                  placeholder="Insira o nome do jogador"
                  required
                  autoFocus
                />
                <Input
                  name="player.birth_date"
                  label="Data de nascimento"
                  type="date"
                  required
                />
                <Select
                  name="player.position"
                  label="Posição"
                  onChange={(value) => setPosition(value)}
                  placeholder="Selecione uma posição"
                  options={positions}
                />
              </InputRow>
              <InputRow columns={4}>
                <Input
                  name="player.height"
                  label="Altura do jogador"
                  placeholder="Insira a altura do jogador"
                  type="number"
                  required
                />
                <Input
                  name="player.weight"
                  label="Peso do jogador"
                  placeholder="Insira o peso do jogador"
                  type="number"
                  required
                />
                <Select
                  name="player.club"
                  label="Time"
                  onChange={({ value }) => setClub(value)}
                  placeholder="Selecione um time"
                  options={clubs}
                />
                <Select
                  name="player.preferred_footer"
                  label="Pé preferido"
                  onChange={({ value }) => setPreferredFoot(value)}
                  placeholder="Selecione o pé preferido"
                  options={[
                    {
                      value: 'Direito',
                      label: 'Direito',
                    },
                    {
                      value: 'Esquerdo',
                      label: 'Esquerdo',
                    },
                  ]}
                />
              </InputRow>
              <InputRow columns={1}>
                <Input
                  name="player.link"
                  label="Link"
                  type="text"
                  placeholder="Link vídeo do YouTube"
                />
              </InputRow>
              <InputRow columns={1}>
                <TextArea
                  name="player.note"
                  label="Informações sobre o jogador"
                  placeholder="Insira as informações do jogador"
                  required
                />
              </InputRow>
            </fieldset>
            {
              position && stars &&
              <fieldset>
                <legend>Atributos Técnicos</legend>
                <InputsContainer>
                  {
                    Object.keys(stars).map(star => (
                      <RatingContainer key={star}>
                        <label htmlFor="">{labels[star] || star}</label>
                        <Rating
                          fractions={2}
                          emptySymbol={<FaRegStar size={40} color={theme.colors.yellow} />}
                          fullSymbol={<FaStar size={40} color={theme.colors.yellow} />}
                          initialRating={stars[star]}
                          stop={3}
                          onChange={(value) => handleChangeStar(star, value)}
                        />
                      </RatingContainer>
                    ))
                  }
                </InputsContainer>
              </fieldset>
            }
            <fieldset>
              <legend>Características</legend>
              <InputsContainer>
                <Scope path="characteristics">
                  <div className="checkbox-container">
                    <input 
                      id="close_the_goal"
                      name="close_the_goal" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, close_the_goal: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.close_the_goal}
                    />
                    <label htmlFor="close_the_goal">Fecha o gol</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="fast"
                      name="fast" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, fast: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.fast}
                    />
                    <label htmlFor="fast">Rápido</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="speed_dribbler"
                      name="speed_dribbler" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, speed_dribbler: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.speed_dribbler}
                    />
                    <label htmlFor="speed_dribbler">Driblador em velocidade</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="opportunist"
                      name="opportunist" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, opportunist: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.opportunist}
                    />
                    <label htmlFor="opportunist">Oportunista</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="defend_with_the_foot"
                      name="defend_with_the_foot" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, defend_with_the_foot: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.defend_with_the_foot}
                    />
                    <label htmlFor="defend_with_the_foot">Defender com o pé</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="finisher"
                      name="finisher" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, finisher: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.finisher}
                    />
                    <label htmlFor="finisher">Finalizador</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="technical_dribbler"
                      name="technical_dribbler" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, technical_dribbler: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.technical_dribbler}
                    />
                    <label htmlFor="technical_dribbler">Driblador técnico</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="leadership"
                      name="leadership" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, leadership: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.leadership}
                    />
                    <label htmlFor="leadership">Liderança</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="exit_at_intersections"
                      name="exit_at_intersections" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, exit_at_intersections: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.exit_at_intersections}
                    />
                    <label htmlFor="exit_at_intersections">Sai nos cruzamentos</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="shipowner"
                      name="shipowner" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, shipowner: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.shipowner}
                    />
                    <label htmlFor="shipowner">Armador</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="support_leg_actions"
                      name="support_leg_actions" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, support_leg_actions: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.support_leg_actions}
                    />
                    <label htmlFor="support_leg_actions">Ações com perna de apoio</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="air_threat"
                      name="air_threat" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, air_threat: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.air_threat}
                    />
                    <label htmlFor="air_threat">Ameaça aérea</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="careful_at_intersections"
                      name="careful_at_intersections" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, careful_at_intersections: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.careful_at_intersections}
                    />
                    <label htmlFor="careful_at_intersections">Cuidadoso nos cruzamentos</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="physically_strong"
                      name="physically_strong" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, physically_strong: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.physically_strong}
                    />
                    <label htmlFor="physically_strong">Forte fisicamente</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="long_side"
                      name="long_side" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, long_side: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.long_side}
                    />
                    <label htmlFor="long_side">Lateral longo</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="box_to_box"
                      name="box_to_box" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, box_to_box: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.box_to_box}
                    />
                    <label htmlFor="box_to_box">Box to box</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="elasticity"
                      name="elasticity" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, elasticity: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.elasticity}
                    />
                    <label htmlFor="elasticity">Elasticidade</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="ball_thief"
                      name="ball_thief" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, ball_thief: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.ball_thief}
                    />
                    <label htmlFor="ball_thief">Ladrão de bola</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="set_ball_specialist"
                      name="set_ball_specialist" 
                      type="checkbox"
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, set_ball_specialist: event.target.checked ? 1 : 0 }
                      ))} 
                      checked={!!characteristics.set_ball_specialist}
                    />
                    <label htmlFor="set_ball_specialist">Especialista em bola parada</label>
                  </div>
                  <div className="checkbox-container">
                    <input 
                      id="attack_the_lines" 
                      name="attack_the_lines" 
                      type="checkbox" 
                      onChange={(event) => setCharacteristics(oldState => (
                        { ...oldState, attack_the_lines: event.target.checked ? 1 : 0 }
                      ))}
                      checked={!!characteristics.attack_the_lines} 
                    />
                    <label htmlFor="attack_the_lines">Ataca as linhas</label>
                  </div>
                </Scope>
              </InputsContainer>
            </fieldset>
          </FormContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreatePlayer;
