import styled from "@emotion/styled"
import { grey } from "@mui/material/colors"

export const CommandWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 4px;
  border-radius: 5px;
  transition: all 0.5s;
  background: white;
  border: 1px solid ${grey[300]};
  position: relative;
  cursor: grab;
`

export const ValuesWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FirstRowValues = styled("div")`
  display: flex;
  gap: 8px;
`

export const StatusWrapper = styled("div")`
  max-width: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
