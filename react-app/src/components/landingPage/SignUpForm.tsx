import React, { useState } from "react";
import { postNewUser } from "../../api/userApi";
import { SignUpData } from "../../types/authentification/auth.type";
import { MainButton } from "../shared/buttons/MainButton";
import { TextInput } from "../shared/inputs/TextInput";
interface SignUpFormProps {
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
}
export const SignUpForm = ({ setSignUpData, signUpData }: SignUpFormProps) => {
  //
  const onSignUpInputChanged = ({
    target: { name: key, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [key]: value,
    });
  };
  return (
    <section>
      <form action="">
        <TextInput
          label="Email"
          name="email"
          value={signUpData.email || ""}
          onChange={onSignUpInputChanged}
        />
        <TextInput
          label="User name"
          name="userName"
          value={signUpData.userName || ""}
          onChange={onSignUpInputChanged}
        />
        <TextInput
          label="Password"
          name="password"
          value={signUpData.password || ""}
          onChange={onSignUpInputChanged}
        />
        <TextInput
          label="Password confirmation"
          name="passwordConfirmation"
          value={signUpData.passwordConfirmation || ""}
          onChange={onSignUpInputChanged}
        />
        <MainButton text="Sign up" onClick={() => postNewUser(signUpData)} />
      </form>
    </section>
  );
};
