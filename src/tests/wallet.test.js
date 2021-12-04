import reducer, { doFetchUsers, doFetchConversionRate, doSaveCurrency } from '../store/wallet';
import users from '../util';
test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    users: [],
    currency: '',
    conversionRate: null
  });
});

test('should have a list of app users in reducer', () => {
  const previousState = users.users;
  expect(reducer(previousState, doFetchUsers('Run the tests'))).toEqual(users.users);
});

it('should handle changed conversion currency', () => {
  const previousState = {
    users: [],
    currency: 'EUR',
    conversionRate: null
  };
  expect(reducer(previousState, doSaveCurrency('Use Redux'))).toEqual({
    users: [],
    currency: 'EUR',
    conversionRate: null
  });
});
