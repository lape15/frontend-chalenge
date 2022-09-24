import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { doFetchConversionRate, doSaveCurrency } from '../store/wallet';
import DialogBox from './dialog_box';
import ModalComponent from './modal';
import { motion } from 'framer-motion';

const currencies = ['NGN', 'USD', 'EUR'];

const FormWrapper = styled.form`
  width: 400px;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  position: relative;

  margin: 0;
  box-shadow: 0px 4px 25px rgba(196, 196, 196, 0.25);
  & .error {
    margin: 10px;
    font-size: 14px;
    color: red;
  }
  @media (max-width: 768px) {
    width: 500px;
    top: 5vh;
  }
  @media (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

const Label = styled.label`
  display: flex;
  flex-flow: column nowrap;
  margin: 10px;
  & span {
    color: #333;
  }
  & input,
  select {
    padding: 10px;
    border-radius: 4px;
    border:1px solid #ccc;
    margin: 10px 0;
    font-size: 12px;
    -webkit-appearance: none;
    background: white;
    b
  }
`;
const FlexWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  & button {
    margin: 10px;
    font-size: 14px;
    background: #00e59e;
    border: 1px solid #00e59e;
    color: #18379a;
    padding: 10px;
    width: 100px;
    border-radius: 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.cancel {
      background: transparent;
    }
  }
`;

const info = {
  amount: 0,
  currency: '',
  recipient: ''
};
const Form = ({ showTransferForm, deductBalance, balance }) => {
  const users = useSelector((state) => state.wallet.users);
  const user = useSelector((state) => state.user.user);
  const [transferInfo, setTransferInfo] = useState(info);
  const conversionRate = useSelector((state) => state.wallet.conversionRate);
  const currency = useSelector((state) => state.wallet.currency);
  const [showPreview, setShowPreview] = useState(false);

  const [error, setError] = useState('');
  const recipients = users.filter((usr) => usr.email !== user.email);
  console.log({ users, user, recipients });

  const dispatch = useDispatch();
  useEffect(() => dispatch(doFetchConversionRate()), [dispatch]);

  useEffect(() => {
    dispatch(doSaveCurrency(transferInfo.currency));
  }, [transferInfo.currency, dispatch]);

  const handleInfoChange = (e) => {
    const { value, name } = e.target;
    setError('');
    setTransferInfo({
      ...transferInfo,
      [name]: value
    });
  };

  const handlePreview = (value) => {
    setShowPreview(value);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const infoKeys = Object.keys(transferInfo);

    for (let i = 0; i < infoKeys.length; i += 1) {
      if (!transferInfo[infoKeys[i]]) {
        setError('Field cannot be empty');
        return;
      }
      if (transferInfo['amount'] > balance) {
        setError('Amount cannot be greater than balance');
        return;
      }
      if (transferInfo['amount'] < 0) {
        setError('Amount is invalid');
        return;
      }
    }
    handlePreview(true);
  };

  const resetTransferInfo = () => {
    setTransferInfo(info);
  };

  const doTransfer = () => {
    deductBalance(Number(transferInfo.amount) * Number(conversionRate[currency]));
    resetTransferInfo();
    setShowPreview(false);
  };

  return (
    <>
      <FormWrapper
        onSubmit={handleTransferSubmit}
        as={motion.form}
        initial={{ y: -150 }}
        animate={{ y: 10 }}
        transition={{ duration: 1 }}
        key={'form_id'}>
        <DialogBox />
        {error && <p className="error">{error}</p>}

        <Label>
          <span>Currency</span>
          <select
            value={transferInfo.currency}
            name="currency"
            onChange={handleInfoChange}
            required>
            <option defaultValue="Select currency">Select currency</option>
            {currencies.map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
        </Label>

        <Label>
          <span>Amount</span>
          <input
            type="number"
            value={transferInfo.amount}
            name="amount"
            onChange={handleInfoChange}
            required
          />
        </Label>

        <Label>
          <span>Recipient</span>
          <select
            value={transferInfo.recipient}
            name="recipient"
            onChange={handleInfoChange}
            required>
            <option defaultValue="Select recipient">Select recipient</option>

            {recipients.map((recipient) => (
              <option value={`${recipient.firstName} ${recipient.lastName}`} key={recipient.id}>
                {recipient.firstName}&nbsp; {recipient.firstName}
              </option>
            ))}
          </select>
        </Label>
        <FlexWrapper>
          <button className="cancel" onClick={() => showTransferForm(false)}>
            Cancel
          </button>
          <button>Save</button>
        </FlexWrapper>
      </FormWrapper>
      <ModalComponent
        show={showPreview}
        handlePreview={handlePreview}
        doTransfer={doTransfer}
        transferInfo={transferInfo}
      />
    </>
  );
};
Form.propTypes = {
  showTransferForm: PropTypes.func,
  deductBalance: PropTypes.func,
  balance: PropTypes.number
};
export default Form;
