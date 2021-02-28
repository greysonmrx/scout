import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { useHistory } from 'react-router-dom';

import Radar from '../../components/Radar';
import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';

import handleChartLabels, { labels } from '../../utils/handleChartLabels';
import handleBirthDate from '../../utils/handleBirthDate';

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

const PlayerDetails: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();

  const [selectedAttributeType, setSelectedAttributeType] = useState<
    'technical_attributes' |
    'mental_attributes' |
    'physical_attributes'
  >('technical_attributes');
  const [player, setPlayer] = useState({
    id: 5,
    name: 'Lionel Messi',
    avatar: 'http://localhost:5000/files/messi.png',
    club: {
      shield: 'http://localhost:5000/files/barcelona.png',
      name: 'Barcelona',
    },
    birth_date: '1987-06-24',
    position: 'Ponta Direita',
    preferred_footer: 'Direito',
    height: 184,
    weight: 83,
    heat_map: 'http://localhost:5000/files/mapa.png',
    observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ornare porta. Duis posuere nibh velit, eu fermentum ante accumsan vel. Etiam urna est, consectetur sed varius sed, volutpat vitae sapien. Integer gravida non est sit amet pharetra. Nullam suscipit sollicitudin porttitor. Etiam bibendum nisi quam. Phasellus quis dolor quis est pellentesque porta eu non nunc. Curabitur lobortis ornare tempor. Cras aliquet nunc a purus tempor sollicitudin. Phasellus tempus commodo leo ullamcorper scelerisque. Integer quis ullamcorper risus, sit amet vestibulum eros.',
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

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Top>
          <h1>Informações do jogador</h1>
          <Button onClick={handleGoBack}>Voltar</Button>
        </Top>
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
            <p>{player.observations}</p>
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
      </Wrapper>
    </Container>
  );
};

export default PlayerDetails;
