import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/login/login_hook';

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>; // Acepta un componente React como prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
