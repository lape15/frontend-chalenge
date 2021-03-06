import React from 'react';
import styled from 'styled-components';
import { Logo } from './logo';
import PropTypes from 'prop-types';

const Header = styled.header`
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  background: #fff;
  box-shadow: 4px 6px 50px rgba(0, 0, 0, 0.1);
  height: 80px;
  align-items: center;
  & a.logo {
    width: auto;
  }
`;
const NameWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  & div {
    margin: 0 5px;
    &.short{
     height: 24px;
     min-width: 24px;
     width: 24px;
    background-color: #00e59e;
    border-color: #00e59e;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    }
  }
`;

const WalletHeader = (props) => {
  const { firstName, lastName } = props;
  const first = firstName && firstName.split('');
  const last = lastName && lastName.split('');

  return (
    <Header>
      <a className="logo">
        <Logo />
      </a>
      <NameWrapper>
        {firstName && lastName ? (
          <div className="short">
            {first[0]}
            {last[0]}
            {/* JD */}
          </div>
        ) : (
          <div className="short">N/A</div>
        )}

        <div>
          {firstName} {lastName}
        </div>
      </NameWrapper>
    </Header>
  );
};
WalletHeader.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

export default WalletHeader;
