import React, { useState } from 'react';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './SignIn.module.scss';
import { login } from '../../Actions/LoginActions';

function saveData(email, password, dateOfBirth, isPro, setPage, doLogin) {
  const newUser = {
    email,
    password,
    dateOfBirth,
    isPro,
    id: v4(),
  };

  const users = localStorage.getItem('users') || [];
  const usersWithNewOne = [...users, newUser];
  localStorage.setItem('users', JSON.stringify(usersWithNewOne));
  doLogin(email);
  setPage('welcome');
}

function containStringAndNumber(string) {
  const arrayOfStrings = string.split('');
  const convertedStrings = arrayOfStrings.map((e) => (Number(e) ? Number(e) : e));
  const containNumber = convertedStrings.some((e) => typeof e === 'number');
  const containString = convertedStrings.some((e) => typeof e === 'string');
  return containNumber && containString;
}

function validate(email, confirmEmail, password, confirmPassword, dateOfBirth, setInvalidEntries, setPage) {
  const invalidEntries = {
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
    dateOfBirth: false,
  };
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  );

  if (emailRegex.test(email)) {
    invalidEntries.email = true;
  }

  if (email === confirmEmail) {
    invalidEntries.confirmEmail = true;
  }

  if (password.length > 6 && containStringAndNumber(password)) {
    invalidEntries.password = true;
  }

  if (password === confirmPassword) {
    invalidEntries.confirmPassword = true;
  }

  if (moment(dateOfBirth, 'DD/MM/YYYY', true).isValid()) {
    invalidEntries.dateOfBirth = true;
  }

  if (Object.values(invalidEntries).every((e) => e === true)) {
    setPage('subscription');
  }

  setInvalidEntries(invalidEntries);
}

function validateCard(cardNumber, cvv, dueDate, setInvalidEntriesCard, saveData, email, password, dateOfBirth, isPro, setPage, doLogin) {
  const invalidEntries = {
    cardNumber: false,
    cvv: false,
    dueDate: false,
  };

  if (cardNumber.length === 16) {
    invalidEntries.cardNumber = true;
  }

  if (cvv.length === 3 || typeof cvv === 'number') {
    invalidEntries.cvv = true;
  }

  if (moment(dueDate, 'DD/MM/YYYY', true).isValid()) {
    invalidEntries.dueDate = true;
  }

  if (invalidEntries && Object.values(invalidEntries).every((e) => e === true)) {
    saveData(email, password, dateOfBirth, isPro, setPage, doLogin);
  }

  setInvalidEntriesCard(invalidEntries);
}

function SignIn({ doLogin }) {
  const [page, setPage] = useState('personalInfo');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invalidEntries, setInvalidEntries] = useState(null);
  const [invalidEntriesCard, setInvalidEntriesCard] = useState(null);

  const { t } = useTranslation();

  return (
    <div className={styles.signin}>

      {page === 'personalInfo' && (
        <div>
          <h1>Sign In</h1>
          <form>
            <input className="form-input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {invalidEntries && !invalidEntries.email && <p>Invalid Email</p>}

            <input className="form-input" placeholder={t('signin.confirm-email')} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
            {invalidEntries && !invalidEntries.confirmEmail && <p>Email doesn't match</p>}

            <input type="password" className="form-input" placeholder={t('signin.password')} value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>{t('signin.password-hint')}</p>
            {invalidEntries && !invalidEntries.password && <p>Invalid Password</p>}

            <input type="password" className="form-input" placeholder={t('signin.confirm-password')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {invalidEntries && !invalidEntries.confirmPassword && <p>Password doesn't match</p>}

            <input className="form-input" placeholder={t('signin.date-of-birth')} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            {invalidEntries && !invalidEntries.dateOfBirth && <p>Wrong date of birth</p>}

            <button type="button" className="submit-button" onClick={() => validate(email, confirmEmail, password, confirmPassword, dateOfBirth, setInvalidEntries, setPage)}>Create</button>

          </form>
        </div>
      )}
      {page === 'subscription' && (
        <div>
          <div>
            <h1>Subscribe to Pro</h1>
            <h2>With a Pro Subscription you can add songs to favourites and create playlists</h2>
            <h3>If you hold a SaltPay credit card the Pro subcription is free</h3>
          </div>

          <form>

            <input className="form-input" placeholder={t('signin.card-number')} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            {invalidEntriesCard && !invalidEntriesCard.cardNumber && <p>Invalid CardNumber. Must Be 16 numbers</p>}

            <input className="form-input" placeholder={t('signin.due-date')} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            {invalidEntriesCard && !invalidEntriesCard.dueDate && <p>Invalid date Format (DD/MM/YYYY)</p>}

            <input className="form-input" placeholder={t('signin.cvv')} value={cvv} onChange={(e) => setCvv(e.target.value)} />
            {invalidEntriesCard && !invalidEntriesCard.cvv && <p>CVV must be 3 nubers</p>}
            <div className={styles.buttons}>

              <button className="medium-button" type="button" onClick={() => validateCard(cardNumber, cvv, dueDate, setInvalidEntriesCard, saveData, email, password, dateOfBirth, true, setPage, doLogin)}>Subscribe</button>

              <button className="small-button" type="button" onClick={() => saveData(email, password, dateOfBirth, false, setPage, doLogin)}>No thanks</button>
            </div>

          </form>

        </div>
      )}
      {page === 'welcome' && (
        <div className={styles.thanks}>
          <h1>Thanks for Joining, have fun!</h1>
          <Link to="/"><button className="medium-button">Go to Home</button></Link>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(login(email)),
});

const mapStateToProps = (state) => ({
  logged: state.loginReducer.logged,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
