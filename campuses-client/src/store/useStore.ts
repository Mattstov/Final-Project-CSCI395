import { create } from 'zustand'

interface AppStore {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useStore = create<AppStore>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}))

export default useStore
