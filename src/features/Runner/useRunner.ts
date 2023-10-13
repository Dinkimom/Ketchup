import { useEffect, useState } from "react"

import "url-change-event"

import { InteractionService, StorageService } from "../../services"
import type { Command } from "./types"
import { generateId } from "./utils"

const useStorageServiceState = (name: string) => {
  const [state, setState] = useState(StorageService.getField(name as any))

  useEffect(() => {
    StorageService.updateField(name as any, state)
  }, [state])

  return [state, setState]
}

export const useRunner = () => {
  const [on, setOn] = useStorageServiceState("on")
  const [cycled, setCycled] = useStorageServiceState("cycled")
  const [allTimeCount, setAllTimeCount] = useStorageServiceState("allTimeCount")
  const [runnerCommands, setRunnerCommands] =
    useStorageServiceState("runnerCommands")
  const [commands, setCommands] = useStorageServiceState("commands")
  const [commandTestingMode, setCommandTestingMode] = useState(false)

  const handleToggleOn = () => {
    if (runnerCommands.length) {
      setRunnerCommands([])
      setOn(false)
    } else {
      setRunnerCommands([...commands])
      setOn(true)
    }
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
    const commandToUpdate: any = commands.find((command) => command.id === id)

    commandToUpdate[field] = value
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

  const runCommand = async () => {
    if (on) {
      const commandToRun = runnerCommands[0]

      // if (commandToRun.name === "doUntil") {
      //   const elementToCheck = await InteractionService.find(
      //     commandToRun.selector,
      //     commandToRun.text
      //   )
      //   if (!elementToCheck) {
      //     const cycleEnd = runnerCommands.findIndex(
      //       (command) => command.name === "end"
      //     )
      //     setRunnerCommands((runnerCommands) =>
      //       runnerCommands.slice(cycleEnd + 1)
      //     )
      //     return
      //   } else {
      //     runnerCommands.shift()
      //     setRunnerCommands([...runnerCommands])
      //     return
      //   }
      // }

      // if (commandToRun.name === "end") {
      //   const cycleEndIndex = commands.findIndex(
      //     (command) => command.id === commandToRun.id
      //   )
      //   const cycleStartIndex = commands.findLastIndex(
      //     (command, index) => index < cycleEndIndex && command.name === "doUntil"
      //   )
      //   setRunnerCommands((runnerCommands) => {
      //     return [
      //       ...commands.slice(cycleStartIndex, cycleEndIndex),
      //       ...runnerCommands
      //     ]
      //   })
      //   return
      // }

      await (InteractionService as any)[commandToRun.name](
        commandToRun.selector,
        commandToRun.text
      )

      setRunnerCommands((runnerCommands) => {
        runnerCommands.shift()

        if (cycled && !runnerCommands.length) {
          return [...commands]
        } else {
          return [...runnerCommands]
        }
      })
    }
  }

  useEffect(() => {
    if (runnerCommands.length > 0) {
      runCommand()
    } else {
      setOn(false)
      setCommandTestingMode(false)
      setAllTimeCount(allTimeCount + 1)
    }
  }, [runnerCommands])

  const handleShowElement = async (selector: string, text?: string) => {
    try {
      const elementToFind = await InteractionService.find(selector, text)

      if (!elementToFind) {
        alert("Элемент не найден!")
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
      commandTestingMode // todo
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
