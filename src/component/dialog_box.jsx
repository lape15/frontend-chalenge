import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Box = styled.div`
  width: 100%;
  padding: 10px;
  position: absolute;
  top: -10%;
  & h4 {
    font-size: 14px;
    color: #333;
  }
`;

const DialogBox = () => {
  const conversionRate = useSelector((state) => state.wallet.conversionRate);
  const currency = useSelector((state) => state.wallet.currency);
  if (conversionRate !== null && currency) {
    return (
      <Box>
        <h4>
          The conversion rate from 1 USD to 1 {currency} is &nbsp;
          {conversionRate[currency]}
        </h4>
      </Box>
    );
  }
  return null;
};

export default DialogBox;
