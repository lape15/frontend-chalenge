import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ToolTipWrapper = styled.div`
  display: none;
  position: absolute;
  z-index: 12;
  font-weight: 100;
  line-height: 1.3em;
  margin: 0;
  padding: 20px;
  background: #fff;
  border: 1px solid rgba(0, 149, 186, 0.3);
  color: #000;
  border-radius: 2px;
  font-weight: 600;
  transition: all 0.3s;
  text-align: center;
  font-size: 0.9rem;
  box-shadow: 0px 4px 12px 0px rgba(0, 229, 158, 0.1);
  width: max-content;
  right: 0;
  top: 45px;
  left: 0;
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px;
    border-color: white transparent transparent white;
    transform: rotate(45deg);
    top: -5px;
    left: 18px;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    border-radius: 1px 0px 0px 0px;
    box-shadow: -1px -1px 0 0 rgba(0, 149, 186, 0.3);
  }
  @media (max-width: 576px) {
    left: -20px;
  }
`;

export const Text = styled.div`
  top: 10px;
  color: #748cad;
  font-size: 0.8rem;
`;
const Tooltip = ({ amount }) => {
  return (
    <ToolTipWrapper className="tooltip">
      <Text>Balance: &#36;{amount?.toLocaleString()}</Text>
    </ToolTipWrapper>
  );
};

Tooltip.propTypes = {
  amount: PropTypes.number
};
export default Tooltip;
