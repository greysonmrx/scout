type Labels = {
  [label: string]: string;
}

export const labels: Labels = {
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
  acceleration: 'Aceleração',
  velocity: 'Velocidade',
  agillity: 'Agilidade',
  body_of_game: 'Jogo de corpo',
  strength: 'Força física',
  pace: 'Resistência',
  happiness: 'Felicidade',
  sadness: 'Tristeza',
  fear: 'Medo',
  surprise: 'Surpresa',
  anger: 'Raiva',
  disgust: 'Nojo',
};

function handleChartLabels(
  chart_data: Record<string, number>,
): [string[], number[]] {
  const chartLabels: string[] = [];
  const chartData: number[] = [];

  Object.keys(chart_data).forEach((key) => {
    chartLabels.push(labels[key]);
    chartData.push(chart_data[key]);
  });

  return [chartLabels, chartData];
}

export default handleChartLabels;
