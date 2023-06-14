

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use('/static', express.static('./images'))


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/items", (req, res) => {
  console.log("we are sending data");


  const img_root = "/static"

  const items = [
            {
                "id": "a",
                "images": [1,2,3,4].map((x) => {return img_root+"/cleaver/"+x+".webp"}),
                "title": "Cleaver",
                "price": 200,
                "desc": "Made for the toughest cutting jobs in the kitchen",
                "descMore": "The epitome of culinary craftsmanship featuring a damascus blade and a luxurious sycamore handle. Meticulously handcrafted, this masterpiece combines the unrivaled strength and sharpness of Damascus steel with the natural elegance of sycamore wood. " +
                    "This knife offers a comfortable and secure grip, elevating your culinary experience to new heights of sophistication. " +
                    "Unleash your culinary creativity and embrace the art of cooking with this heirloom-worthy Damascus cleaver knife, a true treasure for passionate chefs and connoisseurs of exceptional cutlery.",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "8 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm",
                    "manufacturer": "Hazen"

                }
            },
            {
                "id": "b",
                "images": [1,2,3,4].map((x) => {return img_root+"/Santoku/"+x+".webp"}),
                "title": "Santoku",
                "price": 120,
                "desc": "The classic japanese Santoku",
                "descMore": "The Santoku knife, meaning \"three virtues\" in Japanese, embodies its name by excelling in three primary functions: slicing, chopping, and mincing. The santoku wields a scalloped flat edge over the western style chef's knife for faster and more efficient work using a straight up and down chopping motion rather than the rocking motion used by its counterpart. The flatter blade also allows it to be sharpened to a finer edge",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "8 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm",
                    "manufacturer": "Hazen"

                }
            },
            {
                "id": "c",
                "images": [1,2,3,4].map((x) => {return img_root+"/chef/"+x+".webp"}),
                "title": "Chef Knife",
                "price": 120,
                "desc": "The classic western style chef's knife",
                "descMore": "The classic western style chef's knife, the main tool for professional chefs and home cooks alike. Featuring an 8-inch damascus blade",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "8 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm",
                    "manufacturer": "Hazen"


                }
            },
            {
                "id": "d",
                "images": [1,2,3,4].map((x) => {return img_root+"/5in/"+x+".webp"}),
                "title": "Utility Knife",
                "price": 95,
                "desc": "5-inch utility knife",
                "descMore": "The modest priced go-to all-arounder for any task, from cutting up fruit for a midnight snack to tackling more intricate culinary creations, the 5-inch utility knife effortlessly embodies versatility. Its nimble size and agile blade make it perfect for precise slicing of herbs, dicing garlic, or even meticulously deboning poultry.",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "5 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm",
                    "manufacturer": "Hazen"
                }
            },

            {
                "id": "e",
                "images": [1,2,3,4].map((x) => {return img_root+"/stand/"+x+".webp"}),
                "title": "Acacia display stand",
                "price": 49,
                "desc": "Magnetic stand with a glass cover",
                "descMore": "Show off your beautiful collection while shielding them from from dust and debris. Made from Acacia wood, it uses strong magnets to firmly hold up to 4 full sized knifes on display",
                "info": {
                    "wood": "Acacia",
                    "Dimensions": "8 inch width \n 8 inch width",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm",
                    "manufacturer": "Hazen"

                }
            },
        ]
  res.json({ "items": items });
});