import React from "react";
import { useState } from "react";
import { MainButton } from "./components/shared/buttons/MainButton";
import { TextInput } from "./components/shared/inputs/TextInput";
import "./scss/main.scss";
import "./scss/app.scss";
import { login } from "./api/userApi";
import { SignUpData, LoginData } from "./types/authentification/auth.type";
import { SignUpForm } from "./components/landingPage/SignUpForm";
import { LoginForm } from "./components/landingPage/LoginForm";
import { Navigate } from "react-router-dom";
export const App = () => {
  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);
  const [signUpData, setSignUpData] = useState<SignUpData>({} as SignUpData);
  const [displaySignUpForm, setDisplaySignUpForm] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const authentification = async () => {
    const auth = await login(loginData);
    console.log(auth);
    if (auth === true) setAuth((prev) => !prev);
  };
  return (
    <div className="landing-page">
      <header className="landing-page-header">
        <h1>Personal task board</h1>
      </header>
      <main>
        {displaySignUpForm ? (
          <SignUpForm setSignUpData={setSignUpData} signUpData={signUpData} />
        ) : (
          <React.Fragment>
            <LoginForm loginData={loginData} setLoginData={setLoginData} />
            <section className="buttton-section">
              <MainButton text="Log in" onClick={() => authentification()} />
              <div>OR</div>

              <MainButton
                text="Sign up"
                onClick={() => setDisplaySignUpForm((prev) => !prev)}
              />
            </section>
          </React.Fragment>
        )}
      </main>
      {auth ? <Navigate to={"/user"} /> : null}
    </div>
  );
};
