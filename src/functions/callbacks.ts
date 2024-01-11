import { type DragCallbacksInterface } from '@app/types-interfaces'

export function onDrag(dragStartX: number, dragStartY: number, dragEndX: number, dragEndY: number, dragCallbacks: DragCallbacksInterface, minLength: number, deviationTolerance: number) {
  const xDragValue = dragStartX - dragEndX
  const yDragValue = dragStartY - dragEndY

  const up = yDragValue >= minLength && Math.abs(xDragValue) <= deviationTolerance
  const right = xDragValue * -1 >= minLength && Math.abs(yDragValue) <= deviationTolerance
  const down = yDragValue * -1 >= minLength && Math.abs(xDragValue) <= deviationTolerance
  const left = xDragValue >= minLength && Math.abs(yDragValue) <= deviationTolerance

  // Up
  if (dragCallbacks.onUpDrag !== null && up)
    dragCallbacks.onUpDrag()

  // Right
  if (dragCallbacks.onRightDrag !== null && right)
    dragCallbacks.onRightDrag()

  // Down
  if (dragCallbacks.onDownDrag !== null && down)
    dragCallbacks.onDownDrag()

  // Left
  if (dragCallbacks.onLeftDrag !== null && left)
    dragCallbacks.onLeftDrag()
}
