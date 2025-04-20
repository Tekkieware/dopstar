// lib/useSpaceStore.ts
import { create } from 'zustand'
import { dopStarState } from '../types';








export const useDopStarStore = create<dopStarState>((set, get) => ({
  leaderboard: [],
  isLoadingLeaderboard: false,
  fetchLeaderboard: async () => {
    set({ isLoadingLeaderboard: true })
    try {
      const res = await fetch('/api/leaderboard')
      const data = await res.json()
      set({ leaderboard: data })
    } catch (error) {
      console.error('Failed to fetch leaderboard', error)
    } finally {
      set({ isLoadingLeaderboard: false })
    }
  }
}))
