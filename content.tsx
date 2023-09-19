import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { Button, Card } from "@mui/material"
import { useState } from "react"

import { Runner } from "~features/Runner"

function IndexContent() {
  const [showPopup, setShowPopup] = useState(true)
  const root = document.querySelector("plasmo-csui").shadowRoot
  const muiCache = createCache({
    key: "mui",
    container: root,
    prepend: true
  })

  return (
    <CacheProvider value={muiCache}>
      {showPopup && (
        <Card
          style={{
            width: 340,
            height: "calc(100vh - 48px)",
            position: "fixed",
            top: 24,
            right: 24
          }}>
          <Runner />
        </Card>
      )}
    </CacheProvider>
  )
}

export default IndexContent
