import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import Rating from 'react-rating';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Select from '../../components/Select';
import File from '../../components/File';

import FormErrors from '../../errors/formErrors';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import handleFormatDate from '../../utils/handleFormatDate';
import positionAttributes from '../../utils/positionAttributes';
import handleSlugWord from '../../utils/handleSlugWord';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import { labels } from '../../utils/handleChartLabels';

import api from '../../services/api';

import {
  Container,
  Wrapper,
  Top,
  FormContainer,
  InputRow,
  FileInputRow,
  InputsContainer,
  RatingContainer
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

const EditPlayer: React.FC = () => {
  const { params } = useRouteMatch() as any;

  const theme = useTheme();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [initialData, setInitialData] = useState<any | undefined>();
  const [position, setPosition] = useState<{ value: number; label: string; }>();
  const [preferredFoot, setPreferredFoot] = useState<string>();
  const [club, setClub] = useState<number>();
  const [clubs, setClubs] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<{ [field: string]: number }>();
  const [characteristics, setCharacteristics] = useState<{ [field: string]: number }>();

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

  function renderFieldsets(fields: Record<string, string[]>) {
    return Object.keys(fields).map((fieldKey) => (
      <fieldset key={fieldKey}>
        <legend>{handleAttributesTypesName(fieldKey)}</legend>
        <InputsContainer>
          <Scope path={fieldKey}>
            {renderInputs(fields[fieldKey])}
          </Scope>
        </InputsContainer>
      </fieldset>
    ));
  }

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

  async function fetchPlayerDetails() {
    try {
      const playerResponse = await api.get(`/players/${params.id}`);

      const {
        attributes, ...player
      } = playerResponse.data;

      Object.assign(player, {
        birth_date: handleFormatDate(player.birth_date),
      });

      const parsedStars: { [field: string]: number } = {};
      const parsedCharacteristics: { [field: string]: number } = {};

      const playerAttributes: Record<string, Record<string, number>> = {};

      attributes.forEach((attribute: Attribute) => {
        if (attribute.type === 'technical_attributes') {
          parsedStars[attribute.name] = attribute.value / 2;
        }

        if (attribute.type === 'characteristics') {
          parsedCharacteristics[attribute.name] = attribute.value;
        }
      });

      setInitialData({ player, ...playerAttributes });
      setPosition({ value: player.position_id, label: player.position });
      setPreferredFoot(player.preferred_footer);
      setClub(player.club_id);
      setCharacteristics(parsedCharacteristics);
      setStars(parsedStars);
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

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

      if (player.avatar) {
        const avatarData = new FormData();

        avatarData.set('file', player.avatar);

        const avatarResponse = await api.post('/files', avatarData);

        Object.assign(player, {
          avatar_id: avatarResponse.data.id,
        });
      }

      if (player.heat_map) {
        const heatMapData = new FormData();

        heatMapData.set('file', player.heat_map);

        const heatMapResponse = await api.post('/files', heatMapData);

        Object.assign(player, {
          heat_map_id: heatMapResponse.data.id,
        });
      }

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

      if (characteristics) {
        Object.keys(characteristics).forEach((characteristic) => {
          attributes.push({
            name: characteristic,
            type: 'characteristics',
            value: characteristics[characteristic as never],
          });
        });
      }

      await api.put(`/players/${params.id}`, {
        ...player,
        attributes,
        club_id: club,
        position_id: position?.value,
        preferred_footer: preferredFoot,
      });

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Jogador editado com sucesso.',
      });

      history.push('/players');
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
  }, [addToast, history, club, position, preferredFoot, stars, characteristics]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    fetchClubs();
    fetchPositions();
    fetchPlayerDetails();
  }, []);

  return (
    <Container>
      <Wrapper>
        {
          initialData ? (
            <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
              <Top>
                <h1>Edição de jogadores</h1>
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
                      isDisabled
                      name="player.position"
                      label="Posição"
                      onChange={(value) => setPosition(value)}
                      placeholder="Selecione uma posição"
                      defaultValue={{
                        value: initialData.player.position_id,
                        label: initialData.player.position,
                      }}
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
                      defaultValue={{
                        value: initialData.player.club_id,
                        label: initialData.player.club.name,
                      }}
                      options={clubs}
                    />
                    <Select
                      name="player.preferred_footer"
                      label="Pé preferido"
                      onChange={({ value }) => setPreferredFoot(value)}
                      placeholder="Selecione o pé preferido"
                      defaultValue={{
                        value: initialData.player.preferred_footer,
                        label: initialData.player.preferred_footer,
                      }}
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
                    <TextArea
                      name="player.note"
                      label="Observações sobre o jogador"
                      placeholder="Insira as observações sobre o jogador"
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
                {
                  characteristics && (
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
                  )
                }
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

export default EditPlayer;
