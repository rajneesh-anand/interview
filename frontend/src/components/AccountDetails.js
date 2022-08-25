import moment from "moment";
import monthsToYears from "date-fns/monthsToYears";
import { Buffer } from "buffer";
const AccountDetails = ({ account }) => {
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    return (
      today.getMonth() -
      birthDate.getMonth() +
      12 * (today.getFullYear() - birthDate.getFullYear())
    );
  };
  return (
    <div className="col-lg-3">
      <div className="card mb-1">
        <img
          src={`data:${account.photo.contentType};base64, ${Buffer.from(
            account.photo.data.data
          ).toString("base64")} `}
          className="card-img-top"
          alt={account.name}
          height="232"
        />
        <div className="card-body">
          <h5 className="card-title text-center">{account.name}</h5>

          {getAge(account.dateofbirth) >= 12 ? (
            <p className="card-text text-center">
              {monthsToYears(getAge(account.dateofbirth))} Years
            </p>
          ) : (
            <p className="card-text text-center">
              {getAge(account.dateofbirth)} Months
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
