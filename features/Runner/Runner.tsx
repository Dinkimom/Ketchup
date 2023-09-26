import AddIcon from "@mui/icons-material/Add"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Button, IconButton, Typography } from "@mui/material"
import React from "react"

import { Command } from "./components/Command"
import { Controls } from "./components/Controls"
import { VersionBadge } from "./components/VersionBadge"
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
      handleAddCommand,
      handleShowElement
    }
  } = useRunner()

  return (
    <S.Wrapper>
      <Typography>
        Всего подтверждений: <b style={{ marginLeft: 4 }}>{allTimeCount}</b>
      </Typography>
      <Controls
        isOn={on}
        isCycled={cycled}
        onToggleOn={handleToggleOn}
        onToggleCycled={handleToggleCycled}
      />
      <S.CommandsWrapper>
        {commands.map((command, index) => (
          <Command
            key={command.id}
            index={index}
            command={command}
            isOn={on}
            isRunning={runnerCommands[0]?.id === command.id}
            isComplete={
              runnerCommands.length > 0 &&
              !runnerCommands.find(
                (runnerCommand) => runnerCommand.id === command.id
              )
            }
            onShowElement={handleShowElement}
            onCommandUpdate={handleCommandUpdate}
            onCommandRemove={handleRemoveCommand}
          />
        ))}
        {!on && (
          <IconButton onClick={handleAddCommand} color="primary">
            <AddCircleIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
        )}
      </S.CommandsWrapper>
      <VersionBadge />
    </S.Wrapper>
  )
}
