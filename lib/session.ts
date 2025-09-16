import type { StoredUser } from "../types/user"

const KEY = "simple_auth_user_v1"

export function saveUser(user: StoredUser) {
  try {
    localStorage.setItem(KEY, JSON.stringify(user))
  } catch (e) {
    console.error("saveUser error", e)
  }
}

export function loadUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredUser
  } catch (e) {
    console.error("loadUser error", e)
    return null
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(KEY)
  } catch (e) {
    console.error("clearUser error", e)
  }
}
