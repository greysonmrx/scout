export const labels = {
  technical_attributes: {
    heading: 'Jogo aéreo',
    crossing: 'Cruzamentos',
    tackling: 'Desarme',
    finishing: 'Finalização',
    dribbling: 'Finta',
    long_throws: 'Lançamentos',
    free_kick_taking: 'Bola parada',
    marking: 'Marcação',
    passing: 'Passe',
    technique: 'Técnica',
  },
  mental_attributes: {
    effort: 'Empenho',
    anticipation: 'Antecipação',
    intelligence: 'Inteligência',
    concentration: 'Concentração',
    determination: 'Determinação',
    flair: 'Imprevisibilidade',
    teamwork: 'Trab. em equipe',
    leadership: 'Liderança',
    positioning: 'Posicionamento',
    off_the_ball: 'Sem Bola',
    vision: 'Visão de jogo',
  },
  physical_attributes: {
    acceleration: 'Aceleração',
    velocity: 'Velocidade',
    agillity: 'Agilidade',
    body_of_game: 'Jogo de corpo',
    strength: 'Força física',
    pace: 'Resistência',
  },
};

function handleChartLabels(
  chart_data: Record<string, number>,
  chart_labels: Record<string, string>,
): string[] {
  return Object.keys(chart_data).map((key) => chart_labels[key]);
}

export default handleChartLabels;
