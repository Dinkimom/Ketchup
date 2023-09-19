import { createRef, useEffect, useRef, useState } from "react"
import * as uuid from "uuid"

import "url-change-event"

import { InteractionService, StorageService } from "~services"

import type { Command } from "./types"

export const useRunner = () => {
  const handleToggleOn = () => {
    if (runnerCommands.length > 0) {
      setRunnerCommands([])
    } else {
      setRunnerCommands([...commands])
    }
  }
  useEffect(() => {
    const previousRunnerCommands = StorageService.getField("runnerCommands")

    if (previousRunnerCommands) {
      setRunnerCommands(previousRunnerCommands)
      StorageService.updateField("runnerCommands", [])
    }
  }, [])

  const [cycled, setCycled] = useState(
    StorageService.getField("cycled") === "true"
  )
  const handleToggleCycled = () => {
    setCycled(!cycled)
    StorageService.updateField("cycled", !cycled)
  }

  const [count, setCount] = useState(0)
  const allTimeCount = StorageService.getField("allTimeCount")

  const [commands, setCommands] = useState<Command[]>(
    StorageService.getField("commands")
  )
  const handleAddCommand = () => {
    setCommands((commands) => [
      ...commands,
      { id: uuid.v1(), name: "", value: "" }
    ])
  }
  const handleRemoveCommand = (id: string) => {
    setCommands((commands) => commands.filter((command) => command.id !== id))
  }
  const handleCommandUpdate = (
    id: string,
    field: "name" | "value",
    value: string
  ) => {
    const commandToUpdate = commands.find((command) => command.id === id)

    commandToUpdate[field] = value
    setCommands([...commands])
  }
  const [runnerCommands, setRunnerCommands] = useState<Command[]>([])

  const runCommand = async () => {
    const commandToRun = runnerCommands[0]

    await InteractionService[commandToRun.name](commandToRun.value)
    runnerCommands.shift()

    if (cycled && !runnerCommands.length) {
      setRunnerCommands([...commands])
    } else {
      setRunnerCommands([...runnerCommands])
    }

    StorageService.updateField("allTimeCount", allTimeCount + 1)
    setCount(count + 1)
  }

  useEffect(() => {
    if (runnerCommands.length) {
      runCommand()
    }
  }, [runnerCommands])

  useEffect(() => {
    StorageService.updateField("commands", commands)
  }, [commands])

  const handleUrlChange = () => {
    console.log(cycled, runnerCommands)
    if (!cycled && runnerCommands.length) {
      console.log("NOT COMPLETED!")
      runnerCommands.shift()
      StorageService.updateField("popupOpened", true)
      StorageService.updateField("on", true)
      StorageService.updateField("cycled", cycled)
      StorageService.updateField("runnerInitialized", true)

      if (!cycled) {
        StorageService.updateField("runnerCommands", runnerCommands)
      } else {
        StorageService.updateField(
          "runnerCommands",
          runnerCommands.length ? runnerCommands : commands
        )
      }
      console.log(StorageService.getField("runnerCommands"))
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
      count,
      allTimeCount
    },
    handlers: {
      handleToggleOn,
      handleToggleCycled,
      handleCommandUpdate,
      handleRemoveCommand,
      handleAddCommand
    }
  }
}
