import { red, yellow } from "@mui/material/colors"

export const InteractionService = {
  find: async (query: string, text?: string) => {
    const possibleElements = [...document.querySelectorAll(query)]
    const elementToFind: any = text
      ? possibleElements.find((element) => element.innerHTML.includes(text))
      : possibleElements[0]
    const transitionBeforeChange = elementToFind.style.transition
    const backgroundBeforeChange = elementToFind.style.background

    elementToFind.style.background = red[500]
    elementToFind.style.transition = "all 0.5s"

    await InteractionService.delay(2000)

    elementToFind.style.background = backgroundBeforeChange
    elementToFind.style.transition = transitionBeforeChange

    return elementToFind
  },
  waitFor: async (query: string, text?: string) => {
    return new Promise((resolve) => {
      const elementToFind = InteractionService.find(query, text)
      if (elementToFind) {
        return resolve(elementToFind)
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(query)) {
          const elementToFind = InteractionService.find(query, text)
          observer.disconnect()
          resolve(elementToFind)
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  },
  click: async (query: string, text?: string) => {
    const elementToClick = await InteractionService.find(query, text)

    elementToClick.click()

    await InteractionService.delay(3000)
  },
  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
