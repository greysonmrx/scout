import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Radar from '../../components/Radar';
import MenuTable from '../../components/MenuTable';
import Button from '../../components/Button';
import Collapse from '../../components/Collapse';

import { useToast } from '../../hooks/toast';

import handleChartLabels from '../../utils/handleChartLabels';
import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import handleFormattedAttributes, { AttributesTypes } from '../../utils/handleFormattedAttributes';
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

  const [selectedAttributeType, setSelectedAttributeType] = useState<string>('');
  const [attributesTypes, setAttributesTypes] = useState<string[]>([]);
  const [player, setPlayer] = useState<Player | undefined>();
  const [attributes, setAttributes] = useState<AttributesTypes>({});

  async function fetchPlayerDetails() {
    try {
      const playerResponse = await api.get<Player>(`players/${params.id}`);

      const [attributesKeys, formattedAttributes] = handleFormattedAttributes(
        playerResponse.data.attributes,
      );

      setAttributesTypes(attributesKeys);
      setSelectedAttributeType(attributesKeys[0]);
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
        {
          !player ? (
            <p>Carregando</p>
          ) : (
            <>
              <Informations>
                <TopInformations>
                  <div>
                    <Avatar>
                      {
                        player.club.shield && (
                          <img
                            src={player.club.shield}
                            alt={player.club.name}
                            className="club-shield"
                          />
                        )
                      }
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
                    <img src={player.heat_map ? player.heat_map : noImage} alt="Mapa de calor" />
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
                    labels: handleChartLabels(attributes[selectedAttributeType])[0],
                    datasets: [
                      {
                        borderWidth: 2,
                        data: handleChartLabels(attributes[selectedAttributeType])[1],
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
              <Reports>
                {
                  player.reports.length > 0 && (
                    <h1>Relatórios</h1>
                  )
                }
                {
                  player.reports.map((report) => (
                    <Collapse
                      key={report.id}
                      data={report}
                    />
                  ))
                }
              </Reports>
            </>
          )
        }
      </Wrapper>
    </Container>
  );
};

export default PlayerDetails;
