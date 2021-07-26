import handleSlugWord from './handleSlugWord';

export type PositionAttributes = {
  [position: string]: {
    [attributeType: string]: string[];
  };
};

export default {
  [handleSlugWord('Zagueiro')]: {
    technical_attributes: [
      'heading',
      'crossing',
      'tackling',
      'finishing',
      'dribbling',
      'long_throws',
      'free_kick_taking',
      'marking',
      'passing',
      'technique',
    ],
    mental_attributes: [
      'effort',
      'anticipation',
      'intelligence',
      'concentration',
      'determination',
      'flair',
      'teamwork',
      'leadership',
      'positioning',
      'off_the_ball',
      'vision',
    ],
    physical_attributes: [
      'acceleration',
      'velocity',
      'agillity',
      'body_of_game',
      'strength',
      'pace',
    ],
  },
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
    mental_attributes: [
      'effort',
      'anticipation',
      'intelligence',
      'concentration',
      'determination',
      'flair',
    ],
  },
  [handleSlugWord('Atacante')]: {
    technical_attributes: [
      'heading',
      'crossing',
      'tackling',
      'finishing',
      'dribbling',
      'long_throws',
      'free_kick_taking',
      'marking',
      'passing',
      'technique',
    ],
    mental_attributes: [
      'effort',
      'anticipation',
      'intelligence',
      'concentration',
      'determination',
      'flair',
      'teamwork',
      'leadership',
      'positioning',
      'off_the_ball',
      'vision',
    ],
    physical_attributes: [
      'acceleration',
      'velocity',
      'agillity',
      'body_of_game',
      'strength',
      'pace',
    ],
    emotional_attributes: [
      'happiness',
      'sadness',
      'fear',
      'surprise',
      'anger',
      'disgust',
    ],
  },
} as PositionAttributes;
