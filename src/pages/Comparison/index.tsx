import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import { rgba } from 'polished';

import MenuTable from '../../components/MenuTable';
import Radar from '../../components/Radar';
import AttributesList from '../../components/AttributesList';

import handleChartLabels from '../../utils/handleChartLabels';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import handleFormattedAttributes, { AttributesTypes } from '../../utils/handleFormattedAttributes';
import handleBirthDate from '../../utils/handleBirthDate';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import noImage from '../../assets/images/no-image.png';

import {
  Container, Wrapper, Top, Avatar, Informations, Attributes, AttributeType,
} from './styles';

type Player = {
  id: number;
  name: string;
  heat_map?: string;
  avatar?: string;
  birth_date: string;
  preferred_footer: string;
  height: number;
  weight: number;
  note: string;
  club_id: number;
  position_id: number;
  club: {
    name: string;
    shield?: string;
  };
  position: string;
  owner: {
    id: number;
    name: string;
    avatar?: string;
  };
  attributes: {
    [attributeType: string]: {
      [attribute: string]: number;
    }
  };
  reports: {
    id: number;
    note: string;
    current_capacity: number;
    potential_capacity: number;
    pros: string[];
    cons: string[];
    recommendation_percentage: number;
    recommendation_note: string;
    owner: {
      id: number;
      name: string;
      avatar?: string;
    };
    created_at: string;
  }[];
};

const Comparison: React.FC = () => {
  const theme = useTheme();

  const { addToast } = useToast();

  const { params } = useRouteMatch() as any;

  const [selectedAttributeType, setSelectedAttributeType] = useState<string>('technical_attributes');
  const [firstPlayer, setFirstPlayer] = useState<Player | undefined>();
  const [secondPlayer, setSecondPlayer] = useState<Player | undefined>();
  const [attributesTypes, setAttributesTypes] = useState<string[]>([]);

  async function fetchPlayers(): Promise<void> {
    try {
      const [firstPlayerResponse, secondPlayerResponse] = await Promise.all([
        api.get(`/players/${params.firstPlayer}`),
        api.get(`/players/${params.secondPlayer}`),
      ]);

      const [attributesKeys, firstPlayerAttributes] = handleFormattedAttributes(
        firstPlayerResponse.data.attributes,
      );
      const [, secondPlayerAttributes] = handleFormattedAttributes(
        secondPlayerResponse.data.attributes,
      );

      setAttributesTypes(attributesKeys);
      setSelectedAttributeType(attributesKeys[0]);

      setFirstPlayer({
        ...firstPlayerResponse.data,
        attributes: firstPlayerAttributes,
      });
      setSecondPlayer({
        ...secondPlayerResponse.data,
        attributes: secondPlayerAttributes,
      });
    } catch (err) {
      addToast({
        title: 'Erro ao obter os jogadores.',
        type: 'error',
        description: err?.response.data.message,
      });
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Container>
      <Wrapper>
        {firstPlayer && secondPlayer && (
        <>
          {' '}
          <Top>
            <div>
              <Avatar>
                <img
                  src={firstPlayer.club?.shield ? firstPlayer.club.shield : noImage}
                  alt={firstPlayer.club.name}
                />
                <img
                  src={firstPlayer?.avatar ? firstPlayer.avatar : noImage}
                  alt={firstPlayer.name}
                />
              </Avatar>
              <div>
                <h1>{firstPlayer.name}</h1>
                <h3>{firstPlayer.club.name}</h3>
              </div>
            </div>
            <strong>X</strong>
            <div>
              <div>
                <h1>{secondPlayer.name}</h1>
                <h3>{secondPlayer.club.name}</h3>
              </div>
              <Avatar>
                <img
                  src={secondPlayer.club?.shield ? secondPlayer.club.shield : noImage}
                  alt={secondPlayer.club.name}
                />
                <img
                  src={secondPlayer?.avatar ? secondPlayer.avatar : noImage}
                  alt={secondPlayer.name}
                />
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
                    <strong>Relatórios</strong>
                    <span>
                      {firstPlayer.reports.length}
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
                    <strong>Relatórios</strong>
                    <span>
                      {secondPlayer.reports.length}
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
                  {
                  attributesTypes.map((attributeType) => (
                    <li key={attributeType}>
                      <AttributeType
                        isActive={selectedAttributeType === attributeType}
                        onClick={() => setSelectedAttributeType(attributeType)}
                      >
                        {handleAttributesTypesName(attributeType)}
                      </AttributeType>
                    </li>
                  ))
                }
                </ul>
              </MenuTable>
              <Radar
                data={{
                  labels: handleChartLabels(firstPlayer.attributes[selectedAttributeType])[0],
                  datasets: [
                    {
                      borderWidth: 2,
                      data: handleChartLabels(firstPlayer.attributes[selectedAttributeType])[1],
                      pointBackgroundColor: theme.colors.blue,
                      backgroundColor: rgba(theme.colors.blue, 0.25),
                      borderColor: theme.colors.blue,
                      label: firstPlayer.name,
                    },
                    {
                      borderWidth: 2,
                      data: handleChartLabels(secondPlayer.attributes[selectedAttributeType])[1],
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
        </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Comparison;
