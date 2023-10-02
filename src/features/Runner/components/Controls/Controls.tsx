import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import { Button, Checkbox, FormControlLabel } from "@mui/material"
import React from "react"

interface Props {
  isOn: boolean
  isCycled: boolean
  onToggleOn: () => void
  onToggleCycled: () => void
}

export const Controls: React.FC<Props> = ({
  isOn,
  isCycled,
  onToggleOn,
  onToggleCycled
}) => {
  const renderToggleButton = () => {
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

  return (
    <>
      {renderToggleButton()}
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            onChange={onToggleCycled}
            checked={isCycled}
            disabled={isOn}
            name="cycled"
          />
        }
        label="Цикличный запуск"
      />
    </>
  )
}
