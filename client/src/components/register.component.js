import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
export default function Register() {
  const [formState,setFormState]=useState({
      username: "",
      password: "",
      successful:false,
      message: ""
  });
  const navigate=useNavigate();

  useEffect(() =>{
    const user=AuthService.getCurrentUser();
    if(user){
      return navigate("/home");
    }
  },[navigate]);
  function handleInput(e){
    const {name,value}=e.target;
    setFormState(preState=>{
      return {
        ...preState,
        [name]:value
      }
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    setFormState(preState=>{
      return {
        ...preState,
        message: "",
        successful: false
      }
    })
    AuthService.register(formState.username,formState.password).then(res=>{
      console.log(res);
      setFormState(preState=>{
        return {
          ...preState,
          message: res.data.message,
          successful: true
        }
      })
    },err=>{
      console.log(err);
      setFormState(preState=>{
        return {
          ...preState,
          message: err.response.data.message,
          successful: false
        }
      })
    });

  }
  return (
    <div className="col-md-12">
    <div className="card card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
      <form onSubmit={handleSubmit}>
      {!formState.successful && ( 
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formState.username}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formState.password}
                    onChange={handleInput}
              />
            </div>
            <div className="form-group text-center">
    
            <button className="btn btn-primary btn-block">Sign Up</button>
    
           
            </div>
          </div>
        )}
       {formState.message && (
          <div className="form-group">
            <div
              className={
                formState.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {formState.message}
            </div>
          </div>
        )}
      </form>
    </div>
  </div>

  );
}