import * as consts from '../consts';

export const login = (state) => ({ type: consts.LOGIN, state });
export const signOut = () => ({ type: consts.SIGN_OUT });
