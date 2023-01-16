import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { LoginData, SignUpData } from "../types/authentification/auth.type";
import { User } from "../types/user/user.type";
import { functionalFetch } from "./fetch/fetch";

const login = async (credentials: LoginData) => {
  const authentification = await fetch(
    "http://localhost:5000/users/connection",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials }),
    }
  );
  const data = await authentification.json();
  if (data.error) {
    alert("AUTH ERROR");
    return false;
  }
  sessionStorage.jwt = data.token;
  return true;
  //return redirect("http://localhost:3000/user");
};

const postNewUser = async (userData: SignUpData) => {
  const data = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { ...userData } }),
  });
  console.log(data.json());
};

const useUserData = (): [User, () => void] => {
  const [userData, setUserData] = useState<User>({} as User);
  const token = sessionStorage.jwt;
  const updateUserData = async () => {
    const response = await functionalFetch({
      method: "GET",
      url: "/users/x",
    });
    setUserData(response.user);
  };
  useEffect(() => {
    updateUserData();
  }, []);
  return [userData, updateUserData];
};

export { login, postNewUser, useUserData };
