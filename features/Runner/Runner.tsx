import ClearIcon from "@mui/icons-material/Clear"
import DoneIcon from "@mui/icons-material/Done"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  TextField,
  Typography
} from "@mui/material"
import React from "react"

import packageJson from "../../package.json"
import * as S from "./styled"
import { useRunner } from "./useRunner"

export const Runner: React.FC = () => {
  const {
    data: { on, commands, runnerCommands, cycled, allTimeCount },
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
        Всего подтверждений: <b style={{ marginLeft: 4 }}>{allTimeCount}</b>
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
          <>
            <S.CommandWrapper key={command.id}>
              <div style={{ width: 40 }}>
                {runnerCommands[0]?.id === command.id && (
                  <CircularProgress size={20} />
                )}
                {runnerCommands.length > 0 &&
                  !runnerCommands.find(
                    (runnerCommand) => runnerCommand.id === command.id
                  ) && <DoneIcon color="success" sx={{ fontSize: 20 }} />}
                {!on && (
                  <IconButton size="small" style={{ cursor: "grab" }}>
                    <DragIndicatorIcon />
                  </IconButton>
                )}
              </div>
              <S.ValuesWrapper>
                <S.FirstRowValues>
                  <TextField
                    label="команда"
                    onChange={(evt) =>
                      handleCommandUpdate(command.id, "name", evt.target.value)
                    }
                    value={command.name}
                    size="small"
                    disabled={on}
                  />
                  <TextField
                    label="селектор"
                    onChange={(evt) =>
                      handleCommandUpdate(
                        command.id,
                        "selector",
                        evt.target.value
                      )
                    }
                    value={command.selector}
                    size="small"
                    disabled={on}
                  />
                </S.FirstRowValues>
                <TextField
                  label="текст"
                  onChange={(evt) =>
                    handleCommandUpdate(command.id, "text", evt.target.value)
                  }
                  value={command.text}
                  size="small"
                  multiline
                  maxRows={2}
                  disabled={on}
                />
              </S.ValuesWrapper>
              <IconButton
                onClick={() => handleRemoveCommand(command.id)}
                disabled={on}
                style={{ visibility: on ? "hidden" : "visible" }}
                size="small">
                <ClearIcon />
              </IconButton>
            </S.CommandWrapper>
          </>
        ))}
        {!on && (
          <Button onClick={handleAddCommand} fullWidth>
            Добавить команду
          </Button>
        )}
      </S.CommandsWrapper>
      <Typography variant="h6" style={{ marginBottom: 24 }}>
        {packageJson.displayName}{" "}
        <Chip label={packageJson.version} size="small" />
      </Typography>
    </S.Wrapper>
  )
}
