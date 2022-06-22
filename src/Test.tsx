import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";

const Test = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      <div>Test Public Route</div>
      Link : <Link to="/test1">Test1</Link>
    </>
  );
};
export default Test;
