import React, { useCallback } from 'react';
import { useTheme } from 'styled-components';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import { Container } from './styles';

interface RatingProps {
  value: number;
  size: number;
  margin: number;
}

const Rating: React.FC<RatingProps> = ({ margin, size, value }) => {
  const theme = useTheme();

  const handleRenderStar = useCallback((ratingValue: number): React.ReactNode[] => {
    const currentValue = ratingValue / 2;

    return Array(5).fill('').map((_, index) => {
      const starProps = {
        color: theme.colors.yellow,
        size,
      };

      if (currentValue - index >= 1) {
        return (
          <FaStar key={String(index)} {...starProps} />
        );
      }

      if (currentValue - index >= 0.5) {
        return (
          <FaStarHalfAlt key={String(index)} {...starProps} />
        );
      }

      return (
        <FaRegStar key={String(index)} {...starProps} />
      );
    });
  }, [size, theme]);

  return (
    <Container
      margin={margin}
      size={size}
    >
      {handleRenderStar(value)}
    </Container>
  );
};

export default Rating;
