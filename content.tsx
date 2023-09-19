import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import ClearIcon from "@mui/icons-material/Clear"
import { Card } from "@mui/material"
import { useState } from "react"

import { Runner } from "~features/Runner"
import { StorageService } from "~services"

function IndexContent() {
  const [showPopup, setShowPopup] = useState(
    StorageService.getField("popupOpened") === "true"
  )
  const root = document.querySelector("plasmo-csui").shadowRoot
  const muiCache = createCache({
    key: "mui",
    container: root,
    prepend: true
  })

  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
    StorageService.updateField("popupOpened", String(!showPopup))
  }

  return (
    <CacheProvider value={muiCache}>
      {showPopup && (
        <Card
          style={{
            width: 450,
            height: "calc(100vh - 48px)",
            position: "fixed",
            top: 24,
            right: 24
          }}>
          <Runner />
        </Card>
      )}
      {!showPopup && (
        <div
          onClick={handleTogglePopup}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            background: "red",
            position: "fixed",
            top: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            cursor: "pointer"
          }}>
          🍅
        </div>
      )}
      {showPopup && (
        <div
          onClick={handleTogglePopup}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            background: "lightgrey",
            position: "fixed",
            top: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            cursor: "pointer"
          }}>
          <ClearIcon />
        </div>
      )}
    </CacheProvider>
  )
}

export default IndexContent
