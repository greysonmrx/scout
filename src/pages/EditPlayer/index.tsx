import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Select from '../../components/Select';
import File from '../../components/File';

import FormErrors from '../../errors/formErrors';

import { useToast } from '../../hooks/toast';

import {
  Container, Wrapper, Top, FormContainer, InputRow, FileInputRow,
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
  technical_attributes: {
    heading: number;
    corners: number;
    crossing: number;
    tackling: number;
    finishing: number;
    dribbling: number;
    long_throws: number;
    free_kick_taking: number;
    marking: number;
    penalty_taking: number;
    passing: number;
    first_touch: number;
    long_shots: number;
    technique: number;
  };
  mental_attributes: {
    aggression: number;
    anticipation: number;
    bravery: number;
    composure: number;
    concentration: number;
    decisions: number;
    determination: number;
    flair: number;
    leadership: number;
    off_the_ball: number;
    positioning: number;
    teamwork: number;
    vision: number;
    work_rate: number;
  };
  physical_attributes: {
    stamina: number;
    acceleration: number;
    agillity: number;
    natural_fitness: number;
    balance: number;
    strength: number;
    jumping_reach: number;
    pace: number;
  };
};

const EditPlayer: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const initialData = {
    player: {
      name: 'Lionel Messi',
      avatar: 'http://localhost:5000/files/messi.png',
      club: {
        id: 2,
        name: 'Barcelona',
      },
      birth_date: '1987-06-24',
      position: {
        id: 1,
        name: 'Ponta Esquerda',
      },
      preferred_footer: 'Direito',
      height: 184,
      weight: 83,
      heat_map: 'http://localhost:5000/files/mapa.png',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ornare porta. Duis posuere nibh velit, eu fermentum ante accumsan vel. Etiam urna est, consectetur sed varius sed, volutpat vitae sapien. Integer gravida non est sit amet pharetra. Nullam suscipit sollicitudin porttitor. Etiam bibendum nisi quam. Phasellus quis dolor quis est pellentesque porta eu non nunc. Curabitur lobortis ornare tempor. Cras aliquet nunc a purus tempor sollicitudin. Phasellus tempus commodo leo ullamcorper scelerisque. Integer quis ullamcorper risus, sit amet vestibulum eros.',
    },
    technical_attributes: {
      heading: 17,
      corners: 13,
      crossing: 14,
      tackling: 8,
      finishing: 19,
      dribbling: 18,
      long_throws: 11,
      free_kick_taking: 16,
      marking: 5,
      penalty_taking: 18,
      passing: 14,
      first_touch: 16,
      long_shots: 18,
      technique: 18,
    },
    mental_attributes: {
      aggression: 9,
      anticipation: 17,
      bravery: 15,
      composure: 15,
      concentration: 15,
      decisions: 15,
      determination: 20,
      flair: 18,
      leadership: 15,
      off_the_ball: 18,
      positioning: 6,
      teamwork: 10,
      vision: 14,
      work_rate: 12,
    },
    physical_attributes: {
      stamina: 17,
      acceleration: 15,
      agillity: 13,
      natural_fitness: 18,
      balance: 10,
      strength: 18,
      jumping_reach: 16,
      pace: 19,
    },
  };

  const [position, setPosition] = useState<number>(initialData.player.position.id);
  const [preferredFoot, setPreferredFoot] = useState<string>(initialData.player.preferred_footer);
  const [club, setClub] = useState<number>(initialData.player.club.id);
  const [loading, setLoading] = useState(false);

  function handleSubmit(data: FormData) {
    setLoading(true);
    formRef.current?.setErrors({});

    Yup.setLocale({
      mixed: {
        default: 'Não é válido',
      },
      number: {
        min: 'Precisa ser maior ou igual a ${min}',
        max: 'Precisa ser menor ou igual a ${max}',
      },
    });

    const schema = Yup.object().shape({
      player: Yup.object().shape({
        name: Yup.string().required(FormErrors.REQUIRED),
        birth_date: Yup.string().required(FormErrors.REQUIRED),
        height: Yup.number().min(0).required(FormErrors.REQUIRED),
        weight: Yup.number().default(0).min(0).required(FormErrors.REQUIRED),
        note: Yup.string().required(FormErrors.REQUIRED),
      }),
      technical_attributes: Yup.object().shape({
        heading: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        corners: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        crossing: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        tackling: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        finishing: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        dribbling: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        long_throws: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        free_kick_taking: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        marking: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        penalty_taking: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        passing: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        first_touch: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        long_shots: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        technique: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
      }),
      mental_attributes: Yup.object().shape({
        aggression: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        anticipation: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        bravery: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        composure: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        concentration: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        decisions: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        determination: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        flair: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        leadership: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        off_the_ball: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        positioning: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        teamwork: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        vision: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        work_rate: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
      }),
      physical_attributes: Yup.object().shape({
        stamina: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        acceleration: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        agillity: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        natural_fitness: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        balance: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        strength: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        jumping_reach: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
        pace: Yup.number()
          .default(0)
          .min(0)
          .max(20)
          .required(FormErrors.REQUIRED),
      }),
    });

    schema.validate(data, {
      abortEarly: false,
    }).then(() => {
      const { player } = data;

      if (player.avatar) {
        console.log('Upload new player avatar');
      }

      if (player.heat_map) {
        console.log('Upload new player heat map');
      }

      console.log(data);
      console.log(position);
      console.log(preferredFoot);
      console.log(club);

      // Store player
    }).catch((err) => {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            Object.assign(validationErrors, {
              [error.path]: error.message,
            });
          }
        });

        formRef.current?.setErrors(validationErrors);
      }
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <Container>
      <Wrapper>
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
                  name="player.position"
                  label="Posição"
                  onChange={({ value }) => setPosition(value)}
                  placeholder="Selecione uma posição"
                  defaultValue={{
                    value: initialData.player.position.id,
                    label: initialData.player.position.name,
                  }}
                  options={[
                    {
                      value: 1,
                      label: 'Ponta esquerda',
                    },
                    {
                      value: 2,
                      label: 'Lateral direita',
                    },
                  ]}
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
                    value: initialData.player.club.id,
                    label: initialData.player.club.name,
                  }}
                  options={[
                    {
                      value: 1,
                      label: 'Flamengo',
                    },
                    {
                      value: 2,
                      label: 'Barcelona',
                    },
                    {
                      value: 3,
                      label: 'São Paulo',
                    },
                    {
                      value: 4,
                      label: 'Fluminense',
                    },
                  ]}
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
            <fieldset>
              <legend>Atributos Técnicos</legend>
              <InputRow columns={5}>
                <Input
                  name="technical_attributes.heading"
                  label="Cabeceamento"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.corners"
                  label="Cantos"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.crossing"
                  label="Cruzamentos"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.tackling"
                  label="Desarme"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.marking"
                  label="Marcação"
                  type="number"
                  required
                />
              </InputRow>
              <InputRow columns={5}>
                <Input
                  name="technical_attributes.finishing"
                  label="Finalização"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.dribbling"
                  label="Finta"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.passing"
                  label="Passe"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.free_kick_taking"
                  label="Livres"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.technique"
                  label="Técnica"
                  type="number"
                  required
                />
              </InputRow>
              <InputRow columns={4}>
                <Input
                  name="technical_attributes.long_shots"
                  label="Remates de Longe"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.penalty_taking"
                  label="Marcação de Penálti"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.long_throws"
                  label="Lançamentos Longos"
                  type="number"
                  required
                />
                <Input
                  name="technical_attributes.first_touch"
                  label="Primeiro Toque"
                  type="number"
                  required
                />
              </InputRow>
            </fieldset>
            <fieldset>
              <legend>Atributos Mentais</legend>
              <InputRow columns={5}>
                <Input
                  name="mental_attributes.aggression"
                  label="Agressividade"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.anticipation"
                  label="Antecipação"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.bravery"
                  label="Bravura"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.composure"
                  label="Compostura"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.leadership"
                  label="Liderança"
                  type="number"
                  required
                />
              </InputRow>
              <InputRow columns={5}>
                <Input
                  name="mental_attributes.concentration"
                  label="Concentração"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.decisions"
                  label="Decições"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.determination"
                  label="Determinação"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.vision"
                  label="Visão de Jogo"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.off_the_ball"
                  label="Sem Bola"
                  type="number"
                  required
                />
              </InputRow>
              <InputRow columns={4}>
                <Input
                  name="mental_attributes.positioning"
                  label="Posicionamento"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.teamwork"
                  label="Trabalho de Equipe"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.flair"
                  label="Imprevisibilidade"
                  type="number"
                  required
                />
                <Input
                  name="mental_attributes.work_rate"
                  label="Índice de Trabalho"
                  type="number"
                  required
                />
              </InputRow>
            </fieldset>
            <fieldset>
              <legend>Atributos Físicos</legend>
              <InputRow columns={4}>
                <Input
                  name="physical_attributes.acceleration"
                  label="Aceleração"
                  type="number"
                  required
                />
                <Input
                  name="physical_attributes.agillity"
                  label="Agilidade"
                  type="number"
                  required
                />
                <Input
                  name="physical_attributes.natural_fitness"
                  label="Aptidão Física"
                  type="number"
                  required
                />
                <Input
                  name="physical_attributes.balance"
                  label="Equilíbrio"
                  type="number"
                  required
                />
              </InputRow>
              <InputRow columns={4}>
                <Input
                  name="physical_attributes.strength"
                  label="Força"
                  type="number"
                  required
                />
                <Input
                  name="physical_attributes.jumping_reach"
                  label="Impulsão"
                  type="number"
                  required
                />
                <Input
                  name="physical_attributes.pace"
                  label="Resistência"
                  type="number"
                  required
                />
                <Input
                  name="physical_attributes.stamina"
                  label="Velocidade"
                  type="number"
                  required
                />
              </InputRow>
            </fieldset>
          </FormContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default EditPlayer;
