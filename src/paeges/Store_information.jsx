import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Store_information.css";
import { Link } from "react-router-dom";


function Store_information() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shopId = searchParams.get("shop_id");
  const shopName = searchParams.get("shop_name");
  const shopPicture = searchParams.get("shop_picture");
  const shopLocation = searchParams.get("shop_location");
  const shopPhone = searchParams.get("shop_phone");
  const shopTime = searchParams.get("shop_time");
  const shopText = searchParams.get("shop_text");

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch food items data from an API endpoint
    axios.get("http://127.0.0.1:8000/show_all_food/?shop_id=${shopId}")
      .then(response => {
        // Filter food items by shop_id
        const filteredFoodItems = response.data.filter(item => item.shop_id === parseInt(shopId));
        setFoodItems(filteredFoodItems);
      })
      .catch(error => {
        console.error("Error fetching food items:", error);
      });
  }, [shopId]);



  return (
    <>
    <div className="bk">
    <div>
      <img src={shopPicture} className="image-store" />
      </div>
      <div className="store-name">ชื่อร้านค้า : {shopName}</div>
      <div className="containner-description">
        
        <div className="containner-box">
          <div className="colorinside">
            
            <label htmlFor="description">Description</label>

            <div className="location">สถานที่ ชื่อสถานที่ : {shopLocation}</div>
            <div className="phone">เบอร์ติดต่อ : {shopPhone} </div>
            <div className="time">วันเวลาเปิด-ปิด : {shopTime}</div>
            <div className="symbol">ตราสัญลักษณ์ : {shopText}</div>
          </div>
        </div>
      </div>

      {foodItems.map((item, index) => (
        <Link to="/Fooddetails">
        <div className="grid-container" key={index}>
          <div className="grid-item">
            <img
              src={item.Food_picture}
              className="picture-menu"
              alt={`รูปภาพของ ${item.Food_picture}`}
            />
            <button href="Detailfood">
              <div>ชื่ออาหาร : {item.Food_name}</div>
              <div>ราคา : {item.Food_Price} บาท</div>
            </button>
          </div>
        </div>
        </Link>
      ))}
      </div>
    </>
  );
}

export default Store_information;