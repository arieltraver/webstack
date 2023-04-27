import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink, useNavigate } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null);

  //logout function
  async function logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }, )
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setUsername(data.username): null)
  }, [])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
       </button>
      { username ?
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
            <NavLink className="nav-link" to="/">
              View Records
            </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create Record
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to={"/u/" + username}>
               Profile
             </NavLink>
           </li>
           <div onClick={logout}Logout></div>
         </ul>
       </div>
      :
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                View Records
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Record
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li> 
          </ul>
      </div>
      }
    </nav>
   </div>
 )
}