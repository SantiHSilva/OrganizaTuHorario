export interface IUseToggle{
  value: boolean
  toggleValue: (value: boolean) => void
}

export interface IUseArray<T> {
  array: T[]
  set: (array: T[]) => void
  push: (element: T) => void
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void
  update: (index: number, newElement: T) => void
  remove: (index: number) => void
  clear: () => void
}