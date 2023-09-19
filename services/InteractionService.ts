import { yellow } from "@mui/material/colors"

export const InteractionService = {
  find: async (query: string) => {
    const elementToFind: any = document.querySelector(query)
    const transitionBeforeChange = elementToFind.style.transition
    const backgroundBeforeChange = elementToFind.style.background

    elementToFind.style.background = yellow[500]
    elementToFind.style.transition = "all 0.5s"

    await InteractionService.delay(2000)

    elementToFind.style.background = backgroundBeforeChange
    elementToFind.style.transition = transitionBeforeChange

    return elementToFind
  },
  waitFor: async (query: string) => {
    return new Promise((resolve) => {
      if (document.querySelector(query)) {
        return resolve(InteractionService.find(query))
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(query)) {
          observer.disconnect()
          resolve(InteractionService.find(query))
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  },
  click: async (query) => {
    const elementToClick = await InteractionService.find(query)

    elementToClick.click()

    await InteractionService.delay(3000)
  },
  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
