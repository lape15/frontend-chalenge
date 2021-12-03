import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Form from '../component/form';
import WalletHeader from '../component/header';
import Tooltip from '../component/tooltip';
import { doFetchUsers } from '../store/wallet';

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
  @media (max-width: 576px) {
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
    min-width: 10.71em;
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
const WalletPage = () => {
  const users = useSelector((state) => state.wallet.users);
  const dispatch = useDispatch();
  useEffect(() => dispatch(doFetchUsers()), [dispatch]);
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);
  const [transferFund, setTransferFund] = useState(false);

  useEffect(() => {
    if (users.length) {
      setBalance(users[0].walletBalance);
      setUser(users[0]);
    }
  }, [users]);

  const showTransferForm = (value) => {
    setTransferFund(value);
  };
  const roundedBalance = String(balance).split('');

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
            &#36;{`${roundedBalance[0]}${roundedBalance[1]}`}k
            <Tooltip amount={user.walletBalance} />
          </h3>

          <button onClick={() => showTransferForm(true)} disabled={transferFund}>
            Transfer funds
          </button>
        </BalanceBox>
      </InfoBox>
      {transferFund && (
        <Form
          showTransferForm={showTransferForm}
          deductBalance={deductBalance}
          balance={user.walletBalance}
        />
      )}
    </Main>
  );
};
export default WalletPage;
