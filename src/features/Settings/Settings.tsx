import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import React from "react"

import * as S from "./styled"
import { useSettings } from "./useSettings"

export const Settings: React.FC = () => {
  const {
    data: { cycled, chatId, botToken, on, notificationsOn, notificationDelay },
    handlers: {
      handleChangeBotToken,
      handleChangeChatId,
      handleToggleCycled,
      handleToggleNotifications,
      handleChangeNotificationDelay
    }
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
        disabled={on}
      />
      <TextField
        label="Telegram Bot Token"
        onChange={(evt) => handleChangeBotToken(evt.target.value)}
        value={botToken}
        multiline
        size="small"
        disabled={on}
      />
      <TextField
        label="Telegram Chat ID"
        onChange={(evt) => handleChangeChatId(evt.target.value)}
        value={chatId}
        size="small"
        disabled={on}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            onChange={handleToggleNotifications}
            checked={notificationsOn}
            name="notificationsOn"
          />
        }
        label="Включить уведомления"
        disabled={on}
      />
      <TextField
        label="Отправить уведомление через"
        onChange={(evt) => handleChangeNotificationDelay(evt.target.value)}
        value={notificationDelay}
        size="small"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">сек</InputAdornment>,
        }}
        disabled={on}
      />
    </S.Wrapper>
  )
}
