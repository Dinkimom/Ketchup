import { Typography, Chip } from "@mui/material"
import React from "react"
import packageJson from '../../../../package.json'

export const VersionBadge = () => {
  return (
    <Typography variant="h6" style={{ marginBottom: 24 }}>
      {packageJson.displayName}{" "}
      <Chip label={packageJson.version} size="small" />
    </Typography>
  )
}
