import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import { Button } from "@mui/material"
import React from "react"

interface Props {
  isOn: boolean
  onToggleOn: () => void
}

export const Controls: React.FC<Props> = ({ isOn, onToggleOn }) => {
  if (isOn) {
    return (
      <Button
        variant="contained"
        size="large"
        endIcon={<StopIcon sx={{ width: 32, height: 32 }} />}
        disableElevation
        color="error"
        onClick={onToggleOn}
        data-testid="stop-commands">
        Стоп
      </Button>
    )
  }

  return (
    <Button
      variant="contained"
      size="large"
      endIcon={<PlayArrowIcon sx={{ width: 32, height: 32 }} />}
      disableElevation
      onClick={onToggleOn}
      data-testid="run-commands">
      Запуск
    </Button>
  )
}
