import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import { rgba } from 'polished';

import MenuTable from '../../components/MenuTable';
import Radar from '../../components/Radar';
import AttributesList from '../../components/AttributesList';

import handleChartLabels, { labels } from '../../utils/handleChartLabels';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import handleFormattedAttributes, { AttributesTypes } from '../../utils/handleFormattedAttributes';
import handleBirthDate from '../../utils/handleBirthDate';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import noImage from '../../assets/images/no-image.png';

import {
  Container, Wrapper, Top, Avatar, Informations, Attributes, AttributeType,
} from './styles';
import Rating from 'react-rating';
import { FaCheck, FaRegStar, FaStar, FaTimes } from 'react-icons/fa';

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

  const [selectedAttributeType, setSelectedAttributeType] = useState<string>('attribute_chart');
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
              <h1>Dados Gerais</h1>
              <MenuTable>
                <ul>
                  <li>
                    <AttributeType
                      isActive={selectedAttributeType === 'attribute_table'}
                      onClick={() => setSelectedAttributeType('attribute_table')}
                    >
                      Atributos (Tabela)
                    </AttributeType>
                  </li>
                  <li>
                    <AttributeType
                      isActive={selectedAttributeType === 'characteristics'}
                      onClick={() => setSelectedAttributeType('characteristics')}
                    >
                      Características
                    </AttributeType>
                  </li>
                  <li>
                    <AttributeType
                      isActive={selectedAttributeType === 'attribute_chart'}
                      onClick={() => setSelectedAttributeType('attribute_chart')}
                    >
                      Atributos (Gráfico)
                    </AttributeType>
                  </li>
                </ul>
              </MenuTable>
              {
                selectedAttributeType === 'attribute_table' && (
                  <Informations>
                    <AttributesList style={{ width: 500 }}>
                      {
                          Object.keys(firstPlayer.attributes.technical_attributes).map(attribute => (
                            <li key={attribute} style={{ justifyContent: 'space-between' }}>
                              <Rating
                                fractions={2}
                                emptySymbol={<FaRegStar size={30} color={theme.colors.blue} />}
                                fullSymbol={<FaStar size={30} color={theme.colors.blue} />}
                                initialRating={firstPlayer.attributes.technical_attributes[attribute]}
                                stop={3}
                                readonly={true}
                              />
                              <strong style={{ width: 'auto', marginRight: 0 }}>{labels[attribute] || attribute}</strong>
                              <Rating
                                fractions={2}
                                emptySymbol={<FaRegStar size={30} color={theme.colors.red.enemy} />}
                                fullSymbol={<FaStar size={30} color={theme.colors.red.enemy} />}
                                initialRating={secondPlayer.attributes.technical_attributes[attribute]}
                                stop={3}
                                readonly={true}
                              />
                            </li>
                          ))
                      }
                    </AttributesList>
                  </Informations>
                )
              }
              {
                selectedAttributeType === 'characteristics' && (
                  <Informations>
                    <AttributesList style={{ width: 500 }}>
                      {
                        Object.keys(firstPlayer.attributes.characteristics).map(attribute => (
                          <li key={attribute} style={{ justifyContent: 'space-between' }}>
                            {
                              firstPlayer.attributes.characteristics[attribute] ? (
                                <FaCheck size={30} color={theme.colors.green} />
                              ) : (
                                <FaTimes size={30} color={theme.colors.red.enemy} />
                              )
                            }
                            <strong style={{ width: 'auto', marginRight: 0 }}>{labels[attribute] || attribute}</strong>
                            {
                              secondPlayer.attributes.characteristics[attribute] ? (
                                <FaCheck size={30} color={theme.colors.green} />
                              ) : (
                                <FaTimes size={30} color={theme.colors.red.enemy} />
                              )
                            }
                          </li>
                        ))
                      }
                    </AttributesList>
                  </Informations>
                )
              }
              {
                selectedAttributeType === 'attribute_chart' && (
                  <div style={{ display: 'block' }}>
                    <Radar
                      height={600}
                      width={600}
                      data={{
                        labels: handleChartLabels(firstPlayer.attributes.technical_attributes)[0],
                        datasets: [
                          {
                            borderWidth: 2,
                            data: handleChartLabels(firstPlayer.attributes.technical_attributes)[1],
                            pointBackgroundColor: theme.colors.blue,
                            backgroundColor: rgba(theme.colors.blue, 0.25),
                            borderColor: theme.colors.blue,
                            label: firstPlayer.name,
                          },
                          {
                            borderWidth: 2,
                            data: handleChartLabels(secondPlayer.attributes.technical_attributes)[1],
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
                )
              }
            </div>
          </Attributes>
        </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Comparison;
