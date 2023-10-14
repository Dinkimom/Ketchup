import { CommandName, type Command } from "./types"

export const generateId = () => {
  return Math.floor(Math.random() * Date.now()).toString(36)
}

export const getIsInCycle = (commands: Command[], command: Command) => {
  const commandIndex = commands.findIndex(
    (commandToCheck) => commandToCheck.id === command.id
  )
  const cycleStartIndex = commands.findLastIndex(
    (commandToCheck, index) =>
      commandToCheck.name === CommandName.whileVisible && index < commandIndex
  )
  const cycleEndIndex = commands.findIndex(
    (commandToCheck, index) =>
      commandToCheck.name === CommandName.end && index > commandIndex
  )
  const isIntersection = commands
    .slice(cycleStartIndex + 1, cycleEndIndex - 1)
    .every(
      (command) =>
        command.name !== CommandName.whileVisible && command.name !== CommandName.end
    )

  return cycleStartIndex !== -1 && cycleEndIndex !== -1 && isIntersection
}
