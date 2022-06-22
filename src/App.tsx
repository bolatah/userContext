import React, { FC, useContext, useEffect, useReducer, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  initialUserState,
  UserContext,
  UserContextProvider,
  userReducer,
} from "./userContext";
import { IRoute } from "./route";
import Login from "./Login";
import Test from "./Test";
import AuthRoute from "./AuthRoute";
import Test1 from "./Test1";
import ErrorHandling from "./Error";

const App: FC = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
  });

  const CheckLocalStorageForCredentials = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      userDispatch({ type: "logout", payload: initialUserState });
    } else if (accessToken === userState.accessToken) {
      userDispatch({
        type: "login",
        payload: { user: userState.user, accessToken },
      });
    } else {
      userDispatch({ type: "logout", payload: initialUserState });
    }
  };
  // const publicRoutes: IRoute[] = [
  //   {
  //     path: "*",
  //     auth: false,
  //     component: Error,
  //     name: "Error",
  //   },
  //   {
  //     path: "/",
  //     auth: false,
  //     component: Login,
  //     name: "Login",
  //   },
  //   {
  //     path: "/err",
  //     auth: false,
  //     component: Error,
  //     name: "Error",
  //   },
  // ];

  // const privateRoutes: IRoute[] = [
  //   { path: "/test", auth: true, component: Test, name: "Test" },
  // ];

  // const routes: IRoute[] = [...publicRoutes, ...privateRoutes];

  const userContextValues = {
    userState,
    userDispatch,
  };

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="test"
          element={
            <AuthRoute>
              <Test />
            </AuthRoute>
          }
        />
        <Route
          path="test1"
          element={
            <AuthRoute>
              <Test1 />
            </AuthRoute>
          }
        />
        <Route path="errorHandling" element={<ErrorHandling />} />
        <Route path="*" element={<Login />} />
        {/* {routes.map((route, index) => {
          if (route.auth) {
            <Route
              key={index}
              path={route.path}
              element={
                <AuthRoute>
                  <route.component />
                </AuthRoute>
              }
            />;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })} */}
      </Routes>
    </UserContextProvider>
  );
};
export default App;
