import ClearIcon from "@mui/icons-material/Clear"
import DoneIcon from "@mui/icons-material/Done"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { CircularProgress, IconButton, TextField } from "@mui/material"
import type { Identifier, XYCoord } from "dnd-core"
import React, { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

import type { Command as CommandType } from "../../types"
import * as S from "./styled"

interface DragItem {
  index: number
  id: string
  type: string
}

interface Props {
  index: number
  command: CommandType
  isOn: boolean
  isRunning: boolean
  isComplete: boolean
  onShowElement: (selector: string, text: string) => void
  onCommandUpdate: (id: string, field: string, value: string) => void
  onCommandRemove: (id: string) => void
  onCommandMove: (from: number, to: number) => void
  onCommandRun: (index: number) => void
}

export const Command: React.FC<Props> = ({
  index,
  command,
  isOn,
  isRunning,
  isComplete,
  onShowElement,
  onCommandUpdate,
  onCommandRemove,
  onCommandMove,
  onCommandRun
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      onCommandMove(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: command.id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <S.CommandWrapper
      data-testid="command"
      key={command.id}
      style={{ opacity }}
      ref={ref}
      data-handler-id={handlerId}>
      <S.StatusWrapper>
        {isRunning && (
          <CircularProgress size={20} data-testid="command-running-status" />
        )}
        {isComplete && (
          <DoneIcon
            color="success"
            data-testid="command-complete-status"
            sx={{ fontSize: 20 }}
          />
        )}
        {!isOn && (
          <IconButton
            onClick={() => onShowElement(command.selector, command.text)}
            size="small"
            data-testid="show-command">
            <VisibilityIcon />
          </IconButton>
        )}
        {!isOn && (
          <IconButton
            size="small"
            onClick={() => onCommandRun(index)}
            data-testid="run-command">
            <PlayArrowIcon />
          </IconButton>
        )}
      </S.StatusWrapper>
      <S.ValuesWrapper>
        <S.FirstRowValues>
          <TextField
            label="команда"
            name="name"
            onChange={(evt) =>
              onCommandUpdate(command.id, "name", evt.target.value)
            }
            value={command.name}
            size="small"
            disabled={isOn}
          />
          <TextField
            label="селектор"
            name="selector"
            onChange={(evt) =>
              onCommandUpdate(command.id, "selector", evt.target.value)
            }
            value={command.selector}
            size="small"
            disabled={isOn}
          />
        </S.FirstRowValues>
        <TextField
          label="текст"
          name="text"
          onChange={(evt) =>
            onCommandUpdate(command.id, "text", evt.target.value)
          }
          value={command.text}
          size="small"
          multiline
          maxRows={2}
          disabled={isOn}
        />
      </S.ValuesWrapper>
      <IconButton
        data-testid="delete-command"
        onClick={() => onCommandRemove(command.id)}
        disabled={isOn}
        style={{ visibility: isOn ? "hidden" : "visible" }}
        size="small">
        <ClearIcon />
      </IconButton>
    </S.CommandWrapper>
  )
}
