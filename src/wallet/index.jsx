import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import styled from 'styled-components';
import Form from '../component/form';
import WalletHeader from '../component/header';
import Tooltip from '../component/tooltip';
import { doFetchUsers } from '../store/wallet';
import { motion } from 'framer-motion';
import { fetchUserDetails } from '../store/user';

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 50px;
`;

export const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #333;
  position: relative;
  top: 10vh;
  padding: 1rem 20px;
  & .main_head {
    font-size: 1.5rem;
    font-weight: 700;
    padding: 2px 0.75rem;
  }
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const BalanceBox = styled.div`
  display: flex;
  & h3 {
    border: 1px solid #00e59e;
    background: #fff;
    padding: 2px 0.75rem;
    margin: 0 10px;
    border-radius: 2.78em;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    &:hover .tooltip {
      display: block;
    }
  }
  & button {
    font-size: 14px;
    background: #00e59e;
    border: 1px solid #00e59e;
    color: #18379a;
    text-transform: capitalize;
    border-radius: 2.78em;
    min-width: 70px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
  @media (max-width: 576px) {
    & h3 {
      font-size: 14px;
    }
    & button {
      padding: 2px;
      min-width: max-content;
      width: max-content;
    }
  }
`;

export const Text = styled.div`
  top: 10px;
  color: grey;
  font-size: 0.8rem;
  position: relative;
`;

const Empty = styled.div`
  width: 300px;
  padding: 20px;
  position: relative;
  margin: 0 auto;
  background: white;
  border: 1px solid #00e59e;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 25px rgba(196, 196, 196, 0.25);
  height: 130px;
  box-shadow: 0px 4px 25px rgba(196, 196, 196, 0.25);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  & p {
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  @media (max-width: 768px) {
    top: 12vh;
  }
  @media (max-width: 576px) {
    width: 70%;
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 100%;
  padding: 20px 5px;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  & .image {
    width: 450px;
    img {
      width: 100%;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
`;

const getRoundedBal = (arr) => {
  if (arr.length === 4) return `${arr[0]}k`;
  if (arr.length === 5) return `${arr[0]}${arr[1]}k`;
  if (arr.length === 6) return `${arr[0]}${arr[1]}${arr[2]}k`;
  if (arr.length)
    if (!arr.length) {
      return '0';
    }
};

const WalletPage = () => {
  const users = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [transferFund, setTransferFund] = useState(false);

  useEffect(() => {
    if (users !== null) {
      setUser(users);
    }
  }, [users]);

  useEffect(() => {
    batch(() => {
      dispatch(doFetchUsers());
      dispatch(fetchUserDetails());
    });
  }, [dispatch]);

  const showTransferForm = (value) => {
    setTransferFund(value);
  };
  const roundedBalance = String(user.balance).split('');

  const deductBalance = (amount) => {
    setUser({
      ...user,
      balance: user.balance - amount
    });
  };

  return (
    <Main>
      <WalletHeader firstName={user.firstName} lastName={user.lastName} />
      <InfoBox>
        <h3 className="main_head">Wallet</h3>
        <BalanceBox>
          <Text>Available Balance:</Text>
          <h3>
            {getRoundedBal(roundedBalance)}
            <Tooltip amount={user.balance ?? 0} />
          </h3>

          <button onClick={() => showTransferForm(true)} disabled={transferFund}>
            Transfer
          </button>
        </BalanceBox>
      </InfoBox>
      <Container>
        {transferFund ? (
          <Form
            showTransferForm={showTransferForm}
            deductBalance={deductBalance}
            balance={user.balance}
          />
        ) : (
          <Empty
            onClick={() => showTransferForm(true)}
            as={motion.div}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}>
            <p>Click to transfer funds</p>
          </Empty>
        )}
      </Container>
    </Main>
  );
};
export default WalletPage;
