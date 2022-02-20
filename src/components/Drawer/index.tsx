import React, { useCallback, useEffect, useState } from 'react';

import { RiCloseLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { IconButton } from '@mui/material';

import Input from '../Input';
import Select from '../../components/Select';

import handleAttributesTypesName from '../../utils/handleAttributesTypesName';
import positionAttributes from '../../utils/positionAttributes';
import handleSlugWord from '../../utils/handleSlugWord';
import { labels } from '../../utils/handleChartLabels';

import {
  Backdrop,
  Container,
  Filter,
  Header,
  Main,
  Slider,
  Footer,
} from './styles';

function handleAgeSliderLabel(value: number) {
  return `${value} anos`;
}

function handleRecommendationSliderLabel(value: number) {
  return `${value}%`;
}

type DrawerProps = {
  startDate: number;
  endDate: number;
  recommendation: number;
  visible: boolean;
  position: { value: number; label: string };
  positionList: Array<{ value: number; label: string }>;
  attributeList: Array<{
    name: string;
    type: string;
    minValue: number;
    maxValue: number;
  }>;
  handleAddAttribute(): void;
  handleAgeChange(startDate: number, endDate: number): void;
  handlePositionChange(position: { value: number; label: string }): void;
  handleRecommendationChange(recommendation: number): void;
  handleChangeAttribute(
    index: number,
    field: string,
    value: string | number,
  ): void;
  handleRemoveAttribute(index: number): void;
  onSubmit(): void;
  onClear(): void;
};

const Drawer: React.FC<DrawerProps> = ({
  startDate,
  endDate,
  position,
  positionList,
  recommendation,
  attributeList,
  visible,
  handleAddAttribute,
  handleAgeChange,
  handlePositionChange,
  handleRecommendationChange,
  handleChangeAttribute,
  handleRemoveAttribute,
  onSubmit,
  onClear,
}) => {
  const theme = useTheme();

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setIsHidden(!visible);
      }, 200);
    } else {
      setIsHidden(!visible);
    }
  }, [visible]);

  return (
    <Backdrop visible={visible} isHidden={isHidden}>
      <Container visible={visible}>
        <Header>
          <h3>Filtrar</h3>
          <button type="button" onClick={() => {}}>
            <RiCloseLine size={26} color={theme.colors.red.error} />
          </button>
        </Header>
        <Main>
          <Filter>
            <label htmlFor="age">Idade</label>
            <Slider
              id="age"
              getAriaLabel={() => 'Idade'}
              value={[startDate, endDate]}
              onChange={(_, value) => {
                if (typeof value === 'object') {
                  handleAgeChange(value[0], value[1]);
                }
              }}
              valueLabelDisplay="auto"
              disableSwap={true}
              valueLabelFormat={handleAgeSliderLabel}
              style={{
                color: theme.colors.blue,
              }}
              min={5}
              max={50}
            />
          </Filter>
          <Filter>
            <label htmlFor="recommendation">Recomendação</label>
            <Slider
              id="recommendation"
              getAriaLabel={() => 'Recomendação'}
              value={recommendation}
              onChange={(_, value) => {
                if (typeof value === 'number') {
                  handleRecommendationChange(value);
                }
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={handleRecommendationSliderLabel}
              style={{
                color: theme.colors.blue,
              }}
              min={0}
              max={100}
            />
          </Filter>
          <Filter>
            <Select
              name="position_id"
              label="Posição"
              defaultValue={position}
              onChange={({ value, label }) =>
                handlePositionChange({ value, label })
              }
              placeholder="Selecione uma posição"
              options={[
                {
                  value: 0,
                  label: 'Selecione uma posição',
                },
                ...positionList,
              ]}
            />
          </Filter>
          {!!position.value && (
            <Filter>
              <div className="top">
                <span>Atributos</span>
                <button type="button" onClick={handleAddAttribute}>
                  Novo atributo
                </button>
              </div>
              {attributeList.map((attribute, attributeIndex) => (
                <div className="attribute" key={attributeIndex}>
                  <label htmlFor="attribute_type">Tipo do atributo</label>
                  <Select
                    name="attribute_type"
                    onChange={({ value }) =>
                      handleChangeAttribute(attributeIndex, 'type', value)
                    }
                    label=""
                    placeholder="Tipo"
                    options={Object.keys(
                      positionAttributes[handleSlugWord(position.label)],
                    ).map((type) => ({
                      value: type,
                      label: handleAttributesTypesName(type),
                    }))}
                  />
                  <label
                    htmlFor="attribute_name"
                    style={{
                      marginTop: 12,
                    }}
                  >
                    Nome do atributo
                  </label>
                  <Select
                    name="attribute_name"
                    onChange={({ value }) =>
                      handleChangeAttribute(attributeIndex, 'name', value)
                    }
                    placeholder="Nome"
                    label=""
                    isDisabled={!attribute.type}
                    options={
                      attribute.type
                        ? positionAttributes[handleSlugWord(position.label)][
                            attribute.type
                          ].map((name) => ({
                            value: name,
                            label: labels[name],
                          }))
                        : []
                    }
                  />
                  <label
                    htmlFor="attribute_value"
                    style={{
                      marginTop: 12,
                    }}
                  >
                    Valores do atributo
                  </label>
                  <Slider
                    getAriaLabel={() => 'Valor do atributo'}
                    value={[attribute.minValue, attribute.maxValue]}
                    onChange={(_, value) => {
                      if (typeof value === 'object') {
                        handleChangeAttribute(
                          attributeIndex,
                          'minValue',
                          value[0],
                        );
                        handleChangeAttribute(
                          attributeIndex,
                          'maxValue',
                          value[1],
                        );
                      }
                    }}
                    valueLabelDisplay="auto"
                    disableSwap={true}
                    style={{
                      color: theme.colors.blue,
                    }}
                    min={0}
                    max={6}
                  />
                  <IconButton
                    color="inherit"
                    style={{
                      width: '100%',
                      height: 46,
                      borderRadius: 5,
                      backgroundColor: 'rgba(246, 68, 68, 0.1)',
                      marginTop: 8,
                    }}
                    onClick={() => handleRemoveAttribute(attributeIndex)}
                  >
                    <div>
                      <span
                        style={{ color: '#F64444', fontSize: '25px' }}
                        className="material-icons-outlined"
                      >
                        delete
                      </span>
                    </div>
                  </IconButton>
                </div>
              ))}
            </Filter>
          )}
        </Main>
        <Footer>
          <button type="button" className="text" onClick={onClear}>
            Limpar filtros
          </button>
          <button type="button" className="filled" onClick={onSubmit}>
            Filtrar
          </button>
        </Footer>
      </Container>
    </Backdrop>
  );
};

export default Drawer;
