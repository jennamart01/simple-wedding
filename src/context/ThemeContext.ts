import { createContext, useContext } from 'react'
import { THEMES } from '../themes'
import type { Theme } from '../themes'

export const ThemeContext = createContext<Theme>(THEMES[0])

export const useTheme = () => useContext(ThemeContext)
