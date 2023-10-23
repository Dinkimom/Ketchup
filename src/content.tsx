import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import ClearIcon from "@mui/icons-material/Clear"
import { Card } from "@mui/material"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Runner } from "./features/Runner"
import { useStorageServiceState } from "./services"

function IndexContent() {
  const [showPopup, setShowPopup] = useStorageServiceState("popupOpened")
  const [available] = useStorageServiceState("available")
  const root = document.querySelector("plasmo-csui")?.shadowRoot
  const muiCache = createCache({
    key: "mui",
    container: root,
    prepend: true
  })

  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
  }

  if (!available) {
    return null
  }

  return (
    <div style={{ position: "relative", zIndex: 1000 }}>
      <DndProvider backend={HTML5Backend}>
        <CacheProvider value={muiCache}>
          {showPopup && (
            <Card
              style={{
                width: 450,
                height: "calc(80vh - 48px)",
                position: "fixed",
                top: 24,
                right: 24,
                // right: showPopup ? 24 : -500,
                // transition: "all .5s"
              }}>
              <Runner />
            </Card>
          )}
          {!showPopup && (
            <div
              data-testid="toggle-button"
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
              data-testid="toggle-button"
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
      </DndProvider>
    </div>
  )
}

export default IndexContent
