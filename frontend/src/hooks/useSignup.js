import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const signup = async (fd) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: fd,
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  const updateUser = async (fd) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/single/${user.email}`, {
      method: "PUT",
      body: fd,
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setSuccess("User Updated !");
      dispatch({ type: "UPDATE_USER", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, updateUser, isLoading, error, success };
};
