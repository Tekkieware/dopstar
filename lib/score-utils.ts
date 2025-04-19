/**
 * Calculate score based on time taken and attempts used
 *
 * @param timeTaken Time taken in seconds
 * @param attemptsUsed Number of attempts used (out of 3)
 * @returns Score for the stage
 */
export function calculateScore(timeTaken: number, attemptsUsed: number): number {
  // Base score for completing a stage
  const baseScore = 400

  // Time penalty: 2 points per second, max 150 points
  const timePenalty = Math.min(150, timeTaken * 2)

  // Attempt penalty: 50 points per attempt used
  const attemptPenalty = attemptsUsed * 50

  // Calculate final score (minimum 200 points)
  return Math.max(200, baseScore - timePenalty - attemptPenalty)
}
