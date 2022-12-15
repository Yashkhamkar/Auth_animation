import React, { useState } from "react";
import * as Components from "./Components";
import "./styles.css";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
const Mainz = () => {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const register = (e) => {
    e.preventDefault();
    if (!name || !email || !pass) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    } else if (pass !== cpass) {
      return swal({
        text: "Passwords are not matching",
        icon: "warning",
      });
    } else {
      fetch(`http://localhost:9002/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          pass,
        }),
      }).then(function (response) {
        if (response.status === 404) {
          swal("Sign Up Failed", "User already exists", "error");
        } else if (response.status === 201) {
          swal("YaY", "Sign Up successfull", "success");
          navigate("/mynotes");
        } else {
          swal("Sign Up Failed", "User not found", "error");
        }
      });
    }
  };
  const login = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    }
    fetch(`http://localhost:9002/api/user/login `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    }).then(function (response) {
      if (response.status === 200) {
        swal("YaY", "Login successfull!!!", "success");
        localStorage.setItem("userInfo", JSON.stringify({ email, pass }));
        navigate("/mynotes");
      } else {
        swal("Login failed", "Invalid email or password", "error");
      }
    });
  };
  return (
    <div className="body1">
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="pass"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <i className="fa fa-eye password-icon"></i>
            <Components.Input
              type="password"
              placeholder="Confirm Password"
              name="cpass"
              value={cpass}
              onChange={(e) => {
                setCpass(e.target.value);
              }}
            />
            <Components.Button onClick={register}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={login}>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Already registered!</Components.Title>
              <Components.Paragraph>
                Then please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, There!</Components.Title>
              <Components.Paragraph>
                New here then please Sign-Up
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Mainz;
