import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./Editstore.css";


function Editstore() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shopIdFromURL = searchParams.get("shop_id");

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editShopId, setEditShopId] = useState(shopIdFromURL || null);
  const [editShopData, setEditShopData] = useState({
    shop_name: "",
    shop_location: "",
    shop_phone: "",
    shop_time: "",
    shop_picture: "",
    shop_type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not logged in");
        }

        // Fetch user data
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/authorize/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(userResponse.data);

        // Fetch shops data
        const shopsResponse = await axios.get("http://127.0.0.1:8000/shops/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter shops to display only shops owned by the logged-in user
        const userShops = shopsResponse.data.filter(
          (shop) => shop.owner_id === userResponse.data.user_id
        );

        setShops(userShops);

        // If shopId is provided from URL, set the shop data for editing
        if (shopIdFromURL) {
          const shopToEdit = userShops.find(
            (shop) => shop.shop_id === parseInt(shopIdFromURL)
          );
          if (shopToEdit) {
            setEditShopId(shopToEdit.shop_id);
            setEditShopData({
              shop_name: shopToEdit.shop_name,
              shop_location: shopToEdit.shop_location,
              shop_phone: shopToEdit.shop_phone,
              shop_time: shopToEdit.shop_time,
              shop_picture: shopToEdit.shop_picture,
              shop_text: shopToEdit.shop_text,
            });
          }
        }
      } catch (error) {
        setError(error);
        Swal.fire({
          title: "โปรดล็อคอิน",
          icon: "warning",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopIdFromURL]);

  const handleEditClick = (shop) => {
    setEditShopId(shop.shop_id);
    setEditShopData({
      shop_name: shop.shop_name,
      shop_location: shop.shop_location,
      shop_phone: shop.shop_phone,
      shop_time: shop.shop_time,
      shop_picture: base64String,
     
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditShopData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditShopData((prevData) => ({
          ...prevData,
          shop_picture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in");
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/edit_shop/${editShopId}`,
        editShopData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
      })
      // Fetch updated shop data after editing
      const updatedShops = await axios.get("http://127.0.0.1:8000/shops/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShops(updatedShops.data);
      setEditShopId(null);
    } catch (error) {
      setError(error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="flex items-center justify-center">
        <div className="w-1/2 rounded-lg bg-amber-500 text-white p-5 mt-5 ml-5">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4 text-black ">
              <label htmlFor="shop_name" className="block">
                ชื่อร้านค้า
              </label>
              <input
                type="text"
                name="shop_name"
                className="w-full mt-3 p-3 rounded-lg"
                placeholder="โปรดใส่ชื่อร้าน ...."
                value={editShopData.shop_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 text-black">
              <label htmlFor="shop_location" className="block">
                สถานที่
              </label>
              <input
                type="text"
                name="shop_location"
                className="w-full mt-3 p-3 rounded-lg"
                placeholder="โปรดใส่สถานที่ ...."
                value={editShopData.shop_location}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 text-black">
              <label htmlFor="shop_phone" className="block">
                เบอร์ติดต่อ
              </label>
              <input
                type="text"
                name="shop_phone"
                className="w-full mt-3 p-3 rounded-lg"
                placeholder="โปรดใส่เบอร์ติดต่อ ...."
                value={editShopData.shop_phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 text-black">
              <label htmlFor="shop_time" className="block">
                เวลาเปิดปิด
              </label>
              <input
                type="text"
                name="shop_time"
                className="w-full mt-3 p-3 rounded-lg"
                placeholder="โปรดใส่วัน-เวลา-เปิดปิด"
                value={editShopData.shop_time}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 text-black">
              <label htmlFor="shop_type" className="block">
                ประเภทร้านของท่าน
              </label>
              <select
                name="shop_type"
                className="mt-3 p-3 rounded-lg"
                value={editShopData.shop_type}
                onChange={handleInputChange}
              >
                <option value="Halal">Halal</option>
                <option value="Mangswirat">Mangswirat</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Nothting">Nothting</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="shop_picture" className="block">
                รูปภาพร้านค้า
              </label>
              <input
                type="file"
                name="shop_picture"
                className="mt-3"
                onChange={handleFileChange}
              />
              {editShopData.shop_picture && (
                <img
                  src={editShopData.shop_picture}
                  alt="Shop"
                  style={{ marginTop: "10px", maxWidth: "100%" }}
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-6"
              onClick={() => setEditShopId(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {/* <div className="shops-list">
        {shops.map((shop) => (
          <div key={shop.shop_id}>
            <h3>{shop.shop_name}</h3>
            <p>{shop.shop_location}</p>
            <button onClick={() => handleEditClick(shop)}>Edit</button>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Editstore;
