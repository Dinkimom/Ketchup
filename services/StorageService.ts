type FieldName =
  | "allTimeCount"
  | "commands"
  | "popupOpened"
  | "on"
  | "runnerInitialized"
  | "runnerCommands"
  | "cycled"

const FIELD_NAMES: FieldName[] = [
  "allTimeCount",
  "commands",
  "popupOpened",
  "on",
  "runnerInitialized",
  "runnerCommands",
  "cycled"
]

export const StorageService = {
  updateField(name: FieldName, value: unknown) {
    console.log(name, value)
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
  popupOpened: true,
  on: false,
  runnerInitialized: false,
  runnerCommands: [],
  cycled: true
}
