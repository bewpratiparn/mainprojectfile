/*ปอนด์ Do*/
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import "./AddDataShop.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Navigate, useNavigate } from "react-router-dom";

function AddDataShop() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const[addShop ,setAddshop] = useState ({});
  /*const [shopId, setShopid] = useState("");
  const [shopName, setShopname] = useState("");
  const [shopLocation, setShoplocation] = useState("");
  const [shopPhone, setShopphone] = useState("");
  const [shopMap, setShopMap] = useState("");
  const [shopTime, setShoptime] = useState("");
  const [shopPicture, setShoppicture] = useState("");
  const [shopType, setShoptype] = useState("");*/

  const handleChange = (event) => {
    const name = event.target.name;
    const picture = event.target.picture;
    const value = event.target.value;
    setAddshop((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      shop_name: addShop.storename,
      shop_location: addShop.location,
      shop_phone: addShop.phone,
      shop_map: addShop.maplink,
      shop_time: addShop.onclose,
      shop_picture: addShop.pictureshop,
      shop_type: addShop.mungsavirat,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/add_shop/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {});
        } else {
          MySwal.fire({
            html: <i>เกิดข้อผิดพลาด</i>,
            icon: "error",
          }).then((value) => {
            Navigate("/Login");
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const handleFileChange = (e) => {
    const btnUpload = e.target;
    const ext = btnUpload.value.split(".").pop().toLowerCase();
    if (!["gif", "png", "jpg", "jpeg"].includes(ext)) {
      setErrorMessage("Not an Image...");
    } else {
      setErrorMessage("");
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setIsUploaded(true);
      }, 3000);
      const uploadedFileURL = URL.createObjectURL(btnUpload.files[0]);
      setTimeout(() => {
        setUploadedFile(uploadedFileURL);
      }, 3500);
    }
  };

  const handleFileRemove = () => {
    setIsUploaded(false);
    setUploadedFile(null);
    setIsUploading(false);
    setErrorMessage("");
  };

  return (
    <>
      <div className="form-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center m-10 ">
            <div className="m-5 text-center ">เพิ่มข้อมูลร้านค้า</div>
            <div className="containeruploadfile">
              <input
                className=""
                name="pictureshop"
                type="file"
                id="upload_file"
                onChange={handleChange}
              />
              <div
                className={
                  isUploading ? "button_outer file_uploading" : "button_outer"
                }
              >
                {isUploaded && (
                  <div id="uploaded_view" className="show">
                    <img src={uploadedFile} alt="Uploaded File" />
                  </div>
                )}
              </div>
              {errorMessage && <div className="error_msg">{errorMessage}</div>}
              <button className="file_remove" onClick={handleFileRemove}>
                Remove
              </button>
            </div>

           
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 ">
                ชื่อร้าน
              </label>
              <input
                className="p-2 border rounded-md"
                name="storename"
                id="fstore"
                type="text"
                onChange={handleChange}
                placeholder="กรอกชื่อร้าน"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-3 width ">
                สถานที่
              </label>
              <input
                className=" p-2 border rounded-md"
                name="location"
                type="text"
                id="flocation"
                onChange={handleChange}
                placeholder="สถานที่"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                เบอร์โทรศัพท์
              </label>
              <input
                className=" p-2 border rounded-md"
                name="phone"
                type="text"
                id="ftel"
                onChange={handleChange}
                placeholder="กรอกเบอร์โทรศัพท์"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                Map-link
              </label>
              <input
                className=" p-2 border rounded-md"
                name="maplink"
                type="text"
                id="fmaplink"
                onChange={handleChange}
                placeholder="กรอก map link"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                เวลา เปิด-ปิด
              </label>
              <input
                className=" p-2 border rounded-md"
                name="onclose"
                type="text"
                id="onclose"
                onChange={handleChange}
                placeholder="เวลา เปิด-ปิด"
              />
            </div>
            <div className="grid grid-rows-3 gap-2">
              <div>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="mungsavirat"
                    className="form-checkbox text-blue-600"
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-black">เพิ่มมังสวิรัติ</span>
                  <img
                    src="https://media.istockphoto.com/id/1311125920/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%A1%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%A7%E0%B8%B4%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%B4-100-%E0%B9%80%E0%B8%9B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%8C-%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%A1%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%A7%E0%B8%B4%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%B4-%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C-eco-bio-%E0%B9%81%E0%B8%A5%E0%B8%B0-organic.jpg?s=612x612&w=0&k=20&c=FvYOIGvyyb941-1vz-_s2ZGgOUz-AZMEJ5zW8yFhU5g="
                    alt="มังสวิรัติ"
                    style={{ width: "70px", height: "auto" }} // กำหนดขนาดภาพเป็น 100px กว้างและปรับความสูงตามอัตราส่วน
                  />
                </label>
              </div>

              <div>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="jay"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-black">เพิ่มอาหารเจ</span>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-b1-Nxx_cbgUySvFd2emKL8rQwR39810zYZp2U9PMgLXojLNnR8XlPJcUXEEs4ucfq0&usqp=CAU"
                    alt="อาหารเจ"
                    style={{ width: "70px", height: "auto" }} // กำหนดขนาดภาพเป็น 100px กว้างและปรับความสูงตามอัตราส่วน
                  />
                </label>
              </div>

              <div>
                <label className="inline-flex items-center  mb-4 ">
                  <input
                    type="checkbox"
                    name="halan"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-black ">เพิ่มฮาลาน</span>
                  <img
                    src="https://assets.brandinside.asia/uploads/2017/09/HALAL.jpg"
                    alt="ฮาลาน"
                    style={{ width: "70px", height: "auto" }} // กำหนดขนาดภาพเป็น 100px กว้างและปรับความสูงตามอัตราส่วน
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                ยืนยัน
              </button>
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddDataShop;
