import { makeAutoObservable } from 'mobx'

class EditorStore {
  city = []

  constructor() {
    makeAutoObservable(this)
  }
}
export const editor = new EditorStore()
