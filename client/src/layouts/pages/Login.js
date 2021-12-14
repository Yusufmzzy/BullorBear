import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "../imgs/Wall.jpg";
import { UserContext } from "./Context/UserContext";
// import { UserContext } from "./Context/userContext";
const Login = () => {
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  let history = useHistory();
  const initialState = {
    username: "",
    password: "",
  };
  const [logInData, setLogInData] = useState(initialState);
  const [errMessage, setErrMessage] = useState(null);
  const { setCurrentUser } = useContext(UserContext);
  const handleChange = (value, name) => {
    setLogInData({ ...logInData, [name]: value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setSubmissionStatus("pending");
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(logInData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          setSubmissionStatus("failed!");
          setErrMessage(data.message);
        } else {
          setSubmissionStatus("success!");
          setCurrentUser(data);
          sessionStorage.setItem("currentUser", JSON.stringify(data.body));
          history.push("/");
        }
      });
  };
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${image})`}}
    >
      <Container>
        <SigninContainer>
          <Theh1>BULL&BEAR</Theh1>
          <Form onSubmit={handleClick}>
            <lable for="Username">Username</lable>
            <input
              name="username"
              type="text"
              onChange={(ev) => handleChange(ev.target.value, "username")}
              required
            ></input>
            <Lable for="password">Password</Lable>
            <input
              name="password"
              type="password"
              onChange={(ev) => handleChange(ev.target.value, "password")}
              required
            ></input>
            <Checkboxdiv>
              <input type="checkbox" required />
              <label for="Terms and policy"> Terms and policy.</label>
            </Checkboxdiv>

            <Button type="submit">Submit</Button>
          </Form>
          <Accountcontainer>
            Dont have an account? Click <Link to="/Createuser">here.</Link>
          </Accountcontainer>
          {errMessage ? <p style={{ color: "red" }}>{errMessage}</p> : null}
        </SigninContainer>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Container = styled.div`
  height: 90%;
  width: 500px;
  opacity: 95%;
  box-shadow: 0 0 8px white;
  border-radius: 2px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const SigninContainer = styled.div`
  width: 90%;
  height: 90%;
  font-size: 25px;
`;
const Theh1 = styled.h1`
  width: 100%;
  margin-bottom: 50px;
  font-size: 50px;
`;
const Form = styled.form`
  display: grid;
  height: 70%;
`;
const Checkboxdiv = styled.div`
  display: flex;
  font-size: 15px;
  margin-top: 10px;
`;
const Button = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  margin-left: 70px;
  background-color: black;
  border-radius: 5px;
  color: white;
  font-size: 25px;
`;
const Lable = styled.label`
  margin-top: 35px;
`;
const Accountcontainer = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
`;
export default Login;
