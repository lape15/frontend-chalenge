import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { doFetchConversionRate, doSaveCurrency } from '../store/users';
import DialogBox from './dialog_box';
import ModalComponent from './modal';

const currencies = ['NGN', 'USD', 'EUR'];

const FormWrapper = styled.form`
  width: 500px;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  position: relative;
  margin: 8% auto;
  box-shadow: 0px 4px 25px rgba(196, 196, 196, 0.25);
  & .error {
    margin: 10px;
    font-size: 14px;
    color: red;
  }
  @media (max-width: 768px) {
    margin: 25% auto;
  }
  @media (max-width: 576px) {
    width: 100%;
    margin: 30% auto;
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

const Form = ({ showTransferForm, deductBalance }) => {
  const users = useSelector((state) => state.users.users);
  const [transferInfo, setTransferInfo] = useState({
    amount: 0,
    currency: '',
    recipient: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const recipients = users.slice(1, users.length);
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
    const { amount, currency, recipient } = transferInfo;
    if (!amount) {
      setError('Field cannot be empty');
      return;
    }
    if (!currency) {
      setError('Field cannot be empty');
      return;
    }
    if (!recipient) {
      setError('Field cannot be empty');
      return;
    }
    handlePreview(true);
  };
  const resetTransferInfo = () => {
    setTransferInfo({
      amount: 0,
      currency: '',
      recipient: ''
    });
  };

  const doTransfer = () => {
    deductBalance(Number(transferInfo.amount));
    resetTransferInfo();
    setShowPreview(false);
  };

  return (
    <>
      <FormWrapper onSubmit={handleTransferSubmit}>
        <DialogBox />
        {error && <p className="error">{error}</p>}
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
          <span>Recipient</span>
          <select
            value={transferInfo.recipient}
            name="recipient"
            onChange={handleInfoChange}
            required>
            <option defaultValue="Select recipient">Select currency</option>
            {recipients.map((recipient) => (
              <option value={`${recipient.fname} ${recipient.lname}`} key={recipient.id}>
                {recipient.fname}
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
  deductBalance: PropTypes.func
};
export default Form;
