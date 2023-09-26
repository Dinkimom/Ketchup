import ClearIcon from "@mui/icons-material/Clear"
import DoneIcon from "@mui/icons-material/Done"
import VisibilityIcon from "@mui/icons-material/Visibility"
import {
  Badge,
  CircularProgress,
  IconButton,
  TextField,
  Typography
} from "@mui/material"
import React from "react"

import type { Command as CommandType } from "~features/Runner/types"

import * as S from "./styled"

interface Props {
  index: number
  command: CommandType
  isOn: boolean
  isRunning: boolean
  isComplete: boolean
  onShowElement: (selector: string, text: string) => void
  onCommandUpdate: (id: string, field: string, value: string) => void
  onCommandRemove: (id: string) => void
}

export const Command: React.FC<Props> = ({
  index,
  command,
  isOn,
  isRunning,
  isComplete,
  onShowElement,
  onCommandUpdate,
  onCommandRemove
}) => {
  return (
    <S.CommandWrapper key={command.id}>
      <S.StatusWrapper>
        {isRunning && <CircularProgress size={20} />}
        {isComplete && <DoneIcon color="success" sx={{ fontSize: 20 }} />}
        {!isOn && (
          <IconButton
            onClick={() => onShowElement(command.selector, command.text)}
            size="small">
            <VisibilityIcon />
          </IconButton>
        )}
      </S.StatusWrapper>
      <S.ValuesWrapper>
        <S.FirstRowValues>
          <TextField
            label="команда"
            onChange={(evt) =>
              onCommandUpdate(command.id, "name", evt.target.value)
            }
            value={command.name}
            size="small"
            disabled={isOn}
          />
          <TextField
            label="селектор"
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
        onClick={() => onCommandRemove(command.id)}
        disabled={isOn}
        style={{ visibility: isOn ? "hidden" : "visible" }}
        size="small">
        <ClearIcon />
      </IconButton>
    </S.CommandWrapper>
  )
}
