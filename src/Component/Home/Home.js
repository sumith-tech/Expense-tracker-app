import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>
      <p>
        Your profile is incomplete <Link to={'/update'}>Complete now</Link>
      </p>
    </div>
  );
};
export default Home;
