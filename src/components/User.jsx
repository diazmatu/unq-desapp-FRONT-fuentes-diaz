import React from "react";

export const User = ({ name, lastName, reputation, operations}) => {

  /*const [hour, setHour]= useState("")

  useEffect(() => {
      setHour(date.substr(date.length - 8))
  }, [setHour])*/

  return (
    <div className="card text-center">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <h5 className="card-title">{lastName}</h5>
        <p className="card-text">
          Cripto Name: {reputation}
        </p>
        <button href="#" className="btn btn-primary" disabled={true}>Buy</button>
      </div>
      <div className="card-footer text-muted">Last update: {operations}</div>
    </div>
  );
};

export default User;
