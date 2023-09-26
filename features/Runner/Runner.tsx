import { Button, Typography } from "@mui/material"
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
        {commands.map((command) => (
          <Command
            key={command.id}
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
          <Button onClick={handleAddCommand} fullWidth>
            Добавить команду
          </Button>
        )}
      </S.CommandsWrapper>
      <VersionBadge />
    </S.Wrapper>
  )
}
