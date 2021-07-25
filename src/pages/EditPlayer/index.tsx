import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';

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

  function renderInputs(fields: string[]) {
    return fields.map((field) => (
      <Input
        key={field}
        name={field}
        label={labels[field] || field}
        type="number"
        max={20}
        min={0}
        required
      />
    ));
  }

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

      const playerAttributes: Record<string, Record<string, number>> = {};

      attributes.forEach((attribute: Attribute) => {
        playerAttributes[attribute.type] = {
          ...playerAttributes[attribute.type],
          [attribute.name]: attribute.value,
        };
      });

      setInitialData({ player, ...playerAttributes });
      setPosition({ value: player.position_id, label: player.position });
      setPreferredFoot(player.preferred_footer);
      setClub(player.club_id);
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

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

      const { player, ...restData } = data;

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

      const playerAttributes = restData as AttributesForm;

      const attributesTypes = Object.keys(playerAttributes);

      const attributes: Attribute[] = [];

      attributesTypes.forEach((attributesType) => {
        const nestedAttributes = Object.keys(playerAttributes[attributesType]);

        nestedAttributes.forEach((nestedAttribute) => {
          attributes.push({
            name: nestedAttribute,
            type: attributesType,
            value: playerAttributes[attributesType][nestedAttribute],
          });
        });
      });

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
  }, [addToast, history, club, position, preferredFoot]);

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
                  position && renderFieldsets(positionAttributes[handleSlugWord(position.label)])
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
