export const NotificationService = {
  sendMessage: async ({
    botToken,
    chatId,
    message
  }: {
    botToken: string
    chatId: string
    message: string
  }) => {
    return fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`
    )
  }
}
