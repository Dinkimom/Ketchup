import AddCircleIcon from "@mui/icons-material/AddCircle"
import { IconButton, Typography } from "@mui/material"
import React from "react"

import { Command } from "./components/Command"
import { Controls } from "./components/Controls"
import { VersionBadge } from "./components/VersionBadge"
import * as S from "./styled"
import { useRunner } from "./useRunner"
import { getIsInCycle } from "./utils"

export const Runner: React.FC = () => {
  const {
    data: { on, commands, runnerCommands, cycled, allTimeCount, aimingCommand },
    handlers: {
      handleToggleOn,
      handleToggleCycled,
      handleCommandUpdate,
      handleRemoveCommand,
      handleAddCommand,
      handleShowElement,
      handleCommandMove,
      handleElementAim
    }
  } = useRunner()

  return (
    <>
      {aimingCommand && <S.Shimmer />}
      <S.Wrapper data-testid="content">
        <Typography>
          Всего подтверждений:{" "}
          <S.Counter data-testid="counter">{allTimeCount}</S.Counter>
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
              isAiming={aimingCommand === command.id}
              isRunning={on && runnerCommands[0]?.id === command.id}
              isComplete={
                on &&
                !runnerCommands.find(
                  (runnerCommand) => runnerCommand.id === command.id
                )
              }
              onShowElement={handleShowElement}
              onCommandUpdate={handleCommandUpdate}
              onCommandRemove={handleRemoveCommand}
              onCommandMove={handleCommandMove}
              onElementAim={handleElementAim}
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
    </>
  )
}
