export const checkIfAuthenticated = (state) => state.auth.isAuthenticated;
export const loginError = (state) => state.auth.errors;
export const getCurrentUser = (state) => state.auth.user;
export const getSelectedLanguage = (state) =>
  state.localization.selectedLanguage;
export const checkAccess = (currentUserRole, allowedRoles) => {
  return allowedRoles.includes(currentUserRole);
};
