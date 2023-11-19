import { useStorageServiceState } from "../../services"

export const useSettings = () => {
  const [cycled, setCycled] = useStorageServiceState("cycled")
  const [chatId, setChatId] = useStorageServiceState("chatId")
  const [botToken, setBotToken] = useStorageServiceState("botToken")
  const [notificationsOn, setNotificationsOn] =
    useStorageServiceState("notificationsOn")
  const [notificationDelay, setNotificationDelay] =
    useStorageServiceState("notificationDelay")
  const [on] = useStorageServiceState("on")

  const handleToggleCycled = () => {
    setCycled(!cycled)
  }

  const handleChangeChatId = (chatId: string) => {
    setChatId(chatId)
  }

  const handleChangeBotToken = (botToken: string) => {
    setBotToken(botToken)
  }

  const handleToggleNotifications = () => {
    setNotificationsOn(!notificationsOn)
  }

  const handleChangeNotificationDelay = (notificationDelay: string) => {
    setNotificationDelay(Number(notificationDelay))
  }

  return {
    data: { cycled, chatId, botToken, on, notificationsOn, notificationDelay },
    handlers: {
      handleToggleCycled,
      handleChangeChatId,
      handleChangeBotToken,
      handleToggleNotifications,
      handleChangeNotificationDelay
    }
  }
}
