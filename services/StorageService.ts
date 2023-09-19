type FieldName =
  | "allTimeCount"
  | "commands"
  | "popupOpened"
  | "runnerCommands"
  | "cycled"
  | "stopped"

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
    return JSON.parse(localStorage.getItem(name)) || DEFAULT_VALUES[name]
  },
  clearAll() {
    FIELD_NAMES.forEach((fieldName) => localStorage.removeItem(fieldName))
  }
}

const DEFAULT_VALUES: { [key in FieldName]: unknown } = {
  allTimeCount: 0,
  commands: [],
  popupOpened: "false",
  runnerCommands: [],
  cycled: "true",
  stopped: "true"
}
