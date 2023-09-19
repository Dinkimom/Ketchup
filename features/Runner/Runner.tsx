import ClearIcon from "@mui/icons-material/Clear"
import DoneIcon from "@mui/icons-material/Done"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  IconButton,
  TextField,
  Typography
} from "@mui/material"
import React from "react"

import * as S from "./styled"
import { useRunner } from "./useRunner"

export const Runner: React.FC = () => {
  const {
    data: { on, commands, runnerCommands, cycled, count },
    handlers: {
      handleToggleOn,
      handleToggleCycled,
      handleCommandUpdate,
      handleRemoveCommand,
      handleAddCommand
    }
  } = useRunner()

  return (
    <S.Wrapper>
      <Typography>
        Подтверждений за все время: <b>{count}</b>
      </Typography>
      <Typography style={{ marginBottom: 24 }}>
        Подтверждений за последний сеанс: <b>{count}</b>
      </Typography>
      {on ? (
        <Button
          variant="contained"
          size="large"
          endIcon={<StopIcon sx={{ width: 32, height: 32 }} />}
          disableElevation
          color="error"
          onClick={handleToggleOn}>
          Стоп
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          endIcon={<PlayArrowIcon sx={{ width: 32, height: 32 }} />}
          disableElevation
          disabled={!commands.length}
          onClick={handleToggleOn}>
          Запуск
        </Button>
      )}
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            onChange={handleToggleCycled}
            checked={cycled}
            disabled={on}
          />
        }
        label="Цикличный запуск"
      />
      <S.CommandsWrapper>
        {commands.map((command) => (
          <S.CommandWrapper key={command.id}>
            <div style={{ width: 40 }}>
              {on && runnerCommands[0]?.id === command.id && (
                <CircularProgress size={20} />
              )}
              {!runnerCommands.includes(command) && on && (
                <DoneIcon color="success" />
              )}
            </div>
            <TextField
              placeholder="команда"
              onChange={(evt) =>
                handleCommandUpdate(command.id, "name", evt.target.value)
              }
              size="small"
              disabled={on}
            />
            <TextField
              placeholder="селектор"
              onChange={(evt) =>
                handleCommandUpdate(command.id, "value", evt.target.value)
              }
              size="small"
              disabled={on}
            />
            <IconButton
              onClick={() => handleRemoveCommand(command.id)}
              disabled={on}
              style={{ visibility: on ? "hidden" : "visible" }}>
              <ClearIcon />
            </IconButton>
          </S.CommandWrapper>
        ))}
        <Button onClick={handleAddCommand} disabled={on} fullWidth>
          Добавить команду
        </Button>
      </S.CommandsWrapper>
      <Typography variant="h6" style={{ marginBottom: 24 }}>
        Ketchup 🍅 <Chip label="1.0.0" size="small" />
      </Typography>
    </S.Wrapper>
  )
}
