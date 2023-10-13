import { useEffect, useState } from "react"

import "url-change-event"

import { InteractionService, StorageService } from "../../services"
import type { Command } from "./types"
import { generateId } from "./utils"

export const useRunner = () => {
  const handleToggleOn = () => {
    if (runnerCommands.length) {
      setRunnerCommands([])
      setOneCommandRun(false)
      StorageService.updateField("runnerCommands", [])
      StorageService.updateField("stopped", true)
    } else {
      setRunnerCommands([...commands])
      setOneCommandRun(false)
      StorageService.updateField("stopped", false)
    }
  }

  useEffect(() => {
    const previousRunnerCommands = StorageService.getField("runnerCommands")

    if (previousRunnerCommands.length > 0) {
      setRunnerCommands(previousRunnerCommands)
      StorageService.updateField("runnerCommands", [])
    }
  }, [])

  const [cycled, setCycled] = useState(StorageService.getField("cycled"))
  const handleToggleCycled = () => {
    setCycled(!cycled)
    StorageService.updateField("cycled", !cycled)
  }

  const allTimeCount = StorageService.getField("allTimeCount")

  const [isOneCommandRun, setOneCommandRun] = useState(false)
  const [commands, setCommands] = useState<Command[]>(
    StorageService.getField("commands")
  )
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
  const [runnerCommands, setRunnerCommands] = useState<Command[]>([])

  const handleCommandMove = (from: number, to: number) => {
    const updatedCommands = [...commands]
    const itemToMove = updatedCommands[from]

    updatedCommands[from] = updatedCommands[to]
    updatedCommands[to] = itemToMove

    setCommands(updatedCommands)
  }

  const handleCommandRun = (index: number) => {
    setRunnerCommands([commands[index]])
    setOneCommandRun(true)
    StorageService.updateField("stopped", false)
  }

  const runCommand = async () => {
    const commandToRun = runnerCommands[0]

    if (commandToRun.name === "doUntil") {
      const elementToCheck = await InteractionService.find(
        commandToRun.selector,
        commandToRun.text
      )
      if (!elementToCheck) {
        const cycleEnd = runnerCommands.findIndex(
          (command) => command.name === "end"
        )
        setRunnerCommands((runnerCommands) =>
          runnerCommands.slice(cycleEnd + 1)
        )
        return
      } else {
        runnerCommands.shift()
        setRunnerCommands([...runnerCommands])
        return
      }
    }

    if (commandToRun.name === "end") {
      const cycleEndIndex = commands.findIndex(
        (command) => command.id === commandToRun.id
      )
      const cycleStartIndex = commands.findLastIndex(
        (command, index) => index < cycleEndIndex && command.name === "doUntil"
      )
      setRunnerCommands((runnerCommands) => {
        return [
          ...commands.slice(cycleStartIndex, cycleEndIndex),
          ...runnerCommands
        ]
      })
      return
    }

    await (InteractionService as any)[commandToRun.name](
      commandToRun.selector,
      commandToRun.text
    )

    if (StorageService.getField("stopped")) {
      return
    }

    setRunnerCommands((runnerCommands) => {
      runnerCommands.shift()

      if (isOneCommandRun) {
        setOneCommandRun(false)

        return [...runnerCommands]
      }

      if (!runnerCommands.length) {
        StorageService.updateField("allTimeCount", allTimeCount + 1)
      }

      if (cycled && !runnerCommands.length) {
        return [...commands]
      } else {
        return [...runnerCommands]
      }
    })
  }

  useEffect(() => {
    if (runnerCommands.length > 0) {
      runCommand()
    }
  }, [runnerCommands])

  useEffect(() => {
    StorageService.updateField("commands", commands)
  }, [commands])

  const handleUrlChange = () => {
    if (runnerCommands.length) {
      runnerCommands.shift()
      StorageService.updateField("popupOpened", true)

      if (!cycled) {
        StorageService.updateField("runnerCommands", runnerCommands)
      } else {
        if (runnerCommands.length) {
          StorageService.updateField("runnerCommands", runnerCommands)
        } else {
          StorageService.updateField("allTimeCount", allTimeCount + 1)
          StorageService.updateField("runnerCommands", commands)
        }
      }
    }
  }

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

  useEffect(() => {
    window.addEventListener("urlchangeevent", handleUrlChange)

    return () => {
      window.removeEventListener("urlchangeevent", handleUrlChange)
    }
  }, [handleUrlChange])

  return {
    data: {
      on: runnerCommands.length > 0,
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
  }
}
