import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "../imgs/Money.jpg"
const CreateUser = () => {
  let history = useHistory();
  const initialState = {
    email: "",
    username: "",
    password: "",
    securityquestionanswer: "",
    confirmpassword: "",
    securityquestion: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errMessage, setErrMessage] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setSubmissionStatus("pending");
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
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
          setSubmissionStatus("Success!");
        }
      });
  };
  // const {
  //   email,
  //   username,
  //   password,
  //   securityquestionanswer,
  //   confirmpassword,
  //   securityquestion,
  // // } = req.body;

  return (
    <Wrapper       style={{
      backgroundImage: `url(${image})`}}>
      <Container>
        <CreateUsercontainer>
          <h3>Bull&BEAR</h3>
          <Form onSubmit={handleClick}>
            <lable for="Username">Username</lable>
            <input
              name="username"
              type="text"
              required
              onChange={(ev) => handleChange(ev.target.value, "username")}
            ></input>
            <lable for="Email">Email</lable>
            <input
              name="email"
              type="text"
              required
              onChange={(ev) => handleChange(ev.target.value, "email")}
            ></input>
            <label for="password">Password</label>
            <input
              name="password"
              type="password"
              required
              onChange={(ev) => handleChange(ev.target.value, "password")}
            ></input>
            <label for="password">Confirm password</label>
            <input
              name="password"
              type="password"
              required
              onChange={(ev) =>
                handleChange(ev.target.value, "confirmpassword")
              }
            ></input>
            <label for="Security questions">Choose a security question:</label>
            <select
              onChange={(ev) =>
                handleChange(ev.target.value, "securityquestion")
              }
              name="questions"
            >
              <option value=""></option>
              <option value="In what city were you born?">
                In what city were you born?
              </option>
              <option value="What is the name of your favorite pet?">
                What is the name of your favorite pet?
              </option>
              <option value="What is your mother's maiden name?">
                What is your mother's maiden name?
              </option>
              <option value="What high school did you attend?">
                What high school did you attend?
              </option>
              <option value="What is the name of your first school?">
                What is the name of your first school?
              </option>
              <option value="What was the make of your first car?">
                What was the make of your first car?
              </option>
              <option value="What was your favorite food as a child">
                What was your favorite food as a child?
              </option>
              <option value="Where did you meet your spouse?">
                Where did you meet your spouse?
              </option>
            </select>
            <lable for="answer">Your answer:</lable>
            <input
              name="answer"
              type="text"
              required
              onChange={(ev) =>
                handleChange(ev.target.value, "securityquestionanswer")
              }
            ></input>
            {errMessage ? <p style={{ color: "red" }}>{errMessage}</p> : null}
            <Button type="submit">Submit</Button>
            {submissionStatus === "Success!" ? (
              <p>
                {submissionStatus} want to go back and sign in with your new
                Account? Click <Link to="/Login">here.</Link>
              </p>
            ) : null}
          </Form>
        </CreateUsercontainer>
      </Container>
    </Wrapper>
  );
};
const Button = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  margin-left: 60px;
  margin-top: 10px;
  background-color: black;
  border-radius: 5px;
  color: white;
  font-size: 25px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 8px black;
`;
const Container = styled.div`
  height: 90%;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:white;
  opacity: 95%;
  box-shadow: 0 0 8px white;
`;
const CreateUsercontainer = styled.div`
  height: 90%;
`;
const Form = styled.form`
  margin-top: 15px;
  width: 250px;
  display: grid;
  height: 90%;
`;
export default CreateUser;
