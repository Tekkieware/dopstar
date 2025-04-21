import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

interface SortableItemProps {
  id: string
  index: number
  moveItemUp: (index: number) => void
  moveItemDown: (index: number) => void
  itemsLength: number
}

export default function SortableItem({ id, index, moveItemUp, moveItemDown, itemsLength }: SortableItemProps) {
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