import { playerData } from '@/lib/types';
import mongoose from 'mongoose';




const LeaderboardSchema = new mongoose.Schema<playerData>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  time: {type: String, required: true},
}, { timestamps: true });

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
