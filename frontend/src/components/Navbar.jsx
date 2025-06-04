import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <button onClick={() => dispatch(logout())} 
        style={{ marginLeft: "10px" }}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
