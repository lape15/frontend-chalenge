/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import App from '../App';

describe('App  component tests', () => {
  let spyOnUseSelector;
  //   let spyOnUseDispatch;
  //   let mockDispatch;

  const initialState = {
    users: [],
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
  });

  it('renders wallet page', () => {
    render(
      <redux.Provider store={store}>
        <App />
      </redux.Provider>
    );
    const walletElement = screen.getByText(/Wallet/i);
    // expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(walletElement).toBeInTheDocument();
  });
});
