import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import ClearIcon from "@mui/icons-material/Clear"
import { Card } from "@mui/material"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Runner } from "./features/Runner"
import { StorageService } from "./services"

function IndexContent() {
  const [showPopup, setShowPopup] = useState(
    StorageService.getField("popupOpened")
  )
  const root = document.querySelector("plasmo-csui")?.shadowRoot
  const muiCache = createCache({
    key: "mui",
    container: root,
    prepend: true
  })

  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
    StorageService.updateField("popupOpened", !showPopup)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <CacheProvider value={muiCache}>
        {StorageService.getField("available") && (
          <>
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
          </>
        )}
      </CacheProvider>
    </DndProvider>
  )
}

export default IndexContent
