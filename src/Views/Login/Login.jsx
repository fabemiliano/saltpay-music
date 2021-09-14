import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { login } from '../../Actions/LoginActions';
import styles from './Login.module.scss';

function validateLogin(users, inputEmail, password, setInvalidEntries, setRedirect, doLogin) {
  const invalidUser = {
    email: false,
    password: true,
  };

  const invalidPassword = {
    email: true,
    password: false,
  };

  const userExist = users.find((({ email }) => email === inputEmail));

  if (!userExist) {
    setInvalidEntries(invalidUser);
  } else if (userExist.password !== password) {
    setInvalidEntries(invalidPassword);
  } else {
    doLogin(userExist.email);
    setRedirect(true);
  }
}

function Login({ doLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEntries, setInvalidEntries] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { t } = useTranslation();

  const users = JSON.parse(localStorage.getItem('users')) || [];

  return (
    <div onKeyPress={(e) => e.key === 'Enter' && validateLogin(users, email, password, setInvalidEntries, setRedirect, doLogin)} className={styles.login}>
      <h1>{t('login.title')}</h1>
      <input className="form-input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {invalidEntries && !invalidEntries.email && <p>User not found</p>}
      <input type="password" className="form-input" placeholder={t('login.password')} value={password} onChange={(e) => setPassword(e.target.value)} />
      {invalidEntries && !invalidEntries.password && <p>Wrong Password</p>}

      <button
        type="button"
        className="submit-button"
        
        onClick={() => validateLogin(users, email, password, setInvalidEntries, setRedirect, doLogin)}
      >
        {t('login.submit')}

      </button>
      {redirect && <Redirect to="/" />}

    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(login(email)),
});

const mapStateToProps = (state) => ({
  logged: state.loginReducer.logged,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
