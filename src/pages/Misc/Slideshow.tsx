import React, { useState, useEffect } from 'react';
import FoodService from '../../lib/foodApi';
import './Slideshow.css'; // Import CSS file or add styles inline
import { Box } from "@mui/material";

function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลร้านอาหารจาก API
    FoodService.getAllFood()
      .then(response => {
        setSlidesData(response.data);
        showSlides(slideIndex);
      })
      .catch(error => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านอาหาร:", error);
      });
  }, [slideIndex]); // รวม slideIndex ใน dependency array

  function plusSlides(n) {
    let newIndex = slideIndex + n;
    const totalSlides = slidesData.length;
    if (newIndex > totalSlides) {
      setSlideIndex(1); // กลับไปที่ slide แรกเมื่อมาถึง slide สุดท้าย
    } else if (newIndex < 1) {
      setSlideIndex(totalSlides); // ไปที่ slide สุดท้ายเมื่อมาถึง slide แรก
    } else {
      setSlideIndex(newIndex);
    }
  }

  function currentSlide(n) {
    setSlideIndex(n);
  }

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // ซ่อน slides ทั้งหมดและลบคลาส active ออกจาก dots
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // แสดง slide ตาม index ที่กำหนด
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
  }

  return (
    <Box className="slideshow-container">
      {slidesData.map((slide, index) => (
        <Box className="mySlides fade" key={index}>
          <Box className="numbertext">{index + 1} / {slidesData.length}</Box>
          <Box className="text">{slide.Food_name}</Box>
          <img src={slide.Food_picture} alt={`Slide ${index + 1}`} />
        </Box>
      ))}
      

      {/* ปุ่มนำทาง */}
      <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
      <a className="next" onClick={() => plusSlides(1)}>❯</a>

      {/* จุด */}
      <Box style={{ textAlign: 'center' }}>
        {slidesData.map((_, index) => (
          <span className="dot" key={index} onClick={() => currentSlide(index + 1)}></span>
        ))}
      </Box>
    </Box>
  );
}

export default Slideshow;
