import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Substance from './components/Substance';
import RegisteredWebinarsList from './components/Substance/Webinars/components/RegisteredWebinarsList/RegisteredWebinarsList';
import WebinarContextProvider from './components/Substance/Webinars/components/WebinarContextProvider';
import WebinarDetailed from './components/Substance/Webinars/components/WebinarDetailed/WebinarDetailed';
import { RoutePaths } from './routePath';

const routes = [
  {
    key: 'login',
    path: `/${RoutePaths.LOGIN}`,
    children: <LoginForm />,
  }, {
    key: 'main',
    path: `/${RoutePaths.MAIN}`,
    children: <Substance />,
  }, {
    key: 'webinar-page',
    path: `/${RoutePaths.WEBINAR}/:id`,
    children: <WebinarDetailed />,
  }, {
    key: 'registered',
    path: `/${RoutePaths.REGISTERED}`,
    children: <RegisteredWebinarsList />
  }]

function Main(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({
            key,
            path,
            children,
          }) => (
            <Route
              path={path}
              key={key}>
              <WebinarContextProvider>
              {path === `/${RoutePaths.LOGIN}` ? null : <Header />}
              {children}
              </WebinarContextProvider>
            </Route>
          ))}
        <Redirect to={RoutePaths.MAIN} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
