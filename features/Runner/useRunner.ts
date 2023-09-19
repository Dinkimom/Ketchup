import { useEffect, useState } from "react"
import * as uuid from "uuid"

import { InteractionService, StorageService } from "~services"

import type { Command } from "./types"

export const useRunner = () => {
  const [on, setOn] = useState(false)
  const handleToggleOn = () => {
    if (on) {
      setRunnerInitialized(false)
    }

    setOn(!on)
  }

  const [cycled, setCycled] = useState(true)
  const handleToggleCycled = () => {
    setCycled(!cycled)
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
  const [isRunnerInitialized, setRunnerInitialized] = useState(false)

  useEffect(() => {
    if (on && commands.length && !isRunnerInitialized) {
      setRunnerCommands([...commands])
      setRunnerInitialized(true)
    }
  }, [on, commands])

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
    if (on && runnerCommands.length && isRunnerInitialized) {
      runCommand()
    }
  }, [on, runnerCommands, isRunnerInitialized])

  useEffect(() => {
    if (on && !runnerCommands.length && isRunnerInitialized) {
      handleToggleOn()
    }
  }, [on, runnerCommands])

  useEffect(() => {
    StorageService.updateField("commands", commands)
  }, [commands])

  return {
    data: { on, commands, runnerCommands, cycled, count, allTimeCount },
    handlers: {
      handleToggleOn,
      handleToggleCycled,
      handleCommandUpdate,
      handleRemoveCommand,
      handleAddCommand
    }
  }
}
