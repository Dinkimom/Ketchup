type FieldName =
  | "allTimeCount"
  | "commands"
  | "popupOpened"
  | "runnerCommands"
  | "cycled"
  | "stopped"
  | "available"

const FIELD_NAMES: FieldName[] = [
  "allTimeCount",
  "commands",
  "popupOpened",
  "runnerCommands",
  "cycled",
  "stopped"
]

export const StorageService = {
  updateField(name: FieldName, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value))
  },
  getField(name: FieldName) {
    const value = JSON.parse(localStorage.getItem(name))

    if (value === null) {
      return DEFAULT_VALUES[name]
    }

    return value
  },
  clearAll() {
    FIELD_NAMES.forEach((fieldName) => localStorage.removeItem(fieldName))
  }
}

const DEFAULT_VALUES: { [key in FieldName]: unknown } = {
  allTimeCount: 0,
  commands: [],
  popupOpened: false,
  runnerCommands: [],
  cycled: true,
  stopped: true,
  available: false
}
