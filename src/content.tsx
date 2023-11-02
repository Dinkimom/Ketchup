import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from "@mui/icons-material/Clear"
import SettingsIcon from "@mui/icons-material/Settings"
import { Card, IconButton } from "@mui/material"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Runner } from "./features/Runner"
import { VersionBadge } from "./features/Runner/components/VersionBadge"
import { Settings } from "./features/Settings"
import { useStorageServiceState } from "./services"

function IndexContent() {
  const [showPopup, setShowPopup] = useStorageServiceState("popupOpened")
  const [available] = useStorageServiceState("available")
  const [currentPage, setCurrentPage] = useStorageServiceState("currentPage")
  const [on] = useStorageServiceState("on")
  const root = document.querySelector("plasmo-csui")?.shadowRoot
  const muiCache = createCache({
    key: "mui",
    container: root,
    prepend: true
  })

  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleNavigationClick = () => {
    if (currentPage === "settings") {
      setCurrentPage("main")
      return
    }

    setCurrentPage("settings")
  }

  const renderNavigationIcon = () => {
    if (currentPage === "settings") {
      return <ArrowBackIosNewIcon />
    }

    return <SettingsIcon />
  }

  const renderInner = () => {
    switch (currentPage) {
      case "settings":
        return <Settings />
      default:
        return <Runner />
    }
  }

  if (!available) {
    return null
  }

  return (
    <div style={{ position: "relative", zIndex: 1000 }}>
      <DndProvider backend={HTML5Backend}>
        <CacheProvider value={muiCache}>
          <Card
            style={{
              width: 450,
              height: "calc(80vh - 48px)",
              position: "fixed",
              top: 24,
              right: showPopup ? 24 : -500,
              transition: "all .5s"
            }}>
            {!on && (
              <IconButton
                style={{ position: "absolute", top: 12, left: 8 }}
                onClick={handleNavigationClick}>
                {renderNavigationIcon()}
              </IconButton>
            )}
            {renderInner()}
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}>
              <VersionBadge />
            </div>
          </Card>
          <div
            data-testid="toggle-button"
            onClick={handleTogglePopup}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              background: showPopup ? "lightgrey" : "red",
              position: "fixed",
              top: 12,
              right: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              cursor: "pointer"
            }}>
            {showPopup ? <ClearIcon /> : "🍅"}
          </div>
        </CacheProvider>
      </DndProvider>
    </div>
  )
}

export default IndexContent
