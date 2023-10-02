import { Button } from "@mui/material"
import React from "react"

export const Helpers: React.FC = () => {
  return (
    <div>
      <Button data-testid="test-button">Click me</Button>
      <Button data-testid="test-button">No! Click me</Button>
    </div>
  )
}
