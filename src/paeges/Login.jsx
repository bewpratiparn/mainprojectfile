import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Navigate, useNavigate } from 'react-router-dom';


function Login() {
  const Navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  
  const [input, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": input.username,
      "password": input.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/docs#/default/login_Login__post", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log(result);
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then((value)=>{
            localStorage.setItem('token', result.accessToken)
            Navigate('/Home')
          })
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon:'error'
          })
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error appropriately, show error message to user, etc.
      });
  }

  return (
    <div className="flex justify-center  items-center-top h-screen  bg-gray-100 ">
      <div className="bg-white-screen p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  text-gray-700 text-sm font-bold mb-2">
              Enter ID
            </label>
            <input
              className="w-full p-2 border rounded-md"
              name="username"
              type="text"
              value={input.username || ""}
              onChange={handleChange}
              placeholder="ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Enter Password
            </label>
            <input
              className="w-full p-2 border rounded-md"
              name="password"
              type="password"
              placeholder="********"
              value={input.password || ""}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
