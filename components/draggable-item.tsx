"use client"

import { Draggable } from "react-beautiful-dnd"

interface DraggableItemProps {
  item: string
  index: number
}

export default function DraggableItem({ item, index }: DraggableItemProps) {
  return (
    <Draggable key={item} draggableId={item} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 rounded-md font-mono text-sm ${
            snapshot.isDragging ? "bg-blue-100 dark:bg-blue-900 shadow-lg" : "bg-gray-100 dark:bg-gray-700"
          } border border-gray-300 dark:border-gray-600 cursor-grab active:cursor-grabbing`}
        >
          {item}
        </div>
      )}
    </Draggable>
  )
}
