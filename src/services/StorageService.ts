export const StorageService = {
  updateField(name: FieldName, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value))
  },
  getField(name: FieldName) {
    try {
      const stringifiedValue = localStorage.getItem(name)

      if (!stringifiedValue) {
        throw new Error()
      }

      const value = JSON.parse(stringifiedValue as any)

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
  botToken: "",
  notificationsOn: true,
  notificationDelay: 60,
}
