import { create } from 'zustand'

export interface AppStore {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useStore = create<AppStore>((set) => ({
  darkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () => set((state) => {
    const newValue = !state.darkMode
    localStorage.setItem('darkMode', String(newValue))
    return { darkMode: newValue }
  }),
}))
export default useStore
