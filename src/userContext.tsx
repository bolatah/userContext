import { defaultAccessToken, defaultUser, IUser } from "./user";
import { Dispatch, createContext } from "react";

export interface IUserState {
  user?: IUser;
  accessToken: string;
}

export interface IUserActions {
  type: "login" | "logout" | "authenticate";
  payload: { user?: IUser; accessToken: string };
}

export const initialUserState: IUserState = {
  user: defaultUser,
  accessToken: defaultAccessToken,
};

export const userReducer = (state: IUserState, action: IUserActions) => {
  let user = action.payload.user;
  let accessToken = action.payload.accessToken;
  switch (action.type) {
    case "login":
      localStorage.setItem("accessToken", accessToken);
      return { user, accessToken };
    case "logout":
      localStorage.removeItem("accessToken");
      return initialUserState;
    default:
      return state;
  }
};

export interface IUserContextProps {
  userState: IUserState;
  userDispatch: Dispatch<IUserActions>;
}

export const UserContext = createContext<IUserContextProps>({
  userState: initialUserState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
