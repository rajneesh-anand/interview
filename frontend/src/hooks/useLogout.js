import { useAuthContext } from "./useAuthContext";
import { useAccountContext } from "./useAccountContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useAccountContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
