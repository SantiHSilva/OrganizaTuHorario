import { create } from 'zustand'

type Store = {
  count: number
  inc: () => void
  dec: () => void
}

export const useAuth = create<Store>()((set) => ({
  count: 0,
  inc: () => {
    return set((state) => {
      return {
        count: state.count + 1
      }
    })
  },
  dec: () => set((state) => ({
    count: state.count - 1
  })),
}))
