import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import AccountDetails from "../components/AccountDetails";

const People = () => {
  const { user } = useAuthContext();
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const url = user ? `/api/user/users/${user.email}` : `/api/user/users`;

    const fetchUser = async () => {
      const response = await fetch(url);
      const json = await response.json();
      if (response.ok) {
        setAccounts(json);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        {accounts &&
          accounts.map((account) => (
            <AccountDetails key={account._id} account={account} />
          ))}
      </div>
    </div>
  );
};

export default People;
