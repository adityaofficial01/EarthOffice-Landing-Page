export const fileUrl = process.env.REACT_APP_IMG_URL

export const playStoreLink = 'https://play.google.com/store/games?hl=en&pli=1'
export const AppStoreLink = 'https://apps.apple.com/us/app/quikygram/id6754606331'

// Password Validation
export const validatePassword = (_, value) => {
  const enteredPassword = value ? value.trim() : ''; // Trim the value or set to an empty string if not provided

  if (enteredPassword.length === 0) {
    return Promise.reject(new Error('Whitespace is not allowed!'));
  }

  if (!enteredPassword) {
    return Promise.reject(new Error('Please enter your password.'));
  }

  if (enteredPassword.length < 8) {
    return Promise.reject(new Error('Password must be at least 8 characters long.'));
  }
  if (!/[A-Z]/.test(enteredPassword)) {
    return Promise.reject(new Error('Password must include at least one uppercase letter.'));
  }
  if (!/[a-z]/.test(enteredPassword)) {
    return Promise.reject(new Error('Password must include at least one lowercase letter.'));
  }
  if (!/[0-9]/.test(enteredPassword)) {
    return Promise.reject(new Error('Password must include at least one number.'));
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword)) {
    return Promise.reject(new Error('Password must include at least one special character.'));
  }

  return Promise.resolve();
};


// Validate No Whitespace Allowed
export const validateNoWhitespace = (_, value) => ({
  validator: (_, value) => {
    if (value && value.trim().length === 0) {
      return Promise.reject(new Error('Whitespace is not allowed!'));
    }
    return Promise.resolve();
  }
});
