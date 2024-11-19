export interface TeamStats {
  name: string;
  over25: number;
  bts: number;
  ht: number;
}

export interface SavedPrediction {
  id: string;
  teams: string;
  over25Average: number;
  btsAverage: number;
  htAverage: number;
  recommendation: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  homeTeam: TeamStats;
  awayTeam: TeamStats;
}