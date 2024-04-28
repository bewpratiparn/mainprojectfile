import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import "./AddFood.css";
import axios from "axios";

// Import statements...

function AddFood() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [input, setInputs] = useState({
    Food_name: "",
    Food_name2: "",
    Food_element: "",
    Food_price: "",
    Food_picture: "",
    Food_text2: "",
  });
  const [selectedFood, setSelectedFood] = useState({});
  const [foodDetails, setFoodDetails] = useState({});
  const [foodNamesWithElements, setFoodNamesWithElements] = useState([]);
  const [addMangswirat, setMangswirat] = useState(false);
  const [addVegetarian, setVegetarian] = useState(false);
  const [addHalal, setHalal] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);

  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/food_names")
      .then((res) => setFoodNamesWithElements(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFoodSelection = (event) => {
    const selectedFoodName = event.target.value;
    const selectedFoodItem = foodNamesWithElements.find(
      (food) => food.food_name === selectedFoodName
    );
    setSelectedFood(selectedFoodItem);
    axios
      .get(`http://127.0.0.1:8000/food_names/`)
      .then((res) => {
        const selectedFoodDetails = res.data.find(
          (food) => food.food_name === selectedFoodName
        );
        setFoodDetails(selectedFoodDetails);
      })
      .catch((err) => console.log(err));
  };


  const handleToggleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case "Mangswirat":
        setMangswirat(checked);
        break;
      case "Vegetarian":
        setVegetarian(checked);
        break;
      case "Halal":
        setHalal(checked);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userToken = localStorage.getItem("token");
  
    if (userToken) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const shopTypeArray = [];
    if (addMangswirat) shopTypeArray.push("Mangswirat");
    if (addVegetarian) shopTypeArray.push("Vegetarian");
    if (addHalal) shopTypeArray.push("Halal");
    const shopType = shopTypeArray.join(", ");

    const raw = JSON.stringify({
      Food_name: input.Food_name,
      Food_name2: input.Food_name2,
      Food_element: input.Food_element,
      Food_price: input.Food_price,
      Food_picture: input.Food_picture,
      Food_text2: shopType,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    axios.post("http://127.0.0.1:8000/add_food/", requestData, { headers })
        .then((response) => {
          if (response.data === "token") {
            MySwal.fire({
              html: <i>{response.data.message}</i>,
              icon: "success",
            }).then((value) => {
              navigate("/Home");
            });
          } else {
            MySwal.fire({
              html: <i>เพิ่มข้อมูลร้านค้าสำเร็จ</i>,
              icon: "success",
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

  return (
    <>
      <div className="background">
        <div className="flex flex-col justify-center items-center m-10">
          <div className="m-5 text-center ">เพิ่มข้อมูลอาหาร</div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                    ชื่อเมนู
                  </label>
                  <input
                    className="p-2 border rounded-md"
                    name="Food_name"
                    type="text"
                    placeholder="ชื่อเมนู..."
                    htmlFor="ชื่อเมนู"
                    value={input.Food_name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-l font-medium text-gray-900 dark:text-back"
                    htmlFor="food_name2"
                  >
                    รายการอาหาร
                  </label>
                  <select
                    className="mb-5 w-full max-w-xs"
                    onChange={handleFoodSelection}
                  >
                    {foodNamesWithElements.length > 0 &&
                      foodNamesWithElements.map((food, i) => (
                        <option key={i} value={food.food_name}>
                          {food.food_name}
                        </option>
                      ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                    เพิ่มรายละเอียดอาหารที่ต้องการเพิ่ม
                  </label>
                  <input
                    className="p-2 border rounded-md"
                    name="Food_name2"
                    type="text"
                    placeholder="ชื่อเมนู..."
                    htmlFor="ชื่อเมนู"
                    value={input.Food_name2 || "" +foodDetails.food_element ||""}
                    onChange={handleChange}
                  />
                </div>
            
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                    ราคา
                  </label>
                  <input
                    className="p-2 border rounded-md"
                    name="Food_price"
                    type="text"
                    placeholder="ราคา..."
                    htmlFor="ราคา"
                    value={input.Food_price || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 width ">
                    โปรดเพิ่มรูปอาหารของท่าน
                  </label>
                  <input
                    className="p-2 border rounded-md"
                    name="Food_picture"
                    type="file"
                    placeholder="ราคา..."
                    htmlFor="รูปภาพ"
                    value={input.Food_picture || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <label className="inline-flex items-center mb-2">
                  <input
                    name="Mangswirat"
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    checked={addMangswirat}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 text-black">เพิ่มมังสวิรัติ</span>
                  {/* Image */}
                </label>
              </div>

              <div>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="Vegetarian"
                    className="form-checkbox text-blue-600"
                    checked={addVegetarian}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 text-black">เพิ่มอาหารเจ</span>
                  {/* Image */}
                </label>
              </div>

              <div>
                <label className="inline-flex items-center  mb-4 ">
                  <input
                    type="checkbox"
                    name="Halal"
                    className="form-checkbox text-blue-600"
                    checked={addHalal}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 text-black ">เพิ่มฮาลาน</span>
                  {/* Image */}
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
                type="reset"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddFood;
