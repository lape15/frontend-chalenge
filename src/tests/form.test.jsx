import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../component/form';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import users from '../util';

describe('Form Component test here', () => {
  let spyOnUseSelector;
  //   let spyOnUseDispatch;
  //   let mockDispatch;

  const initialState = {
    users: [...users.users],
    currency: '',
    conversionRate: null
  };
  const mockStore = configureStore([thunk]);
  let store;
  store = mockStore(initialState);
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue(initialState);
    spyOnUseSelector.mockReturnValue(users.users);
  });

  it('renders form component', () => {
    render(
      <redux.Provider store={store}>
        <Form />
      </redux.Provider>
    );
    const form = screen.getByText(/Currency/);
    expect(form).toBeInTheDocument();
  });
});
