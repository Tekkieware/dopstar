/**
 * Calculate score based on time taken and attempts used
 *
 * @param timeTaken Time taken in seconds
 * @param attemptsUsed Number of attempts used (out of 3)
 * @returns Score for the stage
 */
export function calculateScore(timeTaken: number, attemptsUsed: number): number {
  const baseScore = 400
  const timePenalty = Math.min(150, timeTaken * 2)
  const attemptPenalty = attemptsUsed * 50
  return Math.max(200, baseScore - timePenalty - attemptPenalty)
}
