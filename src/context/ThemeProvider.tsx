import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import { getTheme } from '../themes'

export const ThemeProvider = ({ slug, children }: { slug: string; children: ReactNode }) => {
  const theme = getTheme(slug)
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`theme-${theme.slug}`}>{children}</div>
    </ThemeContext.Provider>
  )
}
