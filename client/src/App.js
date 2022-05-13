import './App.css';
import {useState,useEffect} from "react";
import Register from "./components/register.component";
import Login from "./components/login.component";
import { Routes, Route, Link,useNavigate } from "react-router-dom";
import AuthService from './services/auth.service';
import HomeApp from "./components/home.component";
import NoteIcon from '@mui/icons-material/Note';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [currentUser,setCurrentUser] = useState({});
  const history = useNavigate();
  useEffect(() =>{
      const user=AuthService.getCurrentUser();
      if(user){
        setCurrentUser(user);
      }
  },[history]);
  function logOut(){
    
    AuthService.logout();
    setCurrentUser({});
  }
  return (
      <div>
          <nav className="navbar navbar-expand ">
            <Link to={"/home"} className="navbar-brand"><h1><NoteIcon />NOTE APP</h1></Link>
          {currentUser.username ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                 <h5 className="welcomeText">Welcome, {currentUser.username}</h5>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link " onClick={logOut}>
                  <h5>LogOut</h5>
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto ">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link ">
                  <h5>Login</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link ">
                  <h5>Sign Up</h5>
                </Link>
              </li>
            </div>
          )}
          </nav>
          <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={currentUser.username?<HomeApp/>:<Login/>} />
            <Route exact path="/home" element={<HomeApp/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
          </Routes>
        </div>
      </div>
  );
}
 
export default App;