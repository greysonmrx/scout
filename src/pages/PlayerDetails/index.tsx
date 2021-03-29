import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Radar from '../../components/Radar';
import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import handleChartLabels, { labels } from '../../utils/handleChartLabels';
import handleBirthDate from '../../utils/handleBirthDate';

import api from '../../services/api';

import {
  Container,
  Wrapper,
  Top,
  Informations,
  Observations,
  TopInformations,
  AttributesList,
  Avatar,
  Attributes,
  AttributeType,
} from './styles';

type Player = {
  id: number;
  name: string;
  heat_map: string;
  avatar: string;
  birth_date: string;
  club_id: number;
  position_id: number;
  preferred_footer: string;
  height: number;
  weight: number;
  note: string;
  club: {
    name: string;
    shield: string;
  };
  position: string;
  technical_attributes: {
    heading: number;
    crossing: number;
    tackling: number;
    finishing: number;
    dribbling: number;
    long_throws: number;
    free_kick_taking: number;
    marking: number;
    passing: number;
    technique: number;
  };
  mental_attributes: {
    effort: number;
    anticipation: number;
    intelligence: number;
    concentration: number;
    determination: number;
    flair: number;
    teamwork: number;
    leadership: number;
    positioning: number;
    off_the_ball: number;
    vision: number;
  };
  physical_attributes: {
    acceleration: number;
    velocity: number;
    agillity: number;
    body_of_game: number;
    strength: number;
    pace: number;
  };
  owner: {
    id: number;
    name: string;
    avatar: string;
  };
};

const PlayerDetails: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const { params } = useRouteMatch() as any;

  const { addToast } = useToast();

  const [selectedAttributeType, setSelectedAttributeType] = useState<
    'technical_attributes' |
    'mental_attributes' |
    'physical_attributes'
  >('technical_attributes');
  const [player, setPlayer] = useState<Player | undefined>();

  async function fetchPlayerDetails() {
    try {
      const playerResponse = await api.get(`players/${params.id}`);

      setPlayer(playerResponse.data);
    } catch (err) {
      addToast({
        title: 'Erro ao obter as informações!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, []);

  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Informações do jogador</h1>
          <Button onClick={handleGoBack}>Voltar</Button>
        </Top>
        {
          !player ? (
            <p>Carregando</p>
          ) : (
            <>
              <Informations>
                <TopInformations>
                  <div>
                    <Avatar>
                      <img src={player.club.shield} alt={player.club.name} />
                      <img src={player.avatar} alt={player.name} />
                    </Avatar>
                    <div>
                      <h3>{player.name}</h3>
                      <h5>{player.club.name}</h5>
                      <AttributesList>
                        <li>
                          <strong>Idade</strong>
                          <span>{handleBirthDate(player.birth_date)}</span>
                        </li>
                        <li>
                          <strong>Posição</strong>
                          <span>{player.position}</span>
                        </li>
                        <li>
                          <strong>Pé preferido</strong>
                          <span>{player.preferred_footer}</span>
                        </li>
                        <li>
                          <strong>Altura</strong>
                          <span>
                            {player.height}
                            {' '}
                            cm
                          </span>
                        </li>
                        <li>
                          <strong>Peso</strong>
                          <span>
                            {player.weight}
                            {' '}
                            kg
                          </span>
                        </li>
                      </AttributesList>
                    </div>
                  </div>
                  <div>
                    <h3>Mapa de calor</h3>
                    <img src={player.heat_map} alt="Mapa de calor" />
                  </div>
                </TopInformations>
                <Observations>
                  <h3>Observações</h3>
                  <p>{player.note}</p>
                </Observations>
              </Informations>
              <Attributes>
                <h1>Atributos</h1>
                <MenuTable>
                  <ul>
                    <li>
                      <AttributeType
                        isActive={selectedAttributeType === 'technical_attributes'}
                        onClick={() => setSelectedAttributeType('technical_attributes')}
                      >
                        Técnicos
                      </AttributeType>
                    </li>
                    <li>
                      <AttributeType
                        isActive={selectedAttributeType === 'mental_attributes'}
                        onClick={() => setSelectedAttributeType('mental_attributes')}
                      >
                        Mentais
                      </AttributeType>
                    </li>
                    <li>
                      <AttributeType
                        isActive={selectedAttributeType === 'physical_attributes'}
                        onClick={() => setSelectedAttributeType('physical_attributes')}
                      >
                        Físicos
                      </AttributeType>
                    </li>
                  </ul>
                </MenuTable>
                <Radar
                  data={{
                    labels: handleChartLabels(
                      player[selectedAttributeType],
                      labels[selectedAttributeType],
                    ),
                    datasets: [
                      {
                        borderWidth: 2,
                        data: Object.values(player[selectedAttributeType]),
                        pointBackgroundColor: theme.colors.blue,
                        backgroundColor: rgba(theme.colors.blue, 0.25),
                        borderColor: theme.colors.blue,
                      },
                    ],
                  }}
                  legend={{
                    display: false,
                  }}
                />
              </Attributes>
            </>
          )
        }
      </Wrapper>
    </Container>
  );
};

export default PlayerDetails;
