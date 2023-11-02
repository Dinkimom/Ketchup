export const StorageService = {
  updateField(name: FieldName, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value))
  },
  getField(name: FieldName) {
    try {
      const value = JSON.parse(localStorage.getItem(name) as any)

      return value
    } catch {
      return DEFAULT_VALUES[name]
    }
  },
  clearAll() {
    FIELD_NAMES.forEach((fieldName) => localStorage.removeItem(fieldName))
  }
}

const DEFAULT_VALUES: { [key in FieldName]: unknown } = {
  packageCount: 0,
  notificationCount: 0,
  commands: [],
  popupOpened: false,
  runnerCommands: [],
  cycled: true,
  on: false,
  available: false,
  chatId: "",
  currentPage: "",
  botToken: ""
}
