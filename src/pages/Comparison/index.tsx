import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { rgba } from 'polished';

import MenuTable from '../../components/MenuTable';
import Radar from '../../components/Radar';
import AttributesList from '../../components/AttributesList';

import handleChartLabels, { labels } from '../../utils/handleChartLabels';
import handleBirthDate from '../../utils/handleBirthDate';

import {
  Container, Wrapper, Top, Avatar, Informations, Attributes, AttributeType,
} from './styles';

const Comparison: React.FC = () => {
  const theme = useTheme();

  const [selectedAttributeType, setSelectedAttributeType] = useState<
    'technical_attributes' |
    'mental_attributes' |
    'physical_attributes'
  >('technical_attributes');
  const [firstPlayer, setFirstPlayer] = useState({
    name: 'Bruno Henrique',
    avatar: 'http://localhost:5000/files/bruno_henrique.png',
    club: {
      avatar: 'http://localhost:5000/files/flamengo.png',
      name: 'Flamengo',
    },
    birth_date: '1990-12-30',
    position: 'Ponta esquerda',
    recommendation: 53,
    preferred_footer: 'Direito',
    height: 184,
    weight: 83,
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
  });
  const [secondPlayer, setSecondPlayer] = useState({
    name: 'Neymar Jr.',
    avatar: 'http://localhost:5000/files/neymar.png',
    club: {
      avatar: 'http://localhost:5000/files/psg.png',
      name: 'Paris Saint-Germain',
    },
    birth_date: '1992-02-05',
    position: 'Ponta esquerda',
    recommendation: 91,
    preferred_footer: 'Direito',
    height: 175,
    weight: 74,
    technical_attributes: {
      heading: 11,
      corners: 18,
      crossing: 17,
      tackling: 17,
      finishing: 12,
      dribbling: 11,
      long_throws: 18,
      free_kick_taking: 11,
      marking: 18,
      penalty_taking: 10,
      passing: 18,
      first_touch: 18,
      long_shots: 15,
      technique: 12,
    },
    mental_attributes: {
      aggression: 17,
      anticipation: 12,
      bravery: 11,
      composure: 17,
      concentration: 17,
      decisions: 18,
      determination: 15,
      flair: 12,
      leadership: 11,
      off_the_ball: 11,
      positioning: 16,
      teamwork: 18,
      vision: 11,
      work_rate: 13,
    },
    physical_attributes: {
      stamina: 12,
      acceleration: 9,
      agillity: 7,
      natural_fitness: 11,
      balance: 15,
      strength: 11,
      jumping_reach: 12,
      pace: 11,
    },
  });

  return (
    <Container>
      <Wrapper>
        <Top>
          <div>
            <Avatar>
              <img src="http://localhost:5000/files/flamengo.png" alt="Flamengo" />
              <img src="http://localhost:5000/files/bruno_henrique.png" alt="Bruno Henrique" />
            </Avatar>
            <div>
              <h1>Bruno Henrique</h1>
              <h3>Flamengo</h3>
            </div>
          </div>
          <strong>X</strong>
          <div>
            <div>
              <h1>Neymar Jr.</h1>
              <h3>Paris Saint-Germain</h3>
            </div>
            <Avatar>
              <img src="http://localhost:5000/files/psg.png" alt="Paris Saint-Germain" />
              <img src="http://localhost:5000/files/neymar.png" alt="Neymar Jr." />
            </Avatar>
          </div>
        </Top>
        <Informations>
          <h1>Informações</h1>
          <div>
            <div>
              <AttributesList>
                <li>
                  <strong>Nome</strong>
                  <span>{firstPlayer.name}</span>
                </li>
                <li>
                  <strong>Idade</strong>
                  <span>{handleBirthDate(firstPlayer.birth_date)}</span>
                </li>
                <li>
                  <strong>Posição</strong>
                  <span>{firstPlayer.position}</span>
                </li>
                <li>
                  <strong>Time</strong>
                  <span>{firstPlayer.club.name}</span>
                </li>
                <li>
                  <strong>Pé preferido</strong>
                  <span>{firstPlayer.preferred_footer}</span>
                </li>
                <li>
                  <strong>Altura</strong>
                  <span>
                    {firstPlayer.height}
                    {' '}
                    cm
                  </span>
                </li>
                <li>
                  <strong>Peso</strong>
                  <span>
                    {firstPlayer.weight}
                    {' '}
                    kg
                  </span>
                </li>
                <li>
                  <strong>Recomendação</strong>
                  <span>
                    {firstPlayer.recommendation}
                    {' '}
                    %
                  </span>
                </li>
              </AttributesList>
            </div>
            <div>
              <AttributesList>
                <li>
                  <strong>Nome</strong>
                  <span>{secondPlayer.name}</span>
                </li>
                <li>
                  <strong>Idade</strong>
                  <span>{handleBirthDate(secondPlayer.birth_date)}</span>
                </li>
                <li>
                  <strong>Posição</strong>
                  <span>{secondPlayer.position}</span>
                </li>
                <li>
                  <strong>Time</strong>
                  <span>{secondPlayer.club.name}</span>
                </li>
                <li>
                  <strong>Pé preferido</strong>
                  <span>{secondPlayer.preferred_footer}</span>
                </li>
                <li>
                  <strong>Altura</strong>
                  <span>
                    {secondPlayer.height}
                    {' '}
                    cm
                  </span>
                </li>
                <li>
                  <strong>Peso</strong>
                  <span>
                    {secondPlayer.weight}
                    {' '}
                    kg
                  </span>
                </li>
                <li>
                  <strong>Recomendação</strong>
                  <span>
                    {secondPlayer.recommendation}
                    {' '}
                    %
                  </span>
                </li>
              </AttributesList>
            </div>
          </div>
        </Informations>
        <Attributes>
          <div>
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
                  firstPlayer[selectedAttributeType],
                  labels[selectedAttributeType],
                ),
                datasets: [
                  {
                    borderWidth: 2,
                    data: Object.values(firstPlayer[selectedAttributeType]),
                    pointBackgroundColor: theme.colors.blue,
                    backgroundColor: rgba(theme.colors.blue, 0.25),
                    borderColor: theme.colors.blue,
                    label: firstPlayer.name,
                  },
                  {
                    borderWidth: 2,
                    data: Object.values(secondPlayer[selectedAttributeType]),
                    pointBackgroundColor: theme.colors.red.enemy,
                    backgroundColor: rgba(theme.colors.red.enemy, 0.25),
                    borderColor: theme.colors.red.enemy,
                    label: secondPlayer.name,
                    minBarLength: 0,
                  },
                ],
              }}
              legend={{
                display: true,
              }}
            />
          </div>
        </Attributes>
      </Wrapper>
    </Container>
  );
};

export default Comparison;
