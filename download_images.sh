#!/bin/bash
mkdir -p src/assets/images

download() {
  curl -sL "$1" -o "src/assets/images/$2"
  echo "Downloaded $2"
}

download "https://png.pngtree.com/thumb_back/fh260/background/20210729/pngtree-korean-autumn-eve-traditional-festival-food-background-image_753942.jpg" "AddDataShop_bg.jpg"
download "https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg" "Editstore_bg1.jpg"
download "https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg" "pexels-616401.jpeg"
download "https://www.tornok.com/wp-content/uploads/2015/03/uk-flag.png" "uk-flag.png"
download "https://cdn.pixabay.com/photo/2013/07/12/17/58/thailand-152711_1280.png" "thailand-flag.png"
download "https://www.lsfpackaging.com/images/editor/21-%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AE%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%A5%E0%B8%84%E0%B8%B7%E0%B8%AD_Pic.jpg" "halal_icon.jpg"
download "https://png.pngtree.com/png-vector/20191030/ourlarge/pngtree-icon-for-vegan-food-vector-illustration-symbols-isolated-on-white-background-png-image_1870591.jpg" "vegan_icon.jpg"
download "https://msnbcnewslive.com/wp-content/uploads/2023/10/201508141447.jpeg" "mangswirat_icon.jpeg"
download "https://media.tenor.com/A9FWShnz51oAAAAi/bow.gif" "bow.gif"
download "https://www.southernliving.com/thmb/dvvxHbEnU5yOTSV1WKrvvyY7clY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205217071-2000-2a26022fe10b4ec8923b109197ea5a69.jpg" "notshowfood_bg.jpg"
download "https://png.pngtree.com/background/20211215/original/pngtree-rice-spoon-korean-food-traditional-background-picture-image_1452789.jpg" "AddFood_bg.jpg"
download "https://img.freepik.com/free-photo/aerial-view-hot-tea-drink-break-relaxation-concept-with-copy-space_53876-20523.jpg" "Logout_bg.jpg"
download "https://png.pngtree.com/background/20210715/original/pngtree-background-food-sketch-kitchen-object-vegetable-food-material-linear-draft-picture-image_1300283.jpg" "Login_bg.jpg"
download "https://png.pngtree.com/thumb_back/fw800/background/20210115/pngtree-hand-drawn-food-sketch-kitchen-objects-food-background-image_528689.jpg" "Register_bg.jpg"
download "https://media.istockphoto.com/id/494412828/photo/healthy-foods-background.jpg" "Store_information_bg.jpg"
download "https://images.pexels.com/photos/326333/pexels-photo-326333.jpeg" "Home_bg.jpeg"
