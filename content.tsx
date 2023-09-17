import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { Button } from "@mui/material"

function IndexContent() {
  const root = document.querySelector("plasmo-csui").shadowRoot
  const muiCache = createCache({
    key: "mui",
    container: root,
    prepend: true
  })

  return (
    <CacheProvider value={muiCache}>
      <Button style={{ position: "fixed", right: 24, top: 24 }}>Hello!</Button>
    </CacheProvider>
  )
}

export default IndexContent
