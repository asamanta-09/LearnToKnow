import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Homepage</h1>
      <Link to="/students/login" style={{ fontSize: "18px", color: "blue" }}>
        Student Login
      </Link><br /><br />
      <Link to="/teachers/login" style={{ fontSize: "18px", color: "blue" }}>
        Teachers Login
      </Link>
    </div>
  );
}

export default Home;
