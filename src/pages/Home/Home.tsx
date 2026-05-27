// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShopService from "../../lib/shopApi";
import FoodService from "../../lib/foodApi";
import TranslateService from "../../lib/translateApi";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Showuser from "../User/Showuser";
import CustomTextfield from "../../components/input/CustomTextfield";
import CustomTypography from "../../components/typography/CustomTypography";
import { Box, Stack } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFlag } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [datasearch, setDatasearch] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [displayedShopIds, setDisplayedShopIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState({ shops: [], foods: [] });
  const [language, setLanguage] = useState("th");

  useEffect(() => {
    ShopService.getShops()
      .then((res) => {
        const uniqueShops = res.data.filter(
          (shop, index, self) =>
            index === self.findIndex((s) => s.shop_id === shop.shop_id)
        );
        setfilterData(uniqueShops);
        setDatasearch(uniqueShops);
        setOriginalData((prev) => ({ ...prev, shops: uniqueShops }));
      })
      .catch((err) => console.log(err));

    FoodService.getAllFood()
      .then((res) => {
        setFoodData(res.data);
        setOriginalData((prev) => ({ ...prev, foods: res.data }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (value) => {
    setSearchTerm(value);
    const filteredShops = filterData.filter((shop) =>
      shop.shop_name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredFoods = foodData.filter((food) =>
      food.Food_name.toLowerCase().includes(value.toLowerCase())
    );
    const shopIds = new Set(filteredFoods.map((food) => food.shop_id));
    const filteredShopsWithFood = filterData.filter((shop) =>
      shopIds.has(shop.shop_id)
    );
    const result = [...filteredShops, ...filteredShopsWithFood];
    const uniqueResult = result.filter(
      (shop, index, self) =>
        index === self.findIndex((s) => s.shop_id === shop.shop_id)
    );
    setDatasearch(uniqueResult);
  };

  const handleShopClick = (shopId) => {
    if (!displayedShopIds.includes(shopId)) {
      setDisplayedShopIds([...displayedShopIds, shopId]);
    }
  };

  const handleTranslate = () => {
    const fromLang = language === "th" ? "th" : "en";
    const toLang = language === "th" ? "en" : "th";

    const shopNames = originalData.shops
      .map((shop) => shop.shop_name)
      .join(",");
    const shopLocations = originalData.shops
      .map((shop) => shop.shop_location)
      .join(",");
    const shopTimes = originalData.shops
      .map((shop) => shop.shop_time)
      .join(",");
    const foodNames = originalData.foods
      .map((food) => food.Food_name)
      .join(",");

    Promise.all([
      TranslateService.get(`${fromLang}-${toLang}`, shopNames),
      TranslateService.get(`${fromLang}-${toLang}`, shopLocations),
      TranslateService.get(`${fromLang}-${toLang}`, shopTimes),
      TranslateService.get(`${fromLang}-${toLang}`, foodNames),
    ])
      .then(([namesRes, locationsRes, timesRes, foodNamesRes]) => {
        const namesData = namesRes.data;
        const locationsData = locationsRes.data;
        const timesData = timesRes.data;
        const foodNamesData = foodNamesRes.data;
        const translatedNames = namesData.translated_text.split(",");
        const translatedLocations = locationsData.translated_text.split(",");
        const translatedTimes = timesData.translated_text.split(",");
        const translatedFoodNames = foodNamesData.translated_text.split(",");

        const translatedShops = originalData.shops.map((shop, index) => ({
          ...shop,
          shop_name: translatedNames[index],
          shop_location: translatedLocations[index],
          shop_time: translatedTimes[index],
        }));

        const translatedFoods = originalData.foods.map((food, index) => ({
          ...food,
          Food_name: translatedFoodNames[index],
        }));

        setDatasearch(translatedShops);
        setFoodData(translatedFoods);

        setLanguage(toLang);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    handleTranslate();
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   fade: true,
  //   cssEase: "linear",
  // };


  return (
    <>
      <Showuser />

      <Box className="containerhome">
        <Box className="custom-select666">
          {language === 'en' && (
            <img src={new URL("../../assets/images/uk-flag.png", import.meta.url).href} alt="English" />
          )}
          {language === 'th' && (
            <img src={new URL("../../assets/images/thailand-flag.png", import.meta.url).href} alt="Thailand" />
          )}
          <select
            className=""
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="th" className="thai666">
              ไทย
            </option>
            <option value="en" className="eng666">
              English
            </option>
          </select>
        </Box>
        <Box className="boxsearch" style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
          <CustomTextfield
            search={true}
            placeholder="ค้นหาร้านของคุณได้ที่นี่..."
            value={searchTerm}
            onChange={(e: any) => handleFilter(e.target.value)}
            clearIcon={true}
            onClear={() => handleFilter("")}
          />
        </Box>
        <Box className="shopfood007 text-center mt-5 mb-5">
          <CustomTypography 
            value={language === "th" ? "ร้านอาหาร" : "Restaurants"}
            gold={true}
            sx={{ fontSize: '2.5rem' }} rich={undefined} onClick={undefined}          />
        </Box>

        <Box className="whatthehall">
          {Array.isArray(datasearch) &&
            datasearch.map((d: any, i) => (
              <Box
                key={i}
                className="custom-backgroundhome1111"
              >
                <Box className="container-storewtf">
                  <Box className="card1111">
                    <img
                      src={d.shop_picture}
                      alt={d.shop_name}
                      className="picture-home rounded-lg"
                    />
                    <Box className="card-outdatastore">
                      <Stack direction="column" spacing={1} className="data-storehome">
                        <Box className="shop_id">
                          {language === "th" ? "ชื่อร้านค้า" : "Shop Name"}:
                          {searchTerm &&
                            d.shop_name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "#ff9800" }}>
                              {d.shop_name}
                            </span>
                          ) : (
                            d.shop_name
                          )}
                        </Box>
                        <Box className="shop_id">
                          {language === "th" ? "สถานที่" : "Location"}:
                          {searchTerm && d.shop_location.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.shop_location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ backgroundColor: "#ff9800", textDecoration: "none", color: "white" }}
                            >
                              {d.shop_location}
                            </a>
                          ) : (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.shop_location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "underline", color: "white" }}
                            >
                              {d.shop_location}
                            </a>
                          )}
                        </Box>
                        <Box className="shop_id">
                          {language === "th" ? "เบอร์โทรศัพท์" : "Phone"}:{" "}
                          {searchTerm &&
                            d.shop_phone
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_phone}
                            </span>
                          ) : (
                            d.shop_phone
                          )}
                        </Box>
                        <Box className="shop_id">
                          {language === "th"
                            ? "วันเวลาเปิด-ปิด"
                            : "Opening Hours"}
                          :
                          {searchTerm &&
                            d.shop_time
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_time}
                            </span>
                          ) : (
                            d.shop_time
                          )}
                        </Box>
                        <Box className="shop_id">
                          {language === "th" ? "ตราสัญลักษณ์" : "Symbol"}:{" "}
                          {searchTerm &&
                            d.shop_text
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_text}
                            </span>
                          ) : (
                            d.shop_text
                          )}
                          {d.shop_text.toLowerCase().includes("halal") && (
                            <Box className="halal-image">
                              <img
                                src={new URL("../../assets/images/halal_icon.jpg", import.meta.url).href}
                                alt="Halal"
                              />
                            </Box>
                          )}
                          {d.shop_text.toLowerCase().includes("vegetarian") && (
                            <Box className="vegetarian-image">
                              <img
                                src={new URL("../../assets/images/vegan_icon.jpg", import.meta.url).href}
                                alt="Vegetarian"
                              />
                            </Box>
                          )}
                          {d.shop_text.toLowerCase().includes("mangswirat") && (
                            <Box className="mangswirat-image">
                              <img
                                src={new URL("../../assets/images/mangswirat_icon.jpeg", import.meta.url).href}
                                alt="Mangswirat"
                              />
                            </Box>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                    <Box className="buttongostore">
                      <Link
                        to={{
                          pathname: `/Store_information`,
                          search: `?shop_id=${d.shop_id}&shop_name=${d.shop_name
                            }&shop_picture=${encodeURIComponent(
                              d.shop_picture
                            )}&shop_location=${d.shop_location}&shop_phone=${d.shop_phone
                            }&shop_time=${d.shop_time}&shop_text=${d.shop_text}`,
                        }}
                        className="bg-amber-500 py-2 px-4 text-white font-bold rounded-full inline-block"
                        onClick={() => handleShopClick(d.shop_id)}
                      >
                        {language === "th" ? "ไปยังร้านค้า" : "Shop"}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default Home;
