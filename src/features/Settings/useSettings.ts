import { useStorageServiceState } from "../../services"


export const useSettings = () => {
  const [cycled, setCycled] = useStorageServiceState("cycled")
  const [chatId, setChatId] = useStorageServiceState("chatId")
  const [botToken, setBotToken] = useStorageServiceState("botToken")

  const handleToggleCycled = () => {
    setCycled(!cycled)
  }

  const handleChangeChatId = (chatId: string) => {
    setChatId(chatId)
  }

  const handleChangeBotToken = (botToken: string) => {
    setBotToken(botToken)
  }

  return {
    data: { cycled, chatId, botToken },
    handlers: {
      handleToggleCycled,
      handleChangeChatId,
      handleChangeBotToken
    }
  }
}
