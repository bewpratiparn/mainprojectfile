import React from "react";
import "./Notshowfood.css";
import { Box } from "@mui/material";

function Notshowfood() {
  const handleSuccess = () => {
    // เขียนโค้ดสำหรับการดำเนินการเมื่อคลิกปุ่ม success ที่นี่
    console.log("Success button clicked");
  };

  const handleCancel = () => {
    // เขียนโค้ดสำหรับการดำเนินการเมื่อคลิกปุ่ม cancel ที่นี่
    console.log("Cancel button clicked");
  };

  return (
    <Box className="white-background">
      <Box className="notshowfood">ไม่เเสดงรายการอาหาร</Box>
      <Box className="box-container">
        {/* ภาพอาหาร */}
        <img
          src={new URL("../../assets/images/notshowfood_bg.jpg", import.meta.url).href}
          className="picture-menu"
        />
        {/* ชื่ออาหาร */}
        <Box className="food-name">ชื่ออาหาร กระเพราหมูสับใส่ไข่</Box>
        {/* ช่อง checkbox */}
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
        />
      </Box>
      {/* ปุ่ม success และ cancel */}
      <Box className="grid-button">
        <button className="success-button" onClick={handleSuccess}>
          ยืนยัน
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          ยกเลิก
        </button>
      </Box>
    </Box>
  );
}

export default Notshowfood;
