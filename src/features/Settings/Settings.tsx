import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from "@mui/material"
import React from "react"

import * as S from "./styled"
import { useSettings } from "./useSettings"

export const Settings: React.FC = () => {
  const {
    data: { cycled, chatId, botToken },
    handlers: { handleChangeBotToken, handleChangeChatId, handleToggleCycled }
  } = useSettings()

  return (
    <S.Wrapper>
      <Typography textAlign="center" variant="h6">
        Настройки
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            onChange={handleToggleCycled}
            checked={cycled}
            name="cycled"
          />
        }
        label="Цикличный запуск"
      />
      <TextField
        label="Telegram Bot Token"
        onChange={(evt) => handleChangeBotToken(evt.target.value)}
        value={botToken}
        multiline
        size="small"
      />
      <TextField
        label="Telegram Chat ID"
        onChange={(evt) => handleChangeChatId(evt.target.value)}
        value={chatId}
        size="small"
      />
    </S.Wrapper>
  )
}
