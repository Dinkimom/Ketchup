import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"

export const Notice: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 3000)
  }, [])

  return <div>{show && <Button data-testid="notice">Click me</Button>}</div>
}
