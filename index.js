const express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')

var cors = require('cors')

const { testDbConnection } = require('./servises/connection/database')
const app = express();
app.use(cookieParser())

const registration = require('./servises/routes/registration');
const carousel = require('./servises/routes/dashbordRoutes/carousel');
const slider = require('./servises/routes/dashbordRoutes/slider');
const categories = require('./servises/routes/dashbordRoutes/categories');
const subCategories = require('./servises/routes/dashbordRoutes/subCategories');
const brand = require('./servises/routes/dashbordRoutes/brand')
const payment = require('./servises/routes/dashbordRoutes/payment')
const jewellery = require('./servises/routes/jewelleryDetailsRoutes/jewelleryDetailsRoutes')
const clothings = require('./servises/routes/clothingDetailRoute/clothingDetailRoute')
const eyewear = require('./servises/routes/eyewearDetailsRoutes/eyewearDetailsRoutes')
const bags = require('./servises/routes/bagsDetailsRoutes/bagsDetailsRoutes')
const footwear = require('./servises/routes/footwearDetailsRoutes/footwearDetailsRoutes')
const address = require('./servises/routes/address')
const lenskartPayment = require('./servises/routes/dashbordRoutes/lenskartPayment')
const trackShipment = require('./servises/routes/trackShipment')
const cashfreePayment = require('./servises/routes/cashfreePayment')
const getAllCetegory = require('./servises/routes/getAllCetegoryRoutes')
const adminUser = require('./servises/routes/adminUserRoutes/adminUsersRoute')
const shiprocket = require('./servises/routes/shiproketOrder')
const bargain = require('./servises/routes/bargainRoutes/bargains')
const productLink = require('./servises/routes/productLinkRoutes/productLink')
const addtocart = require('./servises/routes/cartRoutes')


testDbConnection();

let PORT = process.env.PORT || 8000;

// Parse JSON-encoded bodies
// app.use(bodyParser.json());

// Parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON-encoded bodies with limit
app.use(bodyParser.json({ limit: '100mb' }));

// Parse URL-encoded bodies with limit
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// app.use(cors())
// app.use(cors({
//   origin: "*",
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://admin.matteo-bianchi.com",
    "https://matteo-bianchi.com"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
}));

// app.use(cors({
//   origin: [
//     "https://admin.matteo-bianchi.com",
//     "https://matteo-bianchi.com"
//   ],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"],
//   credentials: true,
// }));

// IMPORTANT: Allow preflight requests
app.options("*", cors());


app.use('/uploads', express.static("uploads"));

// Routes
app.use('/', registration);
app.use('/', carousel);
app.use('/', slider);
app.use('/', categories);
app.use('/', subCategories);
app.use('/', brand);
app.use('/', payment);
app.use('/', address);
app.use('/api', jewellery)
app.use('/api', clothings)
app.use('/api', eyewear)
app.use('/api', bags)
app.use('/api', footwear)

app.use('/api', getAllCetegory)
app.use('/api/payment', lenskartPayment);
app.use('/api/tracking', trackShipment);
app.use('/api', cashfreePayment)
app.use('/api', adminUser)
app.use('/shiprocket', shiprocket)
app.use('/api', bargain)
app.use('/api', productLink)
app.use('/api', addtocart)


app.get('/hello', (req, res) => {
  res.send({ 'message': 'hello user i am here' })
})

// app listen
app.listen(PORT, () => {
  console.log(`Server started at https//localhost:${PORT}...`)
});

