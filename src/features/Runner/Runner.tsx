import AddCircleIcon from "@mui/icons-material/AddCircle"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import { IconButton, Typography } from "@mui/material"
import React from "react"

import { VersionBadge } from "../../components/VersionBadge"
import { Command } from "./components/Command"
import { Controls } from "./components/Controls"
import * as S from "./styled"
import { useRunner } from "./useRunner"
import { getIsInCycle } from "./utils"

export const Runner: React.FC = () => {
  const {
    data: {
      on,
      commands,
      runnerCommands,
      packageCount,
      notificationCount,
      aimingCommand
    },
    handlers: {
      handleToggleOn,
      handleCommandUpdate,
      handleRemoveCommand,
      handleAddCommand,
      handleShowElement,
      handleCommandMove,
      handleElementAim,
      handleCounterReset
    }
  } = useRunner()

  return (
    <>
      {aimingCommand && <S.Shimmer />}
      <S.Wrapper data-testid="content">
        <S.CounterWrapper>
          <Typography>
            Пакетов: <S.Counter data-testid="counter">{packageCount}</S.Counter>
          </Typography>
          <Typography>
            Уведомлений:
            <S.Counter data-testid="counter">{notificationCount}</S.Counter>
          </Typography>
          <IconButton onClick={handleCounterReset}>
            <AutorenewIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
        </S.CounterWrapper>
        <Controls isOn={on} onToggleOn={handleToggleOn} />
        <S.CommandsWrapper>
          {!on && commands.length > 0 && (
            <IconButton
              onClick={() => handleAddCommand(0)}
              sx={{ margin: "-4px auto" }}
              data-testid="add-button">
              <AddCircleIcon sx={{ width: 24, height: 24 }} />
            </IconButton>
          )}
          {commands.map((command, index) => (
            <>
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
              {!on && index !== commands.length - 1 && (
                <IconButton
                  onClick={() => handleAddCommand(index + 1)}
                  sx={{ margin: "-4px auto" }}
                  data-testid="add-button">
                  <AddCircleIcon sx={{ width: 24, height: 24 }} />
                </IconButton>
              )}
            </>
          ))}
          {!on && (
            <IconButton
              onClick={() => handleAddCommand()}
              sx={{ margin: "-4px auto" }}
              data-testid="add-button">
              <AddCircleIcon sx={{ width: 24, height: 24 }} />
            </IconButton>
          )}
        </S.CommandsWrapper>
      </S.Wrapper>
    </>
  )
}
