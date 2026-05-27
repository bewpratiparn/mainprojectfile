import React, { useState, useEffect } from "react";
import FoodService from "../../lib/foodApi";
import TranslateService from "../../lib/translateApi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Store_information.css";
import { Icon } from "@iconify/react";

function Store_information() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shopId = searchParams.get("shop_id");
  const shopName = searchParams.get("shop_name");
  const shop_picture = searchParams.get("shop_picture");
  const shopLocation = searchParams.get("shop_location");
  const shopPhone = searchParams.get("shop_phone");
  const shopTime = searchParams.get("shop_time");
  const shopText = searchParams.get("shop_text");

  const [foodItems, setFoodItems] = useState([]);
  const [language, setLanguage] = useState("th");
  const [translatedShopName, setTranslatedShopName] = useState(shopName);
  const [translatedShopLocation, setTranslatedShopLocation] =
    useState(shopLocation);
  const [translatedShopPhone, setTranslatedShopPhone] = useState(shopPhone);
  const [translatedShopTime, setTranslatedShopTime] = useState(shopTime);
  const [translatedShopText, setTranslatedShopText] = useState(shopText);
  const [translatedFoodItems, setTranslatedFoodItems] = useState([]);
  const [shopid, setShopId] = useState(null);
  const [translatedLabels, setTranslatedLabels] = useState({
    shopNameLabel: "ชื่อร้านค้า :",
    shopLocationLabel: "สถานที่ ชื่อสถานที่ :",
    shopPhoneLabel: "เบอร์ติดต่อ :",
    shopTimeLabel: "วันเวลาเปิด-ปิด :",
    shopTextLabel: "ตราสัญลักษณ์ :",
    foodNameLabel: "ชื่ออาหาร :",
    foodPriceLabel: "ราคา :",
    currencyLabel: "บาท",
    watchdetail: "รายละเอียด",
  });

  useEffect(() => {
    FoodService.getAllFood(shopId)
      .then((response) => {
        const filteredFoodItems = response.data.filter(
          (item) => item.shop_id === parseInt(shopId)
        );
        setFoodItems(filteredFoodItems);
        setTranslatedFoodItems(filteredFoodItems);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, [shopId]);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setLanguage(lang);
    const fromLang = lang === "th" ? "en" : "th";

    const dir = `${fromLang}-${lang}`

    TranslateService.get(dir, shopName)
      .then((response) => setTranslatedShopName(response.data.translated_text))
      .catch((error) => console.error("Error fetching translated shop name:", error));

    TranslateService.get(dir, shopLocation)
      .then((response) => setTranslatedShopLocation(response.data.translated_text))
      .catch((error) => console.error("Error fetching translated shop location:", error));

    TranslateService.get(dir, shopPhone)
      .then((response) => setTranslatedShopPhone(response.data.translated_text))
      .catch((error) => console.error("Error fetching translated shop phone:", error));

    TranslateService.get(dir, shopTime)
      .then((response) => setTranslatedShopTime(response.data.translated_text))
      .catch((error) => console.error("Error fetching translated shop time:", error));

    TranslateService.get(dir, shopText)
      .then((response) => setTranslatedShopText(response.data.translated_text))
      .catch((error) => console.error("Error fetching translated shop text:", error));

    const translatedItemsPromises = foodItems.map((item) =>
      Promise.all([
        TranslateService.get(dir, item.Food_name),
        TranslateService.get(dir, item.Food_price),
      ]).then(([nameRes, priceRes]) => ({
        ...item,
        Food_name: nameRes.data.translated_text,
        Food_price: priceRes.data.translated_text,
      }))
    );

    Promise.all(translatedItemsPromises)
      .then((translatedItems) => setTranslatedFoodItems(translatedItems))
      .catch((error) => console.error("Error fetching translated food items:", error));

    const labelsToTranslate = [
      "ชื่อร้านค้า :",
      "สถานที่ ชื่อสถานที่ :",
      "เบอร์ติดต่อ :",
      "วันเวลาเปิด-ปิด :",
      "ตราสัญลักษณ์ :",
      "ชื่ออาหาร :",
      "ราคา :",
      "บาท",
      "ดูรายละเอียด",
    ];

    Promise.all(labelsToTranslate.map((label) =>
      TranslateService.get(dir, label).then((r) => r.data.translated_text)
    ))
      .then((translatedLabelsArray) => {
        setTranslatedLabels({
          shopNameLabel: translatedLabelsArray[0],
          shopLocationLabel: translatedLabelsArray[1],
          shopPhoneLabel: translatedLabelsArray[2],
          shopTimeLabel: translatedLabelsArray[3],
          shopTextLabel: translatedLabelsArray[4],
          foodNameLabel: translatedLabelsArray[5],
          foodPriceLabel: translatedLabelsArray[6],
          currencyLabel: translatedLabelsArray[7],
          watchdetail: translatedLabelsArray[8],
        });
      })
      .catch((error) => console.error("Error fetching translated labels:", error));
  };

  const handleClick = () => {
    if (shopId) {
      window.location.href = `/Editstore?shop_id=${shopId}`;
    } else {
      console.error("shop_id is not available");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <div className="bk191">
      <div className="card2">
        <div className="Outline" onClick={handleBackClick}>
          <Icon icon="mdi:arrow-back" className="back" />
        </div>
        <div className="outlerlineedit">
          <Icon
            icon="bxs:edit"
            className="icon-with-hover"
            onClick={handleClick}
          />

          <span className="icon-text" onClick={handleClick}>
            {language === "th"
              ? "เเก้ไขข้อมูลร้านค้า"
              : "Edit store information"}
          </span>
        </div>

        {/* Language Selector */}
        <div className="custom-select191">
          <select
            className="TranslateHome666"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="th" className="thai191">
              ไทย
            </option>
            <option value="en" className="eng191">
              English
            </option>
          </select>
          {language === "en" && (
            <img
              src={new URL("../../assets/images/uk-flag.png", import.meta.url).href}
              alt="English Flag"
            />
          )}
          {language === "th" && (
            <img
              src={new URL("../../assets/images/thailand-flag.png", import.meta.url).href}
              alt="Thai Flag"
            />
          )}
        </div>
        <div className="store-information-container">
          <div className="store-details">
            <img
              src={shop_picture}
              className="image-store"
              alt={shop_picture}
            />
            <div className="container-description">
              <div className="container-box">
                <div className="color-inside">
                  <div className="store-name">
                    {translatedLabels.shopNameLabel} {translatedShopName}
                  </div>
                  <div className="location">
                    {translatedLabels.shopLocationLabel}{" "}
                    {translatedShopLocation}
                  </div>
                  <div className="phone">
                    {translatedLabels.shopPhoneLabel} {translatedShopPhone}
                  </div>
                  <div className="time">
                    {translatedLabels.shopTimeLabel} {translatedShopTime}
                  </div>
                  <div className="symbol">
                    {translatedLabels.shopTextLabel} {translatedShopText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container2">
          {translatedFoodItems.map((item, index) => (
            <div className="grid-item-wrapper" key={index}>
              <div className="grid-item">
                <img
                  src={item.Food_picture}
                  className="picture-menu"
                  alt={`รูปภาพของ ${item.Food_picture}`}
                />
                <div>
                  {translatedLabels.foodNameLabel} {item.Food_name}
                </div>
                <div>
                  {translatedLabels.foodPriceLabel} {item.Food_price}{" "}
                  {translatedLabels.currencyLabel}
                </div>
                <Link
                  to={{
                    pathname: `/Fooddetails`,
                    search: `?food_id=${item.food_id}`,
                    state: { foodItem: item },
                  }}
                  className="buttondetailfood"
                >
                  {translatedLabels.watchdetail}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store_information;
