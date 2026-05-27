import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import ShopService from "../../lib/shopApi";
import "./AddDataShop.css";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

function AddDataShop() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [addShop, setAddShop] = useState({
    pictureshop: "",
    storename: "",
    location: "",
    phone: "",
    onclose: "",
    shop_type: "",
  });
  const [imageURL, setImageURL] = useState("");

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageURL(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setAddShop((prevShop) => ({
        ...prevShop,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userToken = localStorage.getItem("token");

    if (userToken) {
      const formData = new FormData();
      formData.append("shop_name", addShop.storename);
      formData.append("shop_location", addShop.location);
      formData.append("shop_phone", addShop.phone);
      formData.append("shop_time", addShop.onclose);
      formData.append("shop_type", addShop.shop_type);
      formData.append("shop_picture", imageURL);

      ShopService.addShop(formData)
        .then((response) => {
          if (response.data.message === "Shop data added successfully") {
            MySwal.fire({
              html: <i>{response.data.message}</i>,
              icon: "success",
            }).then(() => {
              navigate("/Home");
            });
          } else {
            MySwal.fire({
              html: <i>เพิ่มข้อมูลร้านค้าไม่สำเร็จ</i>,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          MySwal.fire({
            html: <i>เกิดข้อผิดพลาดในการเพิ่มข้อมูลร้านค้า</i>,
            icon: "error",
          });
        });
    } else {
      MySwal.fire({
        html: <i>โปรดล็อกอิน</i>,
        icon: "warning",
      });
    }
  };

  const handleReset = () => {
    setAddShop({
      pictureshop: "",
      storename: "",
      location: "",
      phone: "",
      onclose: "",
      shop_type: "",
    });
    setImageURL("");
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
    <>
      <Box className="background">
        <Box className="outlineinaddshop" onClick={handleBackClick}>
          <Icon icon="mdi:arrow-back" className="iconbackinaddshop" />
        </Box>
        <Box className="boxtext">
          <Box className="block text-gray-700 text-2xl font-bold mb-8 ">
            เพิ่มข้อมูลร้านค้า
          </Box>
          <form onSubmit={handleSubmit}>
            <Box className="grid gap-6 mb-6 md:grid-cols-1">
              <Box>
                <Box className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2 ">
                    ชื่อร้าน
                  </label>
                  <input
                    className="input-style"
                    name="storename"
                    type="text"
                    placeholder="ชื่อร้าน..."
                    value={addShop.storename}
                    onChange={handleChange}
                    style={{ borderRadius: "10px" }} // เพิ่มขอบมน
                  />
                </Box>
                <Box className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2">
                    สถานที่ Map-link
                  </label>
                  <textarea
                    className="input-map"
                    name="location"
                    type="text"
                    placeholder="สถานที่..."
                    value={addShop.location}
                    onChange={handleChange}
                    style={{ borderRadius: "4px" }} // เพิ่มขอบมน
                  />
                </Box>
                <Box className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    className="input-style"
                    name="phone"
                    type="text"
                    placeholder="เบอร์โทรศัพท์..."
                    value={addShop.phone}
                    onChange={handleChange}
                    style={{ borderRadius: "4px" }} // เพิ่มขอบมน
                  />
                </Box>
                <Box className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2">
                    วัน,เวลา เปิด-ปิด
                  </label>
                  <textarea
                    className="input-map"
                    name="onclose"
                    type="text"
                    placeholder="วัน,เวลา เปิด-ปิด..."
                    value={addShop.onclose}
                    onChange={handleChange}
                    style={{ borderRadius: "4px" }} // เพิ่มขอบมน
                  />
                </Box>
                <Box className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2 ">
                    ประเภทร้าน
                  </label>
                  <Box className="symbol007">
                    <select
                      className="input-style"
                      name="shop_type"
                      value={addShop.shop_type}
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        เลือกประเภทร้าน...
                      </option>
                      <option value="Mangswirat">Mangswirat</option>
                      <option value="Halal">Halal</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Nothing">Nothing</option>
                    </select>
                  </Box>
                  {addShop.shop_type === "Halal" && (
                    <img
                      src={new URL("../../assets/images/halal_icon.jpg", import.meta.url).href}
                      alt="Halal Shop"
                      className="Halal-Shop"
                    />
                  )}
                  {addShop.shop_type === "Vegetarian" && (
                    <img
                      src={new URL("../../assets/images/vegan_icon.jpg", import.meta.url).href}
                      alt="Halal Shop"
                      className="Vegetarian-Shop"
                    />
                  )}
                  {addShop.shop_type === "Mangswirat" && (
                    <img
                      src={new URL("../../assets/images/mangswirat_icon.jpeg", import.meta.url).href}
                      alt="Halal Shop"
                      className="Mangswirat-Shop"
                    />
                  )}
                </Box>
                <Box className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2">
                    เพิ่มรูปร้านค้า
                  </label>
                  <input
                    className="file"
                    name="pictureshop"
                    type="file"
                    onChange={handleChange}
                  />
                  <Box>
                    {imageURL && (
                      <img src={imageURL} alt="Shop" className="imgaddshop" />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="buttonContainer">
              <Box className="buttonshopsubmit">
                <button type="submit">ยืนยัน</button>
              </Box>
              <Box className="buttonshopcancel">
                <button type="button" onClick={handleReset}>
                  ยกเลิก
                </button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default AddDataShop;