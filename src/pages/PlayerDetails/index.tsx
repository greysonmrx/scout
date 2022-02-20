import React, { useState, useCallback, useEffect } from 'react';
import Rating from 'react-rating';
import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Radar from '../../components/Radar';
import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';
import Collapse from '../../components/Collapse';

import { useToast } from '../../hooks/toast';

import handleChartLabels, { labels } from '../../utils/handleChartLabels';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import handleFormattedAttributes, {
  AttributesTypes,
} from '../../utils/handleFormattedAttributes';
import handleBirthDate from '../../utils/handleBirthDate';

import api from '../../services/api';

import noImage from '../../assets/images/no-image.png';

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
  Reports,
} from './styles';
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
  link?: string;
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
    id: number;
    name: string;
    type: string;
    value: number;
  }[];
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

const PlayerDetails: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const { params } = useRouteMatch() as any;

  const { addToast } = useToast();

  const [selectedAttributeType, setSelectedAttributeType] =
    useState<string>('attribute');
  const [player, setPlayer] = useState<Player | undefined>();
  const [attributes, setAttributes] = useState<AttributesTypes>({});

  async function fetchPlayerDetails() {
    try {
      const playerResponse = await api.get<Player>(`players/${params.id}`);

      const [, formattedAttributes] = handleFormattedAttributes(
        playerResponse.data.attributes,
      );

      setAttributes(formattedAttributes);

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
  }, [history]);

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
        {!player ? (
          <p>Carregando</p>
        ) : (
          <>
            <Informations>
              <TopInformations>
                <div>
                  <Avatar>
                    {player.club.shield && (
                      <img
                        src={player.club.shield}
                        alt={player.club.name}
                        className="club-shield"
                      />
                    )}
                    <img
                      src={player.avatar ? player.avatar : noImage}
                      alt={player.name}
                      className="player-avatar"
                    />
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
                        <span>{player.height} cm</span>
                      </li>
                      <li>
                        <strong>Peso</strong>
                        <span>{player.weight} kg</span>
                      </li>
                    </AttributesList>
                  </div>
                </div>
                <div>
                  <h3>Mapa de calor</h3>
                  <img
                    src={player.heat_map ? player.heat_map : noImage}
                    alt="Mapa de calor"
                  />
                </div>
              </TopInformations>
              {player.link && (
                <Observations style={{ marginBottom: 20 }}>
                  <h3>Link</h3>
                  <a href={player.link} target="_blank">{player.link}</a>
                </Observations>
              )}
              <Observations>
                <h3>Informações</h3>
                <p>{player.note}</p>
              </Observations>
            </Informations>
            <Attributes>
              <h1>Dados Gerais</h1>
              <MenuTable>
                <ul>
                  <li>
                    <AttributeType
                      isActive={selectedAttributeType === 'attribute'}
                      onClick={() => setSelectedAttributeType('attribute')}
                    >
                      Atributos
                    </AttributeType>
                  </li>
                  <li>
                    <AttributeType
                      isActive={selectedAttributeType === 'characteristics'}
                      onClick={() =>
                        setSelectedAttributeType('characteristics')
                      }
                    >
                      Características
                    </AttributeType>
                  </li>
                </ul>
              </MenuTable>
              <Informations>
                <AttributesList style={{ width: 500 }}>
                  {selectedAttributeType === 'attribute'
                    ? Object.keys(attributes.technical_attributes).map(
                        (attribute) => (
                          <li
                            key={attribute}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <strong style={{ width: 'auto' }}>
                              {labels[attribute] || attribute}
                            </strong>
                            <Rating
                              fractions={2}
                              emptySymbol={
                                <FaRegStar
                                  size={30}
                                  color={theme.colors.yellow}
                                />
                              }
                              fullSymbol={
                                <FaStar size={30} color={theme.colors.yellow} />
                              }
                              initialRating={
                                attributes.technical_attributes[attribute]
                              }
                              stop={3}
                              readonly={true}
                            />
                          </li>
                        ),
                      )
                    : Object.keys(attributes.characteristics).map(
                        (attribute) => (
                          <li
                            key={attribute}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <strong style={{ width: 'auto' }}>
                              {labels[attribute] || attribute}
                            </strong>
                            {attributes.characteristics[attribute] ? (
                              <FaCheck size={30} color={theme.colors.green} />
                            ) : (
                              <FaTimes
                                size={30}
                                color={theme.colors.red.enemy}
                              />
                            )}
                          </li>
                        ),
                      )}
                </AttributesList>
              </Informations>
            </Attributes>
            <Reports>
              {player.reports.length > 0 && <h1>Relatórios</h1>}
              {player.reports.map((report) => (
                <Collapse key={report.id} data={report} />
              ))}
            </Reports>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default PlayerDetails;
