import styled from "@emotion/styled"
import { grey } from "@mui/material/colors"

export const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 8px;
  align-items: center;

  max-height: calc(100vh - 100px);
`

export const CommandsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;
  overflow: scroll;
  min-height: calc(100vh - 290px);
  max-height: calc(100vh - 290px);
`
