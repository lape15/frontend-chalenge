import styled from 'styled-components';
import { Logo } from './logo';

const Header = styled.header`
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  background: #fff;
  box-shadow: 4px 6px 50px rgba(0, 0, 0, 0.1);
`;
const NameWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

const WalletHeader = (props) => {
  console.log({ props });
  return (
    <Header>
      <a>
        <Logo />
      </a>
      <NameWrapper>
        <div>Aa</div>
        <div>Jane Does</div>
      </NameWrapper>
    </Header>
  );
};

export default WalletHeader;
