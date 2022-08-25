import { AccountsContext } from "../context/AccountContext";
import { useContext } from "react";

export const useAccountContext = () => {
  const context = useContext(AccountsContext);

  if (!context) {
    throw Error("useAccountContext must be used inside an useAccountContext");
  }

  return context;
};
