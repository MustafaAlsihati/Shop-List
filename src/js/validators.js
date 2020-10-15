import _ from 'lodash';
import { validateEmail } from './utils';

export function signUpValidator(user, setInputErrs) {
  let valid = true;
  let errs = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  if (_.isEmpty(user.username)) {
    errs = { ...errs, username: 'Username should not be empty' };
    valid = false;
  } else if (/\s/.test(user.username)) {
    errs = { ...errs, username: 'Username should not have any whitespaces' };
    valid = false;
  }

  if (_.isEmpty(user.email) || !validateEmail(user.email)) {
    errs = { ...errs, email: 'Email address should be valid' };
    valid = false;
  }

  if (user.password !== user.confirmPassword) {
    errs = {
      ...errs,
      password: 'Password inputs are not identical',
      confirmPassword: 'Password inputs are not identical',
    };
    valid = false;
  } else if (_.isEmpty(user.password) || _.isEmpty(user.confirmPassword)) {
    errs = {
      ...errs,
      password: 'Please enter your password',
      confirmPassword: 'Please enter your password',
    };
  }

  setInputErrs(errs);
  return valid;
}