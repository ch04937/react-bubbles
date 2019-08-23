import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import './loginPage.css';

function Login ({ errors, touched, vaules, status}) {
  const [users, setUsers] = useState({username: '', password:''});
  useEffect(() => {
    if (status) {
      axios 
        .get('http://localhost:5000/api/login')
        .then(res => setUsers(res.data))
        .catch(err => console.log('erroe', err))
        setUsers([...users, status]);
    }
  }, [status])
  const handleChange = e => {
    setUsers({...users, [e.target.name]: e.target.vaule})
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', users)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload)
      })
      .catch(err => console.log(err.response))
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    return (
      <div className='login-page'>
        <h1>Welcome to the Bubble App!</h1>
        <Form onSubmit={handleSubmit}>
        <p>Build a login page here</p>
        <div className= 'form-field'>  
          {touched.username && errors.username && <p>{errors.username}</p>}
          Username: 
          <Field 
          type="text" 
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={users.username}
          />
        </div>
        <div className= 'form-field'>
          {touched.password && errors.password && <p>{errors.password}</p>}
          Password: 
          <Field 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange}
          value={users.password}
          />
        </div>
          <button
            className= 'button'
            type= 'submit'
            >Login</button>

        </Form>
      </div>
    )

  }

const FormikLogin = withFormik({
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
  handleSubmit(values, {resetForm, setSubmitting, setStatus}){
      console.log(values);
      axios
          .post('http://localhost:5000/', values)
          .then(res => {
              setStatus(res.data)
              resetForm();
              setSubmitting(false);
          })
          .catch(err => {
              console.log(err.response); 
              setSubmitting(false);
              });
          
  }

})(Login);

export default FormikLogin;
