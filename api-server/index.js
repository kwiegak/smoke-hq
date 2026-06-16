const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
/* 
  IMPORTANT:
    ***NEVER*** store credentials unencrypted like this.
    This is for demo purposes only in order to simulate a functioning API serverr.
*/
const users = {
  "jim@joesrobotshop.com": {
    firstName: "Jim",
    lastName: "Cooper",
    email: "jim@joesrobotshop.com",
    password: "very-secret",
  },
  "joe@joesrobotshop.com": {
    firstName: "Joe",
    lastName: "Eames",
    email: "joe@joesrobotshop.com",
    password: "super-secret",
  },
};
let cart = [];

// use this to add a 1 second delay to all requests
// app.use(function (req, res, next) {
//   setTimeout(next, 1000);
// });

app.get("/api/products", (req, res) => {
  let products = [
    {
      id: 1,
      description:
        "Upgrade your collection with the Emerald Series Beaker Bong, a sleek and durable piece designed for smooth performance and timeless style. Crafted from premium borosilicate glass with vibrant green accents, this water pipe combines functionality, stability, and elegant design in one impressive package.",
      name: "Emerald Series Beaker Bong – 12\" Premium Glass Water Pipe",
      imageName: "glass-2.png",
      category: "Glass",
      price: 59.99,
      discount: 0.2,
    },
    {
      id: 17,
      description: "Smoke HQ Premium THCA Gummies are made with carefully selected hemp-derived ingredients and infused with premium THCA extract. Each gummy delivers a precise 25mg serving in a delicious mixed fruit flavor blend. Whether you're relaxing after a long day or simply looking for a convenient alternative to traditional hemp products, these gummies provide a discreet and enjoyable experience.",
      name: "Smoke HQ Premium THCA Gummies – Mixed Fruit",
      imageName: "gummies-1.png",
      category: "Edibles",
      price: 8.99,
      discount: 0,
    },
    {
      id: 6,
      description:
        "Experience bold flavor and long-lasting performance with the Vapor X Pro 8000. Designed for convenience and portability, this premium disposable vape combines sleek aesthetics, advanced airflow technology, and an impressive puff capacity in a compact device.",
      name: "Vapor X Pro 8000 Disposable Vape",
      imageName: "vape-1.png",
      category: "Vapes",
      price: 21.99,
      discount: 0,
    },
    {
      id: 2,
      description:
        "Bring style and sophistication to your next session with the Emerald Oasis Hookah. Featuring elegant green glass accents, polished metal construction, and a traditional-inspired design, this premium hookah delivers smooth performance while serving as a stunning centerpiece for any collection.",
      name: "Emerald Oasis Hookah – Premium Single Hose Edition",
      imageName: "glass-3.png",
      category: "Glass",
      price: 89.99,
      discount: 0.2,
    },
    {
      id: 3,
      description:
        "Add a touch of style to your collection with the Blue Galaxy Glass Hand Pipe. Featuring a stunning swirl of deep blues, shimmering metallic accents, and crystal-clear borosilicate glass, this handcrafted piece combines eye-catching design with everyday functionality.",
      name: "Blue Galaxy Glass Hand Pipe",
      imageName: "glass-1.png",
      category: "Glass",
      price: 6.99,
      discount: 0,
    },
    {
      id: 16,
      description:
        "Treat yourself to a burst of flavor with Cosmic Rings THCA Sour Gummies. These colorful fruit-flavored gummies combine mouthwatering sweet-and-sour taste with premium hemp-derived THCA in a convenient, resealable pouch. Crafted for consistency and quality, Cosmic Rings are a customer favorite for those seeking a delicious edible experience.",
      name: "Cosmic Rings THCA Sour Gummies – Mixed Fruit Edition",
      imageName: "gummies-2.png",
      category: "Edibles",
      price: 24.99,
      discount: 0.1,
    },
    {
      id: 13,
      description: "Experience the sweet aroma and exceptional quality of Strawberry Dream THCA Flower. Carefully cultivated indoors and expertly cured for maximum freshness, this premium hemp flower delivers dense, frosty buds with a rich terpene profile and eye-catching appearance.",
      name: "Strawberry Dream THCA Flower – Premium Indoor Cultivated",
      imageName: "flower-2.png",
      category: "Flower",
      price: 19.99,
      discount: 0,
    },
    {
      id: 7,
      description:
        "Experience premium performance and modern design with the Apex X1 Pro Vape Kit. Featuring a sleek metal finish, adjustable power settings, and a crystal-clear refillable tank, this advanced device is built for users who want customization, reliability, and style in one compact package.",
      name: "Apex X1 Pro Vape Kit",
      imageName: "vape-2.png",
      category: "Vapes",
      price: 49.99,
      discount: 0,
    },

    {
      id: 4,
      description: "Enjoy the perfect balance of portability and water filtration with the Ocean Mist Glass Bubbler. Combining the convenience of a hand pipe with the smooth performance of a water pipe, this beautifully crafted piece features crystal-clear glass accented with vibrant cobalt blue details for a clean, modern look.",
      name: "Ocean Mist Glass Bubbler – Compact Water Pipe",
      imageName: "glass-4.png",
      category: "Glass",
      price: 79.99,
      discount: 0,
    },
    {
      id: 9,
      description:
        "Enjoy smooth vapor, rich flavor, and reliable performance with the Golden Reserve Vape Cartridge. Filled with premium golden distillate and designed for compatibility with most 510-thread batteries, this cartridge offers a convenient and discreet vaping experience.",
      name: "Golden Reserve Vape Cartridge – Premium Distillate Series",
      imageName: "vape-3.png",
      category: "Vapes",
      price: 24.99,
      discount: 0.1,
    },
    {
      id: 15,
      description: "Indulge in rich chocolate flavor with Midnight Fudge THCA Brownie Bites. Crafted with premium cocoa and infused with hemp-derived THCA, these decadent bite-sized treats offer a delicious alternative to traditional edible products. Each piece is individually portioned for convenience and consistency.",
      name: "Midnight Fudge THCA Brownie Bites – Premium Chocolate Collection",
      imageName: "gummies-3.png",
      category: "Edibles",
      price: 27.99,
      discount: 0,
    },
    {
      id: 10,
      description: "Enjoy bold flavors and hassle-free convenience with the CloudBurst 5500 Disposable Vape. Designed for portability and long-lasting performance, this sleek device delivers smooth draws, vibrant flavor, and impressive battery life in a stylish, ready-to-use package.",
      name: "CloudBurst 5500 Disposable Vape",
      imageName: "vape-4.png",
      category: "Vapes",
      price: 18.99,
      discount: 0,
    },
    {
      id: 11,
      description:
        "Experience legendary quality with Northern Lights THCA Flower, a premium indoor-grown hemp flower inspired by one of the most iconic strain profiles in the industry. Featuring dense, frosty buds and a rich terpene profile, Northern Lights delivers exceptional craftsmanship and top-shelf appeal.",
      name: "Northern Lights THCA Flower – Premium Indoor Cultivated",
      imageName: "flower-3.png",
      category: "Flower",
      price: 39.99,
      discount: 0,
    },
    {
      id: 14,
      description: "Satisfy your sweet tooth with Peanut Butter Bliss THCA Cookies, a delicious edible crafted for those who love classic homemade cookie flavor. Featuring rich peanut butter taste and soft-baked texture, these premium cookies are infused with hemp-derived THCA and packaged in a convenient resealable pouch.",
      name: "Peanut Butter Bliss THCA Cookies – Gourmet Baked Collection",
      imageName: "gummies-4.png",
      category: "Edibles",
      price: 29.99,
      discount: 0,
    },
    {
      id: 5,
      description:
        "Experience advanced filtration and modern craftsmanship with the Emerald Cyclone Recycler. Designed with an intricate recycling chamber system and eye-catching emerald accents, this premium glass piece delivers exceptional performance while making a bold statement in any collection.",
      name: "Emerald Cyclone Recycler – Premium Glass Recycler Rig",
      imageName: "glass-5.png",
      category: "Glass",
      price: 59.99,
      discount: 0,
    },
    {
      id: 8,
      description: "Keep your device performing at its best with PodFlex Elite Replacement Pods. Designed for smooth flavor delivery and dependable performance, these premium refillable pods feature leak-resistant construction, integrated mesh coil technology, and a convenient snap-in design for effortless installation.",
      name: "PodFlex Elite Replacement Pods – Premium Refillable Cartridge System",
      imageName: "vape-5.png",
      category: "Vapes",
      price: 29.99,
      discount: 0,
    },
    {
      id: 12,
      description: "Discover exceptional quality with Emerald Reserve THCA Flower, a premium indoor-grown hemp flower cultivated for rich aroma, dense buds, and impressive cannabinoid content. Carefully trimmed and cured to perfection, this top-shelf flower offers a premium experience for enthusiasts seeking quality and consistency.",
      name: "Emerald Reserve THCA Flower – Premium Indoor Grown",
      imageName: "flower-1.png",
      category: "Flower",
      price: 29.99,
      discount: 0,
    }
  ];
  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

app.post("/api/register", (req, res) =>
  setTimeout(() => {
    const user = req.body;
    if (user.firstName && user.lastName && user.email && user.password) {
      users[user.email] = user;
      res.status(201).send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(500).send("Invalid user info");
    }
  }, 800)
);

/* IMPORTANT:
    The code below is for demo purposes only and does not represent good security
    practices. In a production application user credentials would be cryptographically 
    stored in a database server and the password should NEVER be stored as plain text. 
*/
app.post("/api/sign-in", (req, res) => {
  const user = users[req.body.email];
  if (user && user.password === req.body.password) {
    res.status(200).send({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(401).send("Invalid user credentials.");
  }
});

app.listen(8081, () => console.log("API Server listening on port 8081!"));
