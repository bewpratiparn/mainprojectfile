import React from 'react'
import { Typography, useTheme } from '@mui/material'

function CustomTypography({ value, sx, gold, rich, onClick }) {
  const theme = useTheme();

  // Adapted to match the project's Orange & Black theme
  const goldStyle = {
    backgroundImage: "linear-gradient(45deg, #FF9800, #FFC107)", // Orange to Amber gradient
    backgroundClip: "text",
    textFillColor: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 10px rgba(255, 152, 0, 0.4)", // Subtle orange glow
    fontWeight: "bold",
  }

  const defaultStyle = {
    color: theme.palette.text.primary,
  }

  return rich ? (
    <Typography
      component="div"
      dangerouslySetInnerHTML={{ __html: value ? String(value) : "" }}
      onClick={onClick}
      sx={{
        "& *": {
          color: `${theme.palette.text.primary} !important`, // Match dark mode instead of hardcoded #000
        },
        "ol": {
          listStyleType: 'disc'
        },
        "& p": {
          mt: -1.8,
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          width: '100%'
        },
        ...sx
      }}
    />
  ) : (
    <Typography
      sx={gold ? { ...goldStyle, ...sx } : { ...defaultStyle, ...sx }}
      onClick={onClick}
    >
      {value}
    </Typography>
  )
}

export default CustomTypography