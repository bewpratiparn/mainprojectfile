// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShopService from "../../lib/shopApi";
import FoodService from "../../lib/foodApi";
import TranslateService from "../../lib/translateApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Showuser from "../User/Showuser";
import CustomTextfield from "../../components/input/CustomTextfield";
import CustomTypography from "../../components/typography/CustomTypography";

// MUI
import { 
  Box, Stack, Grid, Card, CardMedia, CardContent, Typography, 
  Chip, Button, BottomNavigation, BottomNavigationAction, Paper, Avatar, useTheme, Container
} from "@mui/material";

// Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SpaIcon from '@mui/icons-material/Spa';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const categories = [
  { id: 1, nameTh: 'เผ็ด', nameEn: 'Spicy', icon: <LocalFireDepartmentIcon sx={{color: '#ff5722', fontSize: 32}}/>, bg: 'rgba(255, 87, 34, 0.1)' },
  { id: 2, nameTh: 'สุขภาพ', nameEn: 'Healthy', icon: <SpaIcon sx={{color: '#4caf50', fontSize: 32}}/>, bg: 'rgba(76, 175, 80, 0.1)' },
  { id: 3, nameTh: 'เส้น', nameEn: 'Noodles', icon: <RamenDiningIcon sx={{color: '#ff9800', fontSize: 32}}/>, bg: 'rgba(255, 152, 0, 0.1)' },
  { id: 4, nameTh: 'ของหวาน', nameEn: 'Dessert', icon: <IcecreamIcon sx={{color: '#e91e63', fontSize: 32}}/>, bg: 'rgba(233, 30, 99, 0.1)' }
];

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [datasearch, setDatasearch] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [foodData, setFoodData] = useState<any[]>([]);
  const [displayedShopIds, setDisplayedShopIds] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState({ shops: [], foods: [] });
  const [language, setLanguage] = useState("th");
  const [bottomNavValue, setBottomNavValue] = useState(0);

  useEffect(() => {
    ShopService.getShops()
      .then((res: any) => {
        const uniqueShops = res.data.filter(
          (shop: any, index: any, self: any) =>
            index === self.findIndex((s: any) => s.shop_id === shop.shop_id)
        );
        setfilterData(uniqueShops);
        setDatasearch(uniqueShops);
        setOriginalData((prev: any) => ({ ...prev, shops: uniqueShops }));
      })
      .catch((err: any) => console.log(err));

    FoodService.getAllFood()
      .then((res: any) => {
        setFoodData(res.data);
        setOriginalData((prev: any) => ({ ...prev, foods: res.data }));
      })
      .catch((err: any) => console.log(err));
  }, []);

  const handleFilter = (value: string) => {
    setSearchTerm(value);
    const filteredShops = filterData.filter((shop: any) =>
      shop.shop_name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredFoods = foodData.filter((food: any) =>
      food.Food_name.toLowerCase().includes(value.toLowerCase())
    );
    const shopIds = new Set(filteredFoods.map((food: any) => food.shop_id));
    const filteredShopsWithFood = filterData.filter((shop: any) =>
      shopIds.has(shop.shop_id)
    );
    const result = [...filteredShops, ...filteredShopsWithFood];
    const uniqueResult = result.filter(
      (shop: any, index: any, self: any) =>
        index === self.findIndex((s: any) => s.shop_id === shop.shop_id)
    );
    setDatasearch(uniqueResult);
  };

  const handleShopClick = (shopId: any) => {
    if (!displayedShopIds.includes(shopId)) {
      setDisplayedShopIds([...displayedShopIds, shopId]);
    }
  };

  const handleTranslate = () => {
    const fromLang = language === "th" ? "th" : "en";
    const toLang = language === "th" ? "en" : "th";

    const shopNames = originalData.shops.map((shop: any) => shop.shop_name).join(",");
    const shopLocations = originalData.shops.map((shop: any) => shop.shop_location).join(",");
    const shopTimes = originalData.shops.map((shop: any) => shop.shop_time).join(",");
    const foodNames = originalData.foods.map((food: any) => food.Food_name).join(",");

    if (!shopNames) return;

    Promise.all([
      TranslateService.get(`${fromLang}-${toLang}`, shopNames),
      TranslateService.get(`${fromLang}-${toLang}`, shopLocations),
      TranslateService.get(`${fromLang}-${toLang}`, shopTimes),
      TranslateService.get(`${fromLang}-${toLang}`, foodNames),
    ])
      .then(([namesRes, locationsRes, timesRes, foodNamesRes]: any) => {
        const namesData = namesRes.data;
        const locationsData = locationsRes.data;
        const timesData = timesRes.data;
        const foodNamesData = foodNamesRes.data;
        
        const translatedNames = namesData.translated_text.split(",");
        const translatedLocations = locationsData.translated_text.split(",");
        const translatedTimes = timesData.translated_text.split(",");
        const translatedFoodNames = foodNamesData.translated_text.split(",");

        const translatedShops = originalData.shops.map((shop: any, index: any) => ({
          ...shop,
          shop_name: translatedNames[index],
          shop_location: translatedLocations[index],
          shop_time: translatedTimes[index],
        }));

        const translatedFoods = originalData.foods.map((food: any, index: any) => ({
          ...food,
          Food_name: translatedFoodNames[index],
        }));

        setDatasearch(translatedShops);
        setFoodData(translatedFoods);
        setLanguage(toLang);
      })
      .catch((error: any) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
    handleTranslate();
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3.5 } },
      { breakpoint: 600, settings: { slidesToShow: 2.5 } },
      { breakpoint: 480, settings: { slidesToShow: 1.5 } }
    ]
  };

  // Hover animation pattern
  const hoverStyle = {
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 20px rgba(255, 152, 0, 0.2)",
      cursor: "pointer"
    }
  };

  return (
    <Box sx={{ pb: 8, bgcolor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Showuser />
      
      {/* Sticky Top Nav */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(10px)', py: 2, px: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <CustomTextfield
              search={true}
              placeholder={language === "th" ? "ค้นหาร้านอาหาร หรือเมนูโปรด..." : "Search restaurants or dishes..."}
              value={searchTerm}
              onChange={(e: any) => handleFilter(e.target.value)}
              clearIcon={true}
              onClear={() => handleFilter("")}
            />
          </Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={handleTranslate}>
            <img 
              src={language === 'en' ? new URL("../../assets/images/uk-flag.png", import.meta.url).href : new URL("../../assets/images/thailand-flag.png", import.meta.url).href} 
              alt="flag" 
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{language === 'th' ? 'TH' : 'EN'}</Typography>
          </Stack>
        </Stack>
      </Box>

      <Container maxWidth="md" sx={{ mt: 3 }}>
        
        {/* Hero Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="800" gutterBottom sx={{ background: 'linear-gradient(45deg, #FFD700, #FF9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {language === 'th' ? 'วันนี้กินอะไรดี?' : 'What should I eat today?'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language === 'th' ? 'เลือกเมนูที่ถูกใจคุณภายใน 5 วินาที' : 'Find your perfect meal in 5 seconds'}
          </Typography>
        </Box>

        {/* Quick Categories */}
        <Grid container spacing={2} mb={5}>
          {categories.map((cat) => (
            <Grid item xs={3} key={cat.id}>
              <Box 
                onClick={() => handleFilter(language === 'th' ? cat.nameTh : cat.nameEn)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2,
                  borderRadius: 4, bgcolor: '#1e1e1e', transition: 'all 0.2s',
                  border: '1px solid rgba(255,255,255,0.05)',
                  '&:hover': { transform: 'translateY(-4px)', bgcolor: cat.bg, borderColor: '#ff9800', cursor: 'pointer' }
                }}
              >
                <Box mb={1}>{cat.icon}</Box>
                <Typography variant="caption" fontWeight="bold">
                  {language === 'th' ? cat.nameTh : cat.nameEn}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Trending AI Foods (Menu-First) */}
        {foodData && foodData.length > 0 && (
          <Box mb={6}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <WhatshotIcon sx={{ color: '#ff9800' }} />
              <Typography variant="h6" fontWeight="bold">
                {language === 'th' ? 'เมนูฮิต (Trending)' : 'Trending Foods'}
              </Typography>
            </Stack>
            <Box sx={{ margin: '0 -16px' }}>
              <Slider {...sliderSettings}>
                {foodData.slice(0, 10).map((food: any, idx) => (
                  <Box key={idx} sx={{ px: 1, outline: 'none' }}>
                    <Card sx={{ 
                      borderRadius: 4, bgcolor: '#1e1e1e', overflow: 'hidden', 
                      position: 'relative', height: 220, ...hoverStyle 
                    }}>
                      <CardMedia
                        component="img"
                        height="220"
                        image={food.Food_picture || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                        alt={food.Food_name}
                        sx={{ filter: 'brightness(0.7)' }}
                      />
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="white" noWrap>
                          {food.Food_name}
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="body2" color="#ff9800" fontWeight="bold">
                            ฿{food.Food_price}
                          </Typography>
                          <Chip size="small" icon={<StarIcon sx={{color:'#FFD700'}}/>} label="4.8" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                        </Stack>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        )}

        {/* Nearby Restaurants */}
        <Box mb={4}>
          <Stack direction="row" alignItems="center" spacing={1} mb={3}>
            <LocationOnIcon sx={{ color: '#ff9800' }} />
            <Typography variant="h6" fontWeight="bold">
              {language === 'th' ? 'ร้านอาหารใกล้คุณ' : 'Nearby Restaurants'}
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {datasearch.map((d: any, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Card sx={{ 
                  borderRadius: 4, bgcolor: '#1e1e1e', border: '1px solid rgba(255,255,255,0.05)',
                  overflow: 'hidden', ...hoverStyle 
                }}>
                  <Box position="relative">
                    <CardMedia
                      component="img"
                      height="180"
                      image={d.shop_picture}
                      alt={d.shop_name}
                    />
                    {/* Tags overlay */}
                    <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 10, left: 10 }}>
                      {d.shop_text.toLowerCase().includes("halal") && (
                        <Chip size="small" label="Halal" sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 'bold' }} />
                      )}
                      {d.shop_text.toLowerCase().includes("vegetarian") && (
                        <Chip size="small" label="Vegan" sx={{ bgcolor: 'success.light', color: 'white', fontWeight: 'bold' }} />
                      )}
                    </Stack>
                  </Box>
                  
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="white" noWrap>
                      {d.shop_name}
                    </Typography>
                    
                    <Stack direction="column" spacing={1} mb={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {d.shop_location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {d.shop_time}
                        </Typography>
                      </Stack>
                      {d.shop_phone && (
                         <Stack direction="row" alignItems="center" spacing={1}>
                         <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                         <Typography variant="body2" color="text.secondary">
                           {d.shop_phone}
                         </Typography>
                       </Stack>
                      )}
                    </Stack>

                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        borderRadius: 8, bgcolor: '#ff9800', color: '#fff', fontWeight: 'bold',
                        '&:hover': { bgcolor: '#e68a00' }
                      }}
                      onClick={() => {
                        handleShopClick(d.shop_id);
                        navigate(`/Store_information?shop_id=${d.shop_id}&shop_name=${encodeURIComponent(d.shop_name)}&shop_picture=${encodeURIComponent(d.shop_picture)}&shop_location=${encodeURIComponent(d.shop_location)}&shop_phone=${encodeURIComponent(d.shop_phone)}&shop_time=${encodeURIComponent(d.shop_time)}&shop_text=${encodeURIComponent(d.shop_text)}`);
                      }}
                    >
                      {language === "th" ? "ดูเมนูร้านนี้" : "View Menu"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Bottom Navigation for Mobile */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' }, bgcolor: '#1e1e1e', zIndex: 1000 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
            if (newValue === 0) navigate('/Home');
            if (newValue === 1) navigate('/Search');
            if (newValue === 2) navigate('/Profile');
          }}
          sx={{ bgcolor: 'transparent', '& .Mui-selected': { color: '#ff9800' } }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ color: 'text.secondary' }} />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} sx={{ color: 'text.secondary' }} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} sx={{ color: 'text.secondary' }} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Home;
