import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const currencies = ['NGN', 'USD', 'EUR'];

const FormWrapper = styled.form`
  width: 500px;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  margin: 5% auto;
  box-shadow: 0px 4px 25px rgba(196, 196, 196, 0.25);
`;

const Label = styled.label`
  display: flex;
  flex-flow: column nowrap;
  margin:10px;
  & span {
    color: #333;
  }
  & input,select {
    padding: 10px;
    border-radius: 4px;
    border-color: #ccc;
    margin: 10px 0;
    font-size: 12px;
    -webkit-appearance:none;
  }
`;
const Form = () => {
  const users = useSelector((state) => state.users.users);
  const recipients = users.slice(1, users.length);
  return (
    <FormWrapper>
      <Label>
        <span>Amount</span>
        <input type="number" />
      </Label>
      <Label>
        <span>Currency</span>
        <select>
          {currencies.map((curr) => (
            <option value={curr} key={curr}>
              {curr}
            </option>
          ))}
        </select>
      </Label>
      <Label>
        <span>Recipient</span>
        <select>
          {recipients.map((recipient) => (
            <option value={recipient.id} key={recipient.id}>
              {recipient.fname}
            </option>
          ))}
        </select>
      </Label>
    </FormWrapper>
  );
};

export default Form;
