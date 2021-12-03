import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  dispaly: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  z-index: 1005;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: transparent;
  @media (max-width: 576px) {
    padding: 10px;
  }
`;
const Container = styled.div`
  width: 500px;
  margin: 10% auto;
  display: flex;
  flex-flow: column nowrap;
  background: white;
  height: 300px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  & h2 {
    font-size: 14px;
    color: #18379a;
    margin: 10px;
  }
  div {
    display: flex;
    justify-content: flex-end;
    button {
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
  }
  @media (max-width: 576px) {
    width: 100%;
    margin: 25% auto;
  }
`;

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');

    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<ModalWrapper>{children}</ModalWrapper>, elRef.current);
};

const ModalComponent = ({ show, handlePreview }) => {
  if (!show) return null;
  return (
    <Modal>
      <Wrapper>
        <Container>
          <h2>You are about to send 20,000 to Jane ricker</h2>

          <div>
            <button onClick={() => handlePreview(false)} className="cancel">
              Cancel
            </button>
            <button>Send</button>
          </div>
        </Container>
      </Wrapper>
    </Modal>
  );
};

ModalComponent.propTypes = {
  show: PropTypes.bool,
  handlePreview: PropTypes.func
};

export default ModalComponent;
