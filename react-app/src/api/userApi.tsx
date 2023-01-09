import React, { useState } from "react";

interface User {}
const useUser = () => {
  const [user, setUser] = useState<User>({});
  return {
    user,
    setUser,
  };
};
const authenticateUser = async ({
  password,
  userName,
}: {
  password: string;
  userName: string;
}) => {
  const response = (
    await fetch("http://localhost:5000/connection", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
  ).json();

  return response;
};
export const Test = () => {
  const { setUser, user } = useUser();
};
