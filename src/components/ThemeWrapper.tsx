import { ReactElement, useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { isDarkModeState } from '~/recoil/atoms/isDarkMode'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

interface Props {
  children: ReactElement
}
const ThemeWrapper = ({ children }: Props): ReactElement => {
  const isDarkMode = useRecoilValue(isDarkModeState)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light'
        }
      }),
    [isDarkMode]
  )

  useEffect(() => {
    console.log('ThemeWrapper.tsx: handleToggleDarkMode', isDarkMode)
  }, [isDarkMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeWrapper
