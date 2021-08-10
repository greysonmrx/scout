type Labels = {
  [label: string]: string;
}

export const labels: Labels = {
  game_with_the_feet: 'Jogo com os pés',
  reposition_hands: 'Reposição (mãos)',
  reposition_feet: 'Reposição (pés)',
  reflection: 'Reflexo',
  penalty: 'Pênaltis',
  goal_exit: 'Saída do gol',
  one_x_one_defensive: '1x1 defensivo',
  roof: 'Cobertura',
  recovery: 'Recuperação',
  long_ball: 'Bola longa',
  one_x_one_ofensive: '1x1 ofensivo',
  infiltration: 'Infiltração',
  overtaking: 'Ultrapassagem',
  ball_protection: 'Proteção de bola',
  diagonal: 'Diagonal',
  conduction: 'Condução',
  depth: 'Profundidade',
  defensive_positioning: 'Posicionamento defensivo',
  reception: 'Recepção',
  defensive_action: 'Ação defensiva',
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
  close_the_goal: 'Fecha o gol',
  fast: 'Rápido',
  speed_dribbler: 'Driblador em velocidade',
  opportunist: 'Oportunista',
  defend_with_the_foot: 'Defender com o pé',
  finisher: 'Finalizador',
  technical_dribbler: 'Driblador técnico',
  exit_at_intersections: 'Sai nos cruzamentos',
  shipowner: 'Armador',
  support_leg_actions: 'Ações com perna de apoio',
  air_threat: 'Ameaça aérea',
  careful_at_intersections: 'Cuidadoso nos cruzamentos',
  physically_strong: 'Forte fisicamente',
  long_side: 'Lateral longo',
  box_to_box: 'Box to box',
  elasticity: 'Elasticidade',
  ball_thief: 'Ladrão de bola',
  set_ball_specialist: 'Especialista em bola parada',
  attack_the_lines: 'Ataca as linhas',
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
