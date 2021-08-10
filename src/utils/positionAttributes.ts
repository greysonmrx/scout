import handleSlugWord from './handleSlugWord';

export type PositionAttributes = {
  [position: string]: {
    [attributeType: string]: string[];
  };
};

export default {
  [handleSlugWord('Goleiro')]: {
    technical_attributes: [
      'game_with_the_feet',
      'reposition_hands',
      'reposition_feet',
      'reflection',
      'positioning',
      'penalty',
      'goal_exit',
    ],
  },
  [handleSlugWord('Zagueiro')]: {
    technical_attributes: [
      'heading',
      'one_x_one_defensive',
      'roof',
      'recovery',
      'positioning',
      'passing',
      'ball_protection',
      'long_ball',
    ],
  },
  [handleSlugWord('Lateral direito')]: {
    technical_attributes: [
      'one_x_one_defensive',
      'one_x_one_ofensive',
      'passing',
      'crossing',
      'heading',
      'infiltration',
      'overtaking',
      'ball_protection',
      'diagonal',
      'conduction',
      'positioning',
      'depth',
    ],
  },
  [handleSlugWord('Lateral esquerdo')]: {
    technical_attributes: [
      'one_x_one_defensive',
      'one_x_one_ofensive',
      'passing',
      'crossing',
      'heading',
      'infiltration',
      'overtaking',
      'ball_protection',
      'diagonal',
      'conduction',
      'positioning',
      'depth',
    ],
  },
  [handleSlugWord('Volante')]: {
    technical_attributes: [
      'one_x_one_defensive',
      'heading',
      'passing',
      'long_ball',
      'one_x_one_ofensive',
      'conduction',
      'ball_protection',
      'defensive_positioning',
      'reception',
      'infiltration',
      'finishing',
    ],
  },
  [handleSlugWord('Meia')]: {
    technical_attributes: [
      'one_x_one_ofensive',
      'passing',
      'long_ball',
      'reception',
      'ball_protection',
      'conduction',
      'finishing',
      'infiltration',
      'one_x_one_defensive',
    ],
  },
  [handleSlugWord('Extremo')]: {
    technical_attributes: [
      'one_x_one_ofensive',
      'finishing',
      'depth',
      'conduction',
      'reception',
      'infiltration',
      'positioning',
      'defensive_action',
    ],
  },
  [handleSlugWord('Centrovante')]: {
    technical_attributes: [
      'finishing',
      'heading',
      'reception',
      'ball_protection',
      'one_x_one_ofensive',
      'conduction',
      'passing',
      'positioning',
    ],
  },
} as PositionAttributes;
