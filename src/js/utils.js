import Currencies from '../constants/Currencies';

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export const filterCurrencies = (currency, term) => {
  term = term.toLowerCase();

  const code = currency.code && currency.code.toLowerCase().includes(term);
  const name = currency.name && currency.name.toLowerCase().includes(term);
  const symbol =
    currency.symbol && currency.symbol.toLowerCase().includes(term);

  return code || name || symbol;
};
