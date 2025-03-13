import { useEffect, useState } from "react"

import {
  InteractionService,
  NotificationService,
  useStorageServiceState
} from "../../services"
import { CommandName, type Command } from "./types"
import {
  generateId,
  getElementInfoByCoordinates,
  getNotificationMessage
} from "./utils"

export const useRunner = () => {
  const [on, setOn] = useStorageServiceState("on")
  const [cycled] = useStorageServiceState("cycled")
  const [packageCount, setPackageCount] = useStorageServiceState("packageCount")
  const [notificationCount, setNotificationCount] =
    useStorageServiceState("notificationCount")
  const [runnerCommands, setRunnerCommands] =
    useStorageServiceState("runnerCommands")
  const [commands, setCommands] = useStorageServiceState("commands")
  const [aimingCommand, setAimingCommand] = useState<undefined | string>(
    undefined
  )
  const [botToken] = useStorageServiceState("botToken")
  const [chatId] = useStorageServiceState("chatId")
  const [notificationsOn] = useStorageServiceState("notificationsOn")
  const [notificationDelay] = useStorageServiceState("notificationDelay")

  const handleToggleOn = () => {
    setRunnerCommands(on ? [] : [...commands])
    setOn(!on)
  }

  const handleAddCommand = (index?: number) => {
    if (index === undefined) {
      setCommands((commands) => [
        ...commands,
        { id: generateId(), name: CommandName.click, selector: "" }
      ])

      return
    }

    setCommands((commands) => {
      commands.splice(index, 0, {
        id: generateId(),
        name: CommandName.click,
        selector: ""
      })
      commands.join()

      return [...commands]
    })
  }

  const handleRemoveCommand = (id: string) => {
    setCommands((commands) => commands.filter((command) => command.id !== id))
  }

  const handleCommandUpdate = (
    id: string,
    field: keyof Command,
    value: never
  ) => {
    const commandToUpdate: Command = commands.find(
      (command) => command.id === id
    )

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

  const handleElementAim = (id: string) => {
    setAimingCommand(id)
  }

  const runCommand = async (commandToRun: Command) => {
    const timeoutId = setTimeout(() => {
      if (commandToRun.notifyOnTimeout && notificationsOn) {
        NotificationService.sendMessage({
          botToken,
          chatId,
          message: getNotificationMessage(commandToRun)
        })
      }
    }, notificationDelay * 1000)

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
          const commandsToRun = [...commands.slice(cycleEndIndex + 1)]

          if (commandsToRun.length === 0) {
            setPackageCount(packageCount + 1)
          }

          setRunnerCommands(commandsToRun)
        }
        clearTimeout(timeoutId)
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
        clearTimeout(timeoutId)
        return
      }
      default: {
        await (InteractionService as any)[commandToRun.name](
          commandToRun.selector,
          commandToRun.text
        )

        setRunnerCommands((runnerCommands) => {
          runnerCommands.shift()
          clearTimeout(timeoutId)

          if (commandToRun.incrementNotification) {
            setNotificationCount(notificationCount + 1)
          }

          if (runnerCommands.length === 0) {
            setPackageCount(packageCount + 1)
          }

          if (cycled && runnerCommands?.length === 0) {
            return [...commands]
          }

          return [...runnerCommands]
        })
      }
    }
  }

  const handleElementClick = async (event: MouseEvent) => {
    if (!aimingCommand) {
      return
    }

    setAimingCommand(undefined)

    await InteractionService.delay(0) // Делает расчет элемента после перерисовки

    const commandToChange = commands.find(
      (command) => command.id === aimingCommand
    )
    const { selector, text } = getElementInfoByCoordinates(event.x, event.y)
    commandToChange.selector = selector
    commandToChange.text = text

    setCommands([...commands])
  }

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

  const handleCounterReset = () => {
    setNotificationCount(0)
    setPackageCount(0)
  }

  useEffect(() => {
    if (on && runnerCommands.length > 0) {
      runCommand(runnerCommands[0])
    } else {
      setOn(false)
    }
  }, [runnerCommands])

  useEffect(() => {
    if (runnerCommands.length !== commands) {
    }
  }, [runnerCommands])

  useEffect(() => {
    document.addEventListener("click", handleElementClick)

    return () => {
      document.removeEventListener("click", handleElementClick)
    }
  }, [aimingCommand])

  return {
    data: {
      on,
      commands,
      runnerCommands,
      cycled,
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
  }
}
