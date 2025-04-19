import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps {
  id: string
}

export function SortableItem({ id }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded-md font-mono text-sm ${
        isDragging ? "bg-blue-100 dark:bg-blue-900 shadow-lg" : "bg-gray-100 dark:bg-gray-700"
      } border border-gray-300 dark:border-gray-600 cursor-grab active:cursor-grabbing`}
    >
      {id}
    </div>
  )
}
