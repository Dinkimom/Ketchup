import styled from "@emotion/styled"
import { grey } from "@mui/material/colors"

export const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  align-items: center;
  max-height: calc(80vh - 100px);
`

export const CommandsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;
  overflow-y: scroll;
  min-height: calc(80vh - 290px);
  max-height: calc(80vh - 290px);
  background: ${grey[100]};
  padding: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  user-select: none;
  border: 1px solid ${grey[300]};
`