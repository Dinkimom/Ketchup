import { describe, expect, it, jest } from "@jest/globals"

import { StorageService } from "./StorageService"

describe("StorageService", () => {
  it("Должен возвращать значение по-умолчанию, если ничего не сохранено - флаг", () => {
    expect(StorageService.getField("available")).toBe(false)
  })

  it("Должен возвращать сохраненное значение - флаг", () => {
    StorageService.updateField("available", true)
    expect(StorageService.getField("available")).toBe(true)
  })

  it("Должен возвращать значение по-умолчанию, если ничего не сохранено - массив", () => {
    expect(StorageService.getField("commands")).toStrictEqual([])
  })

  it("Должен возвращать сохраненное значение - массив", () => {
    StorageService.updateField("commands", [{}])
    expect(StorageService.getField("commands")).toStrictEqual([{}])
  })

  it("Должен возвращать значение по-умолчанию, если ничего не сохранено - строка", () => {
    expect(StorageService.getField("chatId")).toBe('')
  })

  it("Должен возвращать сохраненное значение - массив", () => {
    StorageService.updateField("chatId", '123')
    expect(StorageService.getField("chatId")).toBe('123')
  })

  it("Должен возвращать значение по-умолчанию, если ничего не сохранено - число", () => {
    expect(StorageService.getField("packageCount")).toBe(0)
  })

  it("Должен возвращать сохраненное значение - число", () => {
    StorageService.updateField("packageCount", 123)
    expect(StorageService.getField("packageCount")).toBe(123)
  })
})
