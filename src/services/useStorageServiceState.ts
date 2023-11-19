import { useEffect, useState } from "react"

import { StorageService } from "./StorageService"

export const useStorageServiceState = (name: FieldName) => {
  const [state, setState] = useState(StorageService.getField(name as any))

  useEffect(() => {
    StorageService.updateField(name as any, state)
  }, [state])

  return [state, setState]
}
