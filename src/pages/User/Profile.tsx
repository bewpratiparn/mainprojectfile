import {useState,useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ButtonOr } from 'semantic-ui-react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box } from "@mui/material";

function Profile() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
 


  useEffect(() => {
  const token = localStorage.getItem('Token')
  const myHeaders = new Headers();  
  myHeaders.append("Authorization", "Bearer " + token);
  
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("https://www.melivecode.com/api/auth/user", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.status === 'ok') {
        setUser(result.user)
        setIsLoaded(false)
      } else if (result.status === 'forbidden') {
        MySwal.fire({
          html: <i>{result.message}</i>,
          icon: 'error',
        }).then((value) => {
          Navigate('/')
        })
    }
      console.log(result)
    })
    .catch(error => console.log('error',error));
}, [])

const logout = () => {
  localStorage_removeItem('token')
  Navigatea('/')
}
if (isLoaded) return (<Box>Loading</Box>)
else {
    return (
      <Box>
          <Box>{user.id}</Box>
          <Box>{user.fname}</Box>
          <Box>{user.lname}</Box>
          <Box>{user.username}</Box>
          <Box>{user.email}</Box>
          <Box><img src={user.avatar} alt={user.id} width={100}/></Box>
          <Box><button onClick={logout}>logout</button></Box>
      </Box>
      )
  }
}


export default Profile;