import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FoodService from "../../lib/foodApi";
import TranslateService from "../../lib/translateApi";
import { Icon } from "@iconify/react";
import { Button, CircularProgress } from "@mui/material";
import "./Fooddetails.css";
import { Box } from "@mui/material";

function Fooddetails() {
  const navigate = useNavigate(); // Use the useNavigate hook
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const foodId = searchParams.get("food_id");

  const [foodDetails, setFoodDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isThai, setIsThai] = useState(true); // state to track the current language

  useEffect(() => {
    FoodService.getAllFood()
      .then((response) => {
        const foodItem = response.data.find(
          (item) => item.food_id === parseInt(foodId)
        );
        if (foodItem) {
          setFoodDetails(foodItem);
        } else {
          setError("Food item not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
        setError("Error fetching food details.");
        setLoading(false);
      });
  }, [foodId]);

  const translate = async (text, targetLang) => {
    const direction = targetLang === "en" ? "th-en" : "en-th";
    try {
      const response = await TranslateService.translate(direction, text);
      return response.data.translated_text;
    } catch (error) {
      console.error("Error translating text:", error);
      setError("Error translating text.");
      return text; // fallback to original text if translation fails
    }
  };

  const handleToggleLanguage = async () => {
    if (!foodDetails) return;
    setLoading(true);
    setError(null);
    try {
      const targetLang = isThai ? "en" : "th";
      const translatedFoodName = await translate(
        foodDetails.Food_name,
        targetLang
      );
      const translatedFoodElements = await translate(
        foodDetails.food_elements.join(", "),
        targetLang
      );
      const translatedFoodElement = await translate(
        foodDetails.Food_element,
        targetLang
      );

      setFoodDetails({
        ...foodDetails,
        Food_name: translatedFoodName,
        food_elements: translatedFoodElements.split(", "), // split back to array
        Food_element: translatedFoodElement,
      });
      setIsThai(!isThai);
    } catch (error) {
      console.error("Error during translation:", error);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <Box className="loading-container">
        <CircularProgress size={80} thickness={4} color="primary" />
      </Box>
    );

  if (error) return <Box>{error}</Box>;

  const { Food_name, Food_price, Food_picture, Food_element, food_elements } =
    foodDetails;
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box className="bk191">
      <Box className="card2">

        <Box className="custom-select191">
          <select
            className="TranslateHome666"
            value={isThai ? "th" : "en"}
            onChange={handleToggleLanguage}
          >
            <option value="th" className="thai191">
              ไทย
            </option>
            <option value="en" className="eng191">
              English
            </option>
          </select>
          {isThai ? (
            <img
              src={new URL("../../assets/images/thailand-flag.png", import.meta.url).href}
              alt="Thailand"
            />
          ) : (
            <img
              src={new URL("../../assets/images/uk-flag.png", import.meta.url).href}
              alt="UK"
            />
          )}
        </Box>
        <Box className="Outline-inFooddetails">
          <Icon
            icon="mdi:arrow-back"
            className="button-back-inFooddetails"
            onClick={handleBackClick}
          />
        </Box>
        <Box className="fooddetail888">
          {isThai ? "รายละเอียดเกี่ยวกับอาหาร" : "Food Details"}
        </Box>
        <Box className="customfooddetail">
          <Box className="details">
            <Box className="food-container">
              <Box className="ingredients-label">
                {isThai ? "ชื่ออาหาร : " : "Food Name: "}
              </Box>
              <Box className="Food_name">{Food_name}</Box>
            </Box>
            <Box className="price-container">
              <Box className="ingredients-label">
                {isThai ? "ราคา : " : "Price:"}
              </Box>
              <Box className="Food_price">
                {Food_price} {isThai ? "บาท" : "THB"}
              </Box>
            </Box>
          </Box>

          <img
            className="img5"
            src={Food_picture}
            alt={`${isThai ? "รูปภาพของ" : "Image of"} ${Food_name}`}
          />

          <Box className="watudip-container">
            <Box className="watudip-label">
              {isThai ? "วัตถุดิบ " : "Ingredients :"}
            </Box>
            <Box className="showingredient">{food_elements.join(", ")}</Box>
          </Box>

          <Box className="containner-detailfood">
            <Box className="description-label">
              {isThai ? "รายละเอียดอาหาร " : "Food Description :"}
            </Box>
            <Box className="detailfood">{Food_element}</Box>
          </Box>
        </Box>
      </Box>
    </Box>

  );
}

export default Fooddetails;
