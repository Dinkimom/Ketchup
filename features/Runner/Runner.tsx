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
import React, { useEffect, useState } from "react"
import * as uuid from "uuid"

import * as S from "./styled"

type Command = { id: string; name: string; value: string }

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const interactionService = {
  find: async (query: string) => {
    const elementToFind: any = document.querySelector(query)
    const backgroundBeforeChange = elementToFind.style.background
    elementToFind.style.background = "#1976d2"

    await delay(2000)

    elementToFind.style.background = backgroundBeforeChange

    return elementToFind
  },
  waitFor: async (query: string) => {
    return new Promise((resolve) => {
      if (document.querySelector(query)) {
        return resolve(interactionService.find(query))
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(query)) {
          observer.disconnect()
          resolve(interactionService.find(query))
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  },
  click: async (query) => {
    const elementToClick = await interactionService.find(query)

    elementToClick.click()
  }
}

export const Runner: React.FC = () => {
  const [on, setOn] = useState(false)
  const handleToggleOn = () => {
    if (on) {
      setRunnerInitialized(false)
    }

    setOn(!on)
  }

  const [cycled, setCycled] = useState(true)
  const handleToggleCycled = () => {
    setCycled(!cycled)
  }

  const [count, setCount] = useState(0)

  const [commands, setCommands] = useState<Command[]>([])
  const handleAddCommand = () => {
    setCommands((commands) => [
      ...commands,
      { id: uuid.v1(), name: "", value: "" }
    ])
  }
  const handleRemoveCommand = (id: string) => {
    setCommands((commands) => commands.filter((command) => command.id !== id))
  }
  const handleCommandUpdate = (
    id: string,
    field: "name" | "value",
    value: string
  ) => {
    const commandToUpdate = commands.find((command) => command.id === id)

    commandToUpdate[field] = value
    setCommands([...commands])
  }
  const [runnerCommands, setRunnerCommands] = useState<Command[]>([])
  const [isRunnerInitialized, setRunnerInitialized] = useState(false)

  useEffect(() => {
    if (on && commands.length && !isRunnerInitialized) {
      setRunnerCommands([...commands])
      setRunnerInitialized(true)
    }
  }, [on, commands])

  const runCommand = async () => {
    const commandToRun = runnerCommands[0]

    await interactionService[commandToRun.name](commandToRun.value)
    runnerCommands.shift()

    if (cycled && !runnerCommands.length) {
      setRunnerCommands([...commands])
    } else {
      setRunnerCommands([...runnerCommands])
    }

    setCount(count + 1)
  }

  useEffect(() => {
    if (on && runnerCommands.length && isRunnerInitialized) {
      runCommand()
    }
  }, [on, runnerCommands, isRunnerInitialized])

  useEffect(() => {
    if (on && !runnerCommands.length && isRunnerInitialized) {
      handleToggleOn()
    }
  }, [on, runnerCommands])

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
