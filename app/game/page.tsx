"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GameStage from "@/components/game-stage"
import TrialCounter from "@/components/trial-counter"
import LevelCompleteToast from "@/components/level-complete-toast"
import ErrorToast from "@/components/error-toast"
import { stages } from "@/lib/game-data"
import NameEntryModal from "@/components/name-entry-modal"
import GameOverModal from "@/components/game-over-modal"
import ScoreDisplay from "@/components/score-display"
import ThemeToggle from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { calculateScore } from "@/lib/score-utils"
import Link from "next/link"
import { ArrowRight, Trophy, GripVertical, Home } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDopStarStore } from "@/lib/store/useDopStarStore"
import { playerData } from "@/lib/types"
import { HighScore } from "@/lib/utils"

interface StagePerformance {
  stageNumber: number
  time?: number
  attempts: number
  completed: boolean
}

interface SortableItemProps {
  id: string
  index: number
  moveItemUp: (index: number) => void
  moveItemDown: (index: number) => void
  itemsLength: number
}

function SortableItem({ id, index, moveItemUp, moveItemDown, itemsLength }: SortableItemProps) {
  const itemId = `${id}-${index}`
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: itemId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 rounded-md font-mono text-sm flex items-center justify-between 
        ${isDragging ? "bg-blue-100 dark:bg-blue-900 shadow-lg" : "bg-gray-100 dark:bg-gray-700"} 
        border border-gray-300 dark:border-gray-600`}
    >
      <pre className="flex-grow">{id}</pre>
      <div className="flex items-center">
        <div className="flex items-center space-x-1 mr-2">
          <button
            onClick={() => moveItemUp(index)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Move up"
            disabled={index === 0}
          >
            ↑
          </button>
          <button
            onClick={() => moveItemDown(index)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Move down"
            disabled={index === itemsLength - 1}
          >
            ↓
          </button>
        </div>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <GripVertical size={18} />
        </div>
      </div>
    </div>
  )
}

export default function GamePage() {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(0)
  const [items, setItems] = useState<string[]>([])
  const [trials, setTrials] = useState(3)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [gameTime, setGameTime] = useState(0)
  const [timerRunning, setTimerRunning] = useState(true)
  const [stageStartTime, setStageStartTime] = useState(0)
  const [stageCompletionTimes, setStageCompletionTimes] = useState<number[]>([])
  const [stageAttempts, setStageAttempts] = useState<number[]>([])
  const [stageCompletionStatus, setStageCompletionStatus] = useState<boolean[]>([])
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [madeLeaderboard, setMadeLeaderboard] = useState(false)

  const { leaderboard, fetchLeaderboard, isLoadingLeaderboard } = useDopStarStore()

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    if (currentStage === 0) {
      fetchLeaderboard()
    }
    if (currentStage < stages.length) {
      // Shuffle the items for the current stage
      setItems([...stages[currentStage].lines].sort(() => Math.random() - 0.5))
      setTrials(3)
      setShowSuccessToast(false)
      setShowErrorToast(false)
      setStageStartTime(gameTime)

      // Initialize attempts for this stage if not already set
      if (!stageAttempts[currentStage]) {
        const newAttempts = [...stageAttempts]
        newAttempts[currentStage] = 0
        setStageAttempts(newAttempts)
      }
    }
  }, [currentStage])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timerRunning) {
      timer = setInterval(() => {
        setGameTime((prev) => {
          const newTime = prev + 1
          // Update current stage score based on time
          const currentStageTime = newTime - stageStartTime
          const currentScore = calculateScore(currentStageTime, 3 - trials)
          setScore(currentScore)
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [timerRunning, stageStartTime, trials])

  // Auto-hide toasts after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showSuccessToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false)
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [showSuccessToast])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showErrorToast) {
      timer = setTimeout(() => {
        setShowErrorToast(false)
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [showErrorToast])

  // Move an item up in the list
  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newItems = [...items]
      const temp = newItems[index]
      newItems[index] = newItems[index - 1]
      newItems[index - 1] = temp
      setItems(newItems)
    }
  }

  // Move an item down in the list
  const moveItemDown = (index: number) => {
    if (index < items.length - 1) {
      const newItems = [...items]
      const temp = newItems[index]
      newItems[index] = newItems[index + 1]
      newItems[index + 1] = temp
      setItems(newItems)
    }
  }

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const activeIdParts = active.id.toString().split("-")
        const overIdParts = over.id.toString().split("-")
        const oldIndex = Number.parseInt(activeIdParts[activeIdParts.length - 1])
        const newIndex = Number.parseInt(overIdParts[overIdParts.length - 1])

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }


  const checkAnswer = () => {
    // Update attempts for this stage
    const newAttempts = [...stageAttempts]
    newAttempts[currentStage] = (newAttempts[currentStage] || 0) + 1
    setStageAttempts(newAttempts)

    const currentSolution = stages[currentStage].solution
    const isCorrect = currentSolution.every((line, index) => items[index] === line)

    if (isCorrect) {
      // Calculate stage completion time
      const stageTime = gameTime - stageStartTime

      // Update stage completion times
      const newCompletionTimes = [...stageCompletionTimes]
      newCompletionTimes[currentStage] = stageTime
      setStageCompletionTimes(newCompletionTimes)

      // Update stage completion status
      const newCompletionStatus = [...stageCompletionStatus]
      newCompletionStatus[currentStage] = true
      setStageCompletionStatus(newCompletionStatus)

      // Calculate score for this stage
      const stageScore = calculateScore(stageTime, 3 - trials)
      setScore(stageScore)

      // Update total score
      const newTotalScore = totalScore + stageScore
      setTotalScore(newTotalScore)

      // Show success toast
      setShowSuccessToast(true)

      // Check if this is the last stage
      if (currentStage === stages.length - 1) {
        setTimerRunning(false)

        // Check if score would make the leaderboard (compare with lowest score in mock data)
        setMadeLeaderboard(HighScore(newTotalScore,leaderboard))

        setShowModal(true)
      }
    } else {
      const newTrials = trials - 1
      setTrials(newTrials)

      if (newTrials <= 0) {
        // Update stage completion status for this stage as failed
        const newCompletionStatus = [...stageCompletionStatus]
        newCompletionStatus[currentStage] = false
        setStageCompletionStatus(newCompletionStatus)

        setTimerRunning(false)

        // Check if score would make the leaderboard
        setMadeLeaderboard(HighScore(totalScore,leaderboard))

        // Show game over modal
        setShowGameOverModal(true)
      } else {
        // Show error toast
        setErrorMessage("Oops! Something is misplaced. Try again!")
        setShowErrorToast(true)
      }
    }
  }

  const moveToNextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1)
    } else {
      // Game completed
      setTimerRunning(false)

      // Check if score would make the leaderboard
      setMadeLeaderboard(HighScore(totalScore,leaderboard))

      setShowModal(true)
    }
  }

  async function saveToLeaderBoard(entry: playerData) {
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      const updated = await res.json();
    } catch (err) {
      console.error('Failed to save leaderboard score:', err);
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  const handleNameSubmit = (name: string) => {
    // Store the player data in localStorage
    const playerData = {
      name: name || "Anonymous",
      score: totalScore,
      time: formatTime(gameTime)
    }

    saveToLeaderBoard(playerData).then(() => {
      setShowModal(false)
      setShowGameOverModal(false)
      router.push("/leaderboard")
    })
  }

  const resetGame = () => {
    setCurrentStage(0)
    setGameTime(0)
    setTimerRunning(true)
    setTotalScore(0)
    setStageCompletionTimes([])
    setStageAttempts([])
    setStageCompletionStatus([])
    setShowGameOverModal(false)
  }

  // Prepare stage performance data for the game over modal
  const getStagePerformance = (): StagePerformance[] => {
    return Array.from({ length: currentStage + 1 }, (_, i) => ({
      stageNumber: i + 1,
      time: stageCompletionTimes[i],
      attempts: stageAttempts[i] || 0,
      completed: stageCompletionStatus[i] || false,
    }))
  }

  if (currentStage >= stages.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-6">Game Completed!</h1>
          <p className="text-xl mb-2">Your time: {formatTime(gameTime)}</p>
          <p className="text-2xl font-bold mb-6">Final Score: {totalScore}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all"
            >
              Play Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/leaderboard")}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
            >
              <Trophy size={18} />
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toast notifications */}
      <LevelCompleteToast show={showSuccessToast} level={currentStage + 1} score={score} />

      <ErrorToast show={showErrorToast} message={errorMessage} />

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/leaderboard" className="flex items-center gap-2 text-primary hover:underline">
            <Trophy size={18} />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
        </div>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">
          Stage {currentStage + 1}: Arrange the {stages[currentStage].type}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Drag and drop or use the arrows to arrange the lines in the correct order
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <TrialCounter trials={trials} maxTrials={3} />
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">Time: {formatTime(gameTime)}</div>
          <ScoreDisplay score={score} totalScore={totalScore} />
        </div>
      </motion.div>

      <GameStage stageNumber={currentStage + 1} description={stages[currentStage].description} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-sm"
      >
        {/* Fixed height container with scrolling for long content */}
        <div className="max-h-[400px] overflow-y-auto pr-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item, index) => `${item}-${index}`)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <SortableItem
                    key={`${item}-${index}`}
                    id={item}
                    index={index}
                    moveItemUp={moveItemUp}
                    moveItemDown={moveItemDown}
                    itemsLength={items.length}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 flex justify-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          disabled={trials <= 0}
          className={`px-6 py-3 rounded-full text-white flex items-center gap-2 ${trials <= 0 ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-primary hover:bg-opacity-90"
            } transition-all`}
        >
          Check My Answer
        </motion.button>

        {stageCompletionStatus[currentStage] && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={moveToNextStage}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            Next Stage
            <ArrowRight size={18} />
          </motion.button>
        )}
      </motion.div>

      {showModal && (
        <NameEntryModal
          time={formatTime(gameTime)}
          score={totalScore}
          madeLeaderboard={madeLeaderboard}
          onSubmit={handleNameSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {showGameOverModal && (
        <GameOverModal
          time={formatTime(gameTime)}
          score={totalScore}
          stagePerformance={getStagePerformance()}
          madeLeaderboard={madeLeaderboard}
          onSubmit={handleNameSubmit}
          onClose={() => setShowGameOverModal(false)}
          onTryAgain={resetGame}
        />
      )}
    </div>
  )
}
