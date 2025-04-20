export interface Stage {
    type: string;
    description: string;
    lines: string[];
    solution: string[];
  };
  

export interface playerData{
  name: string ,
  score: number,
  time: string;
  _id?: string,
  createdAt?: string
}


export type dopStarState = {
  leaderboard: playerData[];
  isLoadingLeaderboard: boolean;
  fetchLeaderboard: ()=> Promise<void>;
};