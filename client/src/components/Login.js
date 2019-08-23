import React from "react";
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup';

import './loginPage.css';

function Login ({ errors, touched}) {
      
      // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='login-page'>
        <h1>Welcome to the Bubble App!</h1>
        <Form >
        <p>Build a login page here</p>
        <div className= 'form-field'>  
          Username: 
          <Field 
          type="text" 
          name="username"
          placeholder="Username"
          />
          {touched.username && errors.username && <p>{errors.username}</p>}
        </div>
        <div className= 'form-field'>
          Password: 
          <Field 
          type="password" 
          name="password" 
          placeholder="Password" 
          />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
          <button
            className= 'button'
            type= 'submit'
            >Login</button>

        </Form>
      </div>
    )

  }
  
const FormikLogin = withRouter(withFormik({
  mapPropsToValues({ username, password }) {
    return{
          username: username || '',
          password: password || '',
        };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required'),
    
  }),
  
  handleSubmit(users, {props}){
      console.log(users);
      axios.post('http://localhost:5000/api/login', users)
          .then(res => {
            console.log('login from ',res);
            localStorage.setItem('token', res.data.payload)
            props.history.push('/colors')
          })
          .catch(err => console.log(err.response));
          
  }
})(Login))



export default FormikLogin;
