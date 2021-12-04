import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Form from '../component/form';
import WalletHeader from '../component/header';
import Tooltip from '../component/tooltip';
import { doFetchUsers } from '../store/wallet';
import illus from '../assets/illus.jpg';

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
  top: 20vh;
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
  top: 10vh;
  margin: 0 auto;
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
  if (arr.length === 5) return `${arr[0]}${arr[1]}k`;
  if (arr.length === 6) return `${arr[0]}${arr[1]}${arr[2]}k`;
  return '0';
};

const WalletPage = () => {
  const users = useSelector((state) => state.wallet.users);
  const dispatch = useDispatch();
  useEffect(() => dispatch(doFetchUsers()), [dispatch]);

  const [user, setUser] = useState({});
  const [transferFund, setTransferFund] = useState(false);

  useEffect(() => {
    if (users.length > 0) {
      setUser(users[0]);
    }
  }, [users]);

  const showTransferForm = (value) => {
    setTransferFund(value);
  };
  const roundedBalance = String(user.walletBalance).split('');

  const deductBalance = (amount) => {
    setUser({
      ...user,
      walletBalance: user.walletBalance - amount
    });
  };

  return (
    <Main>
      <WalletHeader firstName={user.fname} lastName={user.lname} />
      <InfoBox>
        <h3 className="main_head">Wallet</h3>
        <BalanceBox>
          <Text>Available Balance:</Text>
          <h3>
            {getRoundedBal(roundedBalance)}
            <Tooltip amount={user.walletBalance ?? 0} />
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
            balance={user.walletBalance}
          />
        ) : (
          <Empty onClick={() => showTransferForm(true)}>
            <p>Click to transfer funds</p>
          </Empty>
        )}
        <div className="image">
          <img src={illus} alt="photo" />
        </div>
      </Container>
    </Main>
  );
};
export default WalletPage;
