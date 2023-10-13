import AddCircleIcon from "@mui/icons-material/AddCircle"
import { IconButton, Typography } from "@mui/material"
import React from "react"

import { Command } from "./components/Command"
import { Controls } from "./components/Controls"
import { VersionBadge } from "./components/VersionBadge"
import * as S from "./styled"
import type { Command as CommandType } from "./types"
import { useRunner } from "./useRunner"

export const Runner: React.FC = () => {
  const {
    data: {
      on,
      commands,
      runnerCommands,
      cycled,
      allTimeCount,
      isOneCommandRun
    },
    handlers: {
      handleToggleOn,
      handleToggleCycled,
      handleCommandUpdate,
      handleRemoveCommand,
      handleAddCommand,
      handleShowElement,
      handleCommandMove,
      handleCommandRun
    }
  } = useRunner()

  const getIsInCycle = (commands: CommandType[], command: CommandType) => {
    const commandIndex = commands.findIndex(
      (commandToCheck) => commandToCheck.id === command.id
    )
    const cycleStartIndex = commands.findLastIndex(
      (commandToCheck, index) =>
        commandToCheck.name === "doUntil" && index < commandIndex
    )
    const cycleEndIndex = commands.findIndex(
      (commandToCheck, index) =>
        commandToCheck.name === "end" && index > commandIndex
    )
    const isIntersection = commands
      .slice(cycleStartIndex + 1, cycleEndIndex - 1)
      .every((command) => command.name !== "doUntil" && command.name !== "end")

    return cycleStartIndex !== -1 && cycleEndIndex !== -1 && isIntersection
  }

  return (
    <S.Wrapper data-testid="content">
      <Typography>
        Всего подтверждений:{" "}
        <b style={{ marginLeft: 4 }} data-testid="counter">
          {allTimeCount}
        </b>
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
            index={index}
            key={command.id}
            command={command}
            isInCycle={getIsInCycle(commands, command)}
            isOn={on}
            isRunning={runnerCommands[0]?.id === command.id}
            isComplete={
              !isOneCommandRun &&
              runnerCommands.length > 0 &&
              !runnerCommands.find(
                (runnerCommand) => runnerCommand.id === command.id
              )
            }
            onShowElement={handleShowElement}
            onCommandUpdate={handleCommandUpdate as any}
            onCommandRemove={handleRemoveCommand}
            onCommandMove={handleCommandMove}
            onCommandRun={handleCommandRun}
          />
        ))}
        {!on && (
          <IconButton
            onClick={handleAddCommand}
            color="primary"
            data-testid="add-button">
            <AddCircleIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
        )}
      </S.CommandsWrapper>
      <VersionBadge />
    </S.Wrapper>
  )
}
