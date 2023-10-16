import { describe, expect, it, jest } from "@jest/globals"
import { render } from "@testing-library/react"

import { InteractionService } from "./InteractionService"

describe("InteractionService", () => {
  describe("find", () => {
    it("Поиск только по тегу - Один подходящий элемент", async () => {
      const container = render(
        <div>
          <p data-testid="elementToFind">Hello</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind")
      const result = await InteractionService.find("p")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск только по тегу - Несколько подходящих элементов", async () => {
      const container = render(
        <div>
          <p data-testid="elementToFind1">Hello</p>
          <p data-testid="elementToFind2">Hello</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind1")
      const result = await InteractionService.find("p")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск только по классу - Один подходящий элемент", async () => {
      const container = render(
        <div>
          <p data-testid="elementToFind" className="btn-primary">Hello</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind")
      const result = await InteractionService.find(".btn-primary")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск только по классу - Два подходящих элемента", async () => {
      const container = render(
        <div>
          <p data-testid="elementToFind" className="sample sample1 btn-primary">Hello</p>
          <p className="btn-primary">Hello</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind")
      const result = await InteractionService.find(".btn-primary")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск по тегу и классу - Один подходящий элемент", async () => {
      const container = render(
        <div>
          <button data-testid="elementToFind" className="sample sample1 btn-primary">Hello</button>
          <p className="btn-primary">Hello</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind")
      const result = await InteractionService.find("button.btn-primary")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск только по тегу - Нет подходящих элементов", async () => {
      render(
        <div>
          <span data-testid="elementToFind">Hello</span>
        </div>
      )
      const result = await InteractionService.find("p")

      expect(result).toBeFalsy()
    })

    it("Поиск по тегу и тексту - Один подходящий элемент", async () => {
      const container = render(
        <div>
          <p data-testid="elementToFind">Hello</p>
          <p>World</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind")
      const result = await InteractionService.find("p", "Hello")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск по тегу и тексту - Несколько подходящих элементов", async () => {
      const container = render(
        <div>
          <p data-testid="elementToFind">Hello</p>
          <p>Hello</p>
        </div>
      )
      const elementToFind = await container.findByTestId("elementToFind")
      const result = await InteractionService.find("p", "Hello")

      expect(result).toStrictEqual(elementToFind)
    })

    it("Поиск по тегу и тексту - Нет подходящих элементов", async () => {
      render(
        <div>
          <span data-testid="elementToFind">Hello</span>
        </div>
      )
      const result = await InteractionService.find("p", "world")

      expect(result).toBeFalsy()
    })
  })

  describe("click", () => {
    it("Должен кликнуть по элементу", async () => {
      const callback = jest.fn()
      render(
        <div>
          <p data-testid="elementToFind" onClick={callback}>
            Hello
          </p>
        </div>
      )
      await InteractionService.click("p")

      expect(callback).toBeCalledTimes(1)
    })
  })
})
