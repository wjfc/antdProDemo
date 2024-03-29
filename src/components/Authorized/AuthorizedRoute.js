import React from 'react';
import { Route, Redirect } from 'umi';
import Authorized from './Authorized';

// TODO: umi只会返回render和rest
const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => {
  // console.log(Component);
  return (
    <Authorized
      authority={authority}
      noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
    >
      <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
    </Authorized>
  );
};

export default AuthorizedRoute;
