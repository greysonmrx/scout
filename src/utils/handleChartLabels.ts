export const labels = {
  technical_attributes: {
    heading: 'Cabeceamento',
    corners: 'Cantos',
    crossing: 'Cruzamentos',
    tackling: 'Desarme',
    finishing: 'Finalização',
    dribbling: 'Finta',
    long_throws: 'Lançamentos Longos',
    free_kick_taking: 'Livres',
    marking: 'Marcação',
    penalty_taking: 'Marcação de Penálti',
    passing: 'Passe',
    first_touch: 'Primeiro Toque',
    long_shots: 'Remates de Longe',
    technique: 'Técnica',
  },
  mental_attributes: {
    aggression: 'Agressividade',
    anticipation: 'Antecipação',
    bravery: 'Bravura',
    composure: 'Compostura',
    concentration: 'Concentração',
    decisions: 'Decições',
    determination: 'Determinação',
    flair: 'Imprevisibilidade',
    leadership: 'Liderança',
    off_the_ball: 'Sem Bola',
    positioning: 'Posicionamento',
    teamwork: 'Trabalho de Equipe',
    vision: 'Visão de Jogo',
    work_rate: 'Índice de Trabalho',
  },
  physical_attributes: {
    acceleration: 'Aceleração',
    agillity: 'Agilidade',
    natural_fitness: 'Aptidão Física',
    balance: 'Equilíbrio',
    strength: 'Força',
    jumping_reach: 'Impulsão',
    pace: 'Resistência',
    stamina: 'Velocidade',
  },
};

function handleChartLabels(
  chart_data: Record<string, number>,
  chart_labels: Record<string, string>,
): string[] {
  return Object.keys(chart_data).map((key) => chart_labels[key]);
}

export default handleChartLabels;
