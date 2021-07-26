import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Rating from '../Rating';
import SideNote, { SideNoteType } from '../SideNote';

import noImage from '../../assets/images/no-image.png';

import handleFormatedDate from '../../utils/handleFormatedDate';

import {
  Container, RecommendationField, Arrow, SideNoteContent,
} from './styles';

type CollapseData = {
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
}

interface CollapseProps {
  data: CollapseData;
}

const Collapse: React.FC<CollapseProps> = ({ data }) => {
  const {
    owner,
    pros,
    cons,
    created_at,
    recommendation_percentage,
    note, recommendation_note,
    current_capacity,
    potential_capacity,
  } = data;

  const theme = useTheme();
  const mainRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);
  const [collapseHeight, setCollapseHeight] = useState(77);

  function handleCollapseHeight(): void {
    if (isOpened && mainRef.current?.offsetHeight) {
      setCollapseHeight(mainRef.current.offsetHeight + 77);
    } else {
      setCollapseHeight(77);
    }
  }

  const handlePercentageColors = useCallback((percentage: number) => {
    if (percentage > 66) {
      return theme.colors.green;
    }

    if (percentage > 33) {
      return theme.colors.orange;
    }

    return theme.colors.red.error;
  }, []);

  const handleSideNoteType = useCallback((percentage: number): SideNoteType => {
    if (percentage > 66) {
      return SideNoteType.EXCELLENT;
    }

    if (percentage > 33) {
      return SideNoteType.GOOD;
    }

    return SideNoteType.BAD;
  }, []);

  const handleToggleCollapse = useCallback(() => {
    setIsOpened((oldState) => !oldState);
  }, []);

  useEffect(() => {
    handleCollapseHeight();
  }, [isOpened]);

  useEffect(() => {
    window.addEventListener('resize', handleCollapseHeight);
  });

  return (
    <Container
      height={collapseHeight}
    >
      <header>
        <div className="profile">
          <img
            src={owner?.avatar ? owner.avatar : noImage}
            alt={owner.name}
          />
          <Link to="/">
            Feito por
            {' '}
            <strong>{owner.name}</strong>
            {' '}
            em
            {' '}
            <strong>{handleFormatedDate(created_at)}</strong>
          </Link>
        </div>
        <div className="right-side">
          <p>Recomendação</p>
          <RecommendationField
            color={handlePercentageColors(recommendation_percentage)}
          >
            <span>{`${recommendation_percentage}%`}</span>
          </RecommendationField>
          <button type="button" onClick={handleToggleCollapse}>
            <Arrow
              size={24}
              color={theme.colors.black}
              opened={isOpened ? 'true' : ''}
            />
          </button>
        </div>
      </header>
      <main ref={mainRef}>
        <div className="note">
          <h3>Observações</h3>
          <p>{note}</p>
        </div>
        <SideNote
          type={handleSideNoteType(recommendation_percentage)}
          note={recommendation_note}
        >
          <SideNoteContent>
            <div>
              <strong>
                Capacidade atual:
              </strong>
              <Rating
                margin={3}
                size={20}
                value={current_capacity}
              />
            </div>
            <div>
              <strong>
                Capacidade potencial:
              </strong>
              <Rating
                margin={3}
                size={20}
                value={potential_capacity}
              />
            </div>
          </SideNoteContent>
        </SideNote>
        <div className="pros-cons-container">
          <div className="pros">
            <h5>Prós</h5>
            <ul>
              {
                pros.length > 0
                  ? pros.map((pro) => (
                    <li key={pro}>{pro}</li>
                  ))
                  : <p>Este jogador não possui prós.</p>
              }
            </ul>
          </div>
          <div className="cons">
            <h5>Contras</h5>
            <ul>
              {
                cons.length > 0
                  ? cons.map((con) => (
                    <li key={con}>{con}</li>
                  ))
                  : <p>Este jogador não possui contras.</p>
              }
            </ul>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Collapse;
