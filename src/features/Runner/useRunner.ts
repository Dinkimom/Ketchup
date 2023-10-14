import { useEffect, useState } from "react"

import "url-change-event"

import { InteractionService, useStorageServiceState } from "../../services"
import { CommandName, type Command } from "./types"
import { generateId } from "./utils"

export const useRunner = () => {
  const [on, setOn] = useStorageServiceState("on")
  const [cycled, setCycled] = useStorageServiceState("cycled")
  const [allTimeCount, setAllTimeCount] = useStorageServiceState("allTimeCount")
  const [runnerCommands, setRunnerCommands] =
    useStorageServiceState("runnerCommands")
  const [commands, setCommands] = useStorageServiceState("commands")
  const [commandTestingMode, setCommandTestingMode] = useState(false)

  const handleToggleOn = () => {
    setRunnerCommands(on ? [] : [...commands])
    setOn(!on)
  }

  const handleToggleCycled = () => {
    setCycled(!cycled)
  }

  const handleAddCommand = () => {
    setCommands((commands) => [
      ...commands,
      { id: generateId(), name: "", selector: "" }
    ])
  }

  const handleRemoveCommand = (id: string) => {
    setCommands((commands) => commands.filter((command) => command.id !== id))
  }

  const handleCommandUpdate = (
    id: string,
    field: "name" | "selector" | "text",
    value: string
  ) => {
    const commandToUpdate: Command = commands.find(
      (command) => command.id === id
    )

    commandToUpdate[field] = value as CommandName
    setCommands([...commands])
  }

  const handleCommandMove = (from: number, to: number) => {
    const updatedCommands = [...commands]
    const itemToMove = updatedCommands[from]

    updatedCommands[from] = updatedCommands[to]
    updatedCommands[to] = itemToMove

    setCommands(updatedCommands)
  }

  const handleCommandRun = (index: number) => {
    setCommandTestingMode(true)
    setRunnerCommands([commands[index]])
    setOn(true)
  }

  const runCommand = async (commandToRun: Command) => {
    switch (commandToRun.name) {
      case CommandName.whileVisible: {
        const elementToCheck = await InteractionService.find(
          commandToRun.selector,
          commandToRun.text
        )
        const cycleStartIndex = commands.findIndex(
          (commandToCheck) => commandToCheck.id === commandToRun.id
        )
        const cycleEndIndex = commands.findIndex(
          (command, index) =>
            cycleStartIndex < index && command.name === CommandName.end
        )
        if (elementToCheck) {
          setRunnerCommands([...runnerCommands.slice(1)])
        } else {
          setRunnerCommands([...commands.slice(cycleEndIndex + 1)])
        }
        return
      }
      case CommandName.end: {
        const cycleEndIndex = commands.findIndex(
          (commandToCheck) => commandToCheck.id === commandToRun.id
        )
        const cycleStartIndex = commands.findLastIndex(
          (command, index) =>
            index < cycleEndIndex && command.name === CommandName.whileVisible
        )
        setRunnerCommands([
          ...commands.slice(cycleStartIndex, cycleEndIndex + 1),
          ...runnerCommands
        ])
        return
      }
      default: {
        await (InteractionService as any)[commandToRun.name](
          commandToRun.selector,
          commandToRun.text
        )

        setRunnerCommands((runnerCommands) => {
          runnerCommands.shift()

          if (cycled && runnerCommands?.length === 0) {
            return [...commands]
          }

          return [...runnerCommands]
        })
      }
    }
  }

  useEffect(() => {
    if (on && runnerCommands.length > 0) {
      runCommand(runnerCommands[0])
    } else {
      setOn(false)
      setCommandTestingMode(false)
    }

    if (on && runnerCommands.length === 0) {
      setAllTimeCount(allTimeCount + 1)
    }
  }, [runnerCommands])

  const handleShowElement = async (selector: string, text?: string) => {
    try {
      const elementToFind = await InteractionService.find(selector, text)

      if (!elementToFind) {
        throw new Error()
      }
    } catch {
      alert("Элемент не найден!")
    }
  }

  return {
    data: {
      on,
      commands,
      runnerCommands,
      cycled,
      allTimeCount,
      commandTestingMode
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
  }
}
