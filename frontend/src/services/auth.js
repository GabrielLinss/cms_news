export const TOKEN = "@cms-Token"
export const USER_ID = "@cms-UserId"
export const USER_NAME = "@cms-UserName"
export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null
export const getToken = () => localStorage.getItem(TOKEN)
export const getUserId = () => localStorage.getItem(USER_ID)
export const getUserName = () => localStorage.getItem(USER_NAME)
export const login = (token, user_id, user_name) => {
  localStorage.setItem(TOKEN, token)
  localStorage.setItem(USER_ID, user_id)
  localStorage.setItem(USER_NAME, user_name)
}
export const logout = () => {
  localStorage.clear()
}
