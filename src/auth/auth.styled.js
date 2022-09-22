import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2.5rem 4rem;
  background: #d3d0e0;
  color: #fff;
  border: 1px solid green;
`;

export const AuthCon = styled.div`
  width: 100%;
  display: flex;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  height: 100%;
`;

export const Col = styled.div`
  flex: 1;
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Col2 = styled(Col)`
  background: #f3f4f8;
  align-items: center;
  padding: 1.5rem 5rem;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 50%;
    z-index: 2;
    bottom: 0;
    // background: rgba(242, 243, 247, 0.5);
    background: #dddde9;
    filter: blur(20px);
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  width: 100%;
`;
export const Label = styled.label`
  width: 100%;
  color: #acaeb4;
  margin: 10px 0;
  font-size: 14px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  color: #c3c6ca;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: white !important;
  margin-block-start: 5px;
  &[type='password'] {
    background-color: white !important;
  }
  &[type='email'] {
    background-color: white !important;
  }
  input[type='password']:focus {
    outline: 0;
  }
`;

export const BtnCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const Btn = styled.button`
  background: #8057d9;
  color: #ebe0f9;
  font-size: 14px;
  padding: 8px;
  text-align: center;
  width: 100%;
  border-radius: 4px;
  border-color: #8057d9;
  border: none;
  cursor: pointer;
`;

export const GoogleBtn = styled(Btn)`
  background: #fff;
  color: #686f7d;
  border: 1px solid #ccc;
`;

export const Ball = styled.div`
  height: 20vh;
  width: 20vh;
  background: #8057d9;
  border-radius: 50%;
`;

export const OtherWrapper = styled.div`
  margin-block-start: 15px;

  & a {
    font-size: 16px;
    color: #8057d9;
  }
`;
export const Other = styled.p`
  font-size: 16px;
  color: #686f7d;
`;
