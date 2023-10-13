import { red } from "@mui/material/colors"

export const InteractionService = {
  find: async (query: string, text?: string) => {
    const possibleElements = [...(document.querySelectorAll(query) as any)]
    const elementToFind: any = text
      ? possibleElements.find((element) => element.textContent === text)
      : possibleElements[0]

    if (!elementToFind) {
      return undefined
    }

    console.log("🔍 Found an element: ", elementToFind)

    const transitionBeforeChange = elementToFind.style.transition
    const backgroundBeforeChange = elementToFind.style.background

    elementToFind.style.background = red[400]
    elementToFind.style.transition = "all 0.5s"
    elementToFind.setAttribute("data-found", "")

    await InteractionService.delay(2000)

    elementToFind.removeAttribute("data-found")

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

    elementToClick.setAttribute("data-clicked", "")

    elementToClick.click()

    elementToClick.removeAttribute("data-clicked")
  },
  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
