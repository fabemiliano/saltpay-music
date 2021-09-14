export const initialState = {
  logged: localStorage.getItem('logged'),
  isPro: localStorage.getItem('isPro'),
};

const isPro = (email) => {
  const users = JSON.parse(localStorage.getItem('users'));
  if (users.find((e) => e.email === email).isPro) {
    localStorage.setItem('isPro', true);
    return true;
  }
  localStorage.setItem('isPro', false);
  return false;
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('logged', true);
      return { ...state, logged: true, isPro: isPro(action.state) };
    case 'SIGN_OUT':
      localStorage.removeItem('logged');
      return { ...state, logged: false };
    default: return state;
  }
};

export default loginReducer;
