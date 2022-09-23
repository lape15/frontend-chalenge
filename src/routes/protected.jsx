import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div``;

const ProtectedRoute = (props) => {
  const { allowed, redirectPath, children } = props;

  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <Container>{children}</Container> : <Outlet />;
};

ProtectedRoute.propTypes = {
  allowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.func])
};
export default ProtectedRoute;
