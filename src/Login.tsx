import { initialUserState, UserContext, userReducer } from "./userContext";
import React, { useContext, useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const userContext = useContext(UserContext);

  //const { state } = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let postFormData = {} as any;
    formData.forEach((value, key) => {
      postFormData[key] = value;
    });

    window.localStorage.setItem("accessToken", "accessToken");

    if (postFormData.username === "user81") {
      try {
        userContext.userDispatch({
          type: "login",
          payload: { user: postFormData, accessToken: "accessToken" },
        });
        setTimeout(() => {
          navigate("test");
        }, 2000);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="Username"
          name="username"
          placeholder="Name"
          required
          autoComplete="off"
        />
        <input
          type="password"
          id="Email"
          name="password"
          placeholder="password"
          required
          autoComplete="off"
        />
        <span>
          <button type="submit">Login</button>
        </span>
      </form>
      Link : <Link to="test1">Test1</Link>
    </>
  );
};
export default Login;
