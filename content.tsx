import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import ClearIcon from "@mui/icons-material/Clear"
import { Card } from "@mui/material"
import { useState } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Runner } from "~features/Runner"
import { StorageService } from "~services"

function IndexContent() {
  const [showPopup, setShowPopup] = useState(
    StorageService.getField("popupOpened")
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

  if (!StorageService.getField("available")) {
    return null
  }

  return (
    <CacheProvider value={muiCache}>
      <DndProvider backend={HTML5Backend}>
        {showPopup && (
          <Card
            style={{
              width: 450,
              height: "calc(80vh - 48px)",
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
      </DndProvider>
    </CacheProvider>
  )
}

export default IndexContent
