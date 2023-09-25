import { red } from "@mui/material/colors"

export const InteractionService = {
  find: async (query: string, text?: string) => {
    const possibleElements = [...document.querySelectorAll(query)]
    const elementToFind: any = text
      ? possibleElements.find((element) => element.textContent.includes(text))
      : possibleElements[0]

    if (!elementToFind) {
      return undefined
    }

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
    let elementToFind

    while (!elementToFind) {
      elementToFind = await InteractionService.find(query, text)

      if (!elementToFind) {
        await InteractionService.delay(2000)
      }
    }

    return elementToFind
  },
  click: async (query: string, text?: string) => {
    const elementToClick = await InteractionService.waitFor(query, text)

    elementToClick.click()

    await InteractionService.delay(3000)
  },
  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
