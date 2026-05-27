import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AuthService from "../../lib/authApi";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import CustomTextfield from "../../components/input/CustomTextfield";
import CustomTypography from "../../components/typography/CustomTypography";
import "./Login.css";
import { Box } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<any>({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthService.getProfile()
        .then((response) => setUser(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    AuthService.login(inputs.username, inputs.password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your username and password",
        });
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 5500,
    }).then(() => {
      navigate("/Home");
    });
  };

  const handleBackClick = () => {
    Swal.fire({
      title: "โปรดรอเเป๊บนึง",
      text: "เรากำลังพาท่านกลับไป",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();
      navigate("/Home");
    }, 2000); // Delay of 2 seconds
  };

  return (
    <Box className="bklogin">
      <Box className="outlineinlogin" onClick={handleBackClick}>
        <Icon icon="mdi:arrow-back" className="iconbacklogin" />
      </Box>
      <Box className="form-login">
        <form onSubmit={handleSubmit}>
          <CustomTypography value="Login" gold sx={{ fontSize: '2rem', mb: 3 }} rich={undefined} onClick={undefined} />

          <Box className="mb-4">
            <CustomTextfield
              label="Username"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </Box>
          <Box className="mb-4">
            <CustomTextfield
              label="Password"
              name="password"
              type="password"
              isPassword={true}
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </Box>
          <Box className="flex justify-center">
            <button
              className="w-48 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md"
              type="submit"
            >
              Login
            </button>
          </Box>
          <a href="/register" className="block text-center mt-5 text-amber-500 hover:text-amber-600">
            Register
          </a>
        </form>
      </Box>
      {/* {user && (
        <Box className="custom-profile-inpagelogin">
          <p className="text-center mb-2">Welcome, {user.username}</p>
          <Box className="flex justify-center items-center">
            <img
              src={user.picture}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          </Box>
          <button
            className="block ml- mt-9 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Box>
      )} */}
    </Box>
  );
}

export default Login;
