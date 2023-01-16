import React, { useState } from "react";
import { LoginData } from "../../types/authentification/auth.type";
import { TextInput } from "../shared/inputs/TextInput";
interface LoginFormProps {
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
}
export const LoginForm = ({ loginData, setLoginData }: LoginFormProps) => {
  return (
    <section className="inputs-section">
      <TextInput
        name="email"
        label="Email"
        value={loginData.userName || ""}
        onChange={({ target: { value: userName } }) =>
          setLoginData({ ...loginData, userName })
        }
      />
      <TextInput
        name="password"
        label="Password"
        type={"password"}
        value={loginData.password || ""}
        onChange={({ target: { value: password } }) =>
          setLoginData({ ...loginData, password })
        }
      />
    </section>
  );
};
