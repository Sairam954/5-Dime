var express= require('express');
var app=express();
var mongoose=require('mongoose');
var loginrouter=express.Router();
var products=require('./models/products_model');
var user=require('./models/user_model');
 var cookieParser = require('cookie-parser');
  var  expressSession = require('express-session');
var db=mongoose.connect('mongodb://localhost:27017/EcommerceDatabase');
 var warnings={"existingEmail":"","wrongCredentials":""};
   
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

    



var port=5000;

app.use(expressSession({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2628000000 },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional 
        host: 'localhost', // optional 
        port: 27017, // optional 
        db: 'EcommerceDatabase', // optional 
        collection: 'sessions', // optional 
        expire: 86400 // optional 
    })
}));
app.use(function(req, res, next){
    
  if(req.session.logedin|| req.session.userName){
      
  }
    else
        {
    req.session.logedin=false;
             req.session.userName="";
        }
    //res.locals.user = false;
  next();
});


app.use(express.static('public'));
app.use(express.static('src/views'));

app.set('views','./src/views');

/*app.set('views',__dirname);*/
app.use('/loginorsignup',loginrouter);
app.set('views','./src/views');
app.set('view engine','ejs');
loginrouter.route('/register')
.post(function(req,res)
       {
          var userDetails={
                "firstName":req.body.fname,
                 "lastName":req.body.lname,
    "emailId":req.body.email,
    "password":req.body.password,
    "mobilebno":req.body.mnumber

            }
      
        console.log(userDetails.firstName); 
    user.count({"emailId":userDetails.emailId},function(err,results)
          {
            console.log(results);
              var count=JSON.parse(results);
                 var data={
                "count":count
                 };
              
              if(count>0)
                   {  
                       res.json(data);
                 
                  }
              else
                  {
                       var users=new user(userDetails);
                users.save();
                      req.session.userName=userDetails.firstName+userDetails.lastName;
                      data.userDetails=userDetails;
                        req.session.logedin=true;
                      data.logedin=true;
                      console.log(data.userDetails);
                      console.log("username"+req.session.userName);
                      data.userName=req.session.userName;
                      req.session.userDetails=data.userDetails;
                res.json(data);
    
                      
                  }
            
          });
});
loginrouter.route('/insertProducts')
.get(function(req,res)
     {
    products.insertMany([{
"department":"electronics",
"category":"mobile",
"productName":"Apple iPhone 6s (Rose Gold, 16GB)",
"price":44990,
"manufacturer":"apple",
"specifications":" 12MP primary camera with auto focus, 4K video recording, flash and 5MP front facing camera, 4.7-inch (11.4 centimeters) Retina HD 3D-touch capacitive touchscreen with 1334 x 750 pixels resolution and 326 ppi pixel density, iOS v9 operating system with A9 chip 64-bit architecture processor, 2GB RAM, 16GB internal memory and single nano SIM, Lithium-ion battery providing talk-time of 14 hours on 3G networks and standby time of 240 hours ",
"color":"Rose Gold",
"rating":"5",
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
"quantity":10,
"image":"http://ecx.images-amazon.com/images/I/81OYkMWueCL._SL1500_.jpg"

},
{
"department":"electronics",
"category":"mobile",
"productName":"Apple iPhone 5s (Silver, 16GB)",
"price":20100,
"manufacturer":"apple",
"specifications":" 8MP primary camera with true tone flash, auto focus, geo tagging, face detection burst mode, 1.2MP front facing camera with HD video recording and backside illumination sensor, 4-inch multi-touch retina display with 1136 x 640 pixels resolution, iOS 7 operating system with 16GB internal memory, Rechargable battery providing talk-time up to 10 hours on 3G network and standby time up to 250 hours ",
"color":"silver",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty for device and in-box accessories including batteries from the date of purchase ",
"quantity":5,
"image":"http://ecx.images-amazon.com/images/I/71yZcobCGpL._SL1500_.jpg"

},{
"department":"electronics",
"category":"mobile",
"productName":"Apple iPhone 6s (Space Grey, 16GB)",
"price":44999,
"manufacturer":"apple",
"specifications":" 12MP primary camera with auto focus, 4K video recording, flash and 5MP front facing camera, 4.7-inch (11.4 centimeters) Retina HD 3D-touch capacitive touchscreen with 1334 x 750 pixels resolution and 326 ppi pixel density, iOS v9 operating system with A9 chip 64-bit architecture processor, 2GB RAM, 16GB internal memory and single nano SIM, Lithium-ion battery providing talk-time of 14 hours on 3G networks and standby time of 240 hours ",
"color":"space grey",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase ",
"quantity":7,
"image":"http://ecx.images-amazon.com/images/I/81wzuEoQWRL._SL1500_.jpg"

},
{
"department":"electronics",
"category":"mobile",
"productName":"Samsung Galaxy J7 Prime SM-G610F (Gold, 16GB)",
"price":16900,
"manufacturer":"samsung",
"specifications":" 13MP f1.9 primary camera and 8MP f1.9 front facing camera, 13.97 centimeters (5.5-inch) TFT capacitive touchscreen with 1080 x 1920 pixels FHD display with metal unibody and fingerprint sensor, Android v6.0 Marshmallow operating system with Exynos octa core processor, 3GB RAM, 16GB internal memory expandable up to 256GB and dual SIM, 3300mAH lithium-ion battery ",
"color":"gold",
"rating":3,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase ",
"quantity":4,
"image":"http://ecx.images-amazon.com/images/I/31%2BjHSsqlsL.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"Samsung Galaxy S7 Edge SM-G935F (Silver-Titanium, 32GB) ",
"price":60000,
"manufacturer":"samsung",
"specifications":"12MP primary camera and 5MP front facing camera. For more details, refer section on Product Description, Delivered by Samsung authorized store, 1 year brand warranty for device and 6 months brand warranty for in-box accessories including batteries from the date of purchase, Hassle free Installation: Feature Demonstration, Phone Setup, SIM Swap/Resizing, Data Transfer, Phone/Data protection add on (standard product costs applicable), Accessories add on (standard product costs applicable)",
"color":"silver",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
"quantity":8,
"image":"http://ecx.images-amazon.com/images/I/31NhIgAwASL.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"Samsung Galaxy S6 Edge Plus (32GB, Silver Titanium)",
"price":56999,
"manufacturer":"samsung",
"specifications":" 16MP primary camera with LED flash, auto focus and 5MP front facing camera, 5.7-inch (14.47 centimeters) quad HD capacitive touchscreen with 2560 x 1440 pixels resolution and 518 ppi pixel density, Android v5.1 Lollipop operating system with 2.1GHz quad core + 1.5GHz quad core processor, 4GB RAM, 32GB internal memory and single SIM, 3000mAH lithium-ion battery ",
"color":"silver",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/718qA4NpkEL._SL1500_.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"HTC Desire 816G (Dual SIM, White)",
"price":15900,
"manufacturer":"htc",
"specifications":" 13MP primary camera with flash, 1080p video recording and 5MP front facing camera, 5.5-inch (13.97 centimeters) HD capacitive touchscreen with 780 x 1280 pixels resolution, Android v4.4.2 KitKat operating system with 1.3GHz quad core processor, 1GB RAM, 8GB internal memory expandable up to 32GB and dual SIM (GSM+GSM) Nano SIM, 2600mAH lithium-polymer battery providing talk-time of 10 hours and standby time of 460 hours on 3G networks ",
"color":"white",
"rating":3,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase ",
"quantity":4,
"image":"http://ecx.images-amazon.com/images/I/61vg-nHh0RL._SL1210_.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"HTC One E9 Plus (Gold Sepia)",
"price":26999,
"manufacturer":"htc",
"specifications":" 20MP primary camera with auto focus, BSI sensor, video recording and ultra pixel front facing camera, 5.5-inch (13.97 centimeters) WQHD capacitive touchscreen with 1440 x 2560 pixels resolution, Android v5 Lollipop operating system with 2GHz MediaTek Helio octa core processor, 3GB RAM, 32GB internal memory expandable up to 2TB and dual nano SIM (GSM+GSM), Supports 4G, 2800mAH Non-Removable lithium-ion battery providing talk-time of 21.55 hours on 2G, 14.33 hours on 3G and standby time of 590.43 hours on 2G, 617.27 hours on 3G networks ",
"color":"gold sepia",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/81qq0fhUFBL._SL1500_.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"HTC Desire 728 Smart Phone, Black/Gold",
"price":13784,
"manufacturer":"htc",
"specifications":" 13MP primary camera with auto focus and 2.2MP front facing camera, 5.5 inch Display with 720 x 1280 pixels resolution, Android operating system v5.1.1 (Lollipop), 2GB RAM, 16GB internal memory, 2800 mAh Li-Po battery providing talk-time of 26hours with stand by upto 496hours ",
"color":"black",
"rating":4,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase ",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/41wsMH0LavL.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"Lenovo Vibe K4 Note (Black, 16GB)",
"price":10999,
"manufacturer":"lenovo",
"specifications":"5.5inch (13.97cm) full HD 1920 x 1080 pixels IPS screen Gorilla glass display with 401ppi resolution - 450 Nits brightness & contrast ratio of 1000:1, First phone with TheaterMax technology and Dolby Atmos® surround sound over speakers, 13MP f2.2 primary camera with 5P lens element, dual LED dual tone flash, 5MP front camera with 4P lens element, Android v5.1 OS with 1.3 GHz Mediatek 6753 64-bit octa core processor, ARM Mali T720 GPU, 3 GB DDR3 RAM, 16GB internal memory (expandable up to 128GB) and dual micro SIM dual standby (4G+4G), 3300mAH lithium-ion battery with Fast Charger 2.0 providing talk-time of 29 hours",
"color":"black",
"rating":4,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase ",
"quantity":9,
"image":"http://ecx.images-amazon.com/images/I/41OwANQo7bL.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"Lenovo Vibe X2-AP (Gold)",
"price":12769,
"manufacturer":"lenovo",
"specifications":" 13MP primary camera with auto focus, LED flash and 5MP front facing camera with fixed focus, 5-inch (12.7 centimeters) full HD multi-touch capacitive touchscreen with 1920 x 1080 pixels resolution, Android v4.4 KitKat operating system with 2GHz MediaTek 6595m octa core processor, 2GB RAM, 32GB internal memory, dual micro and nano SIM (GSM+GSM), 2300mAH lithium-polymer embedded battery providing talk-time of 15.5 hours on 2G, 11 hours on 3G/4G and standby time of 180 hours on 2G, 204 hours on 3G and 180 hours on 4G networks ",
"color":"gold",
"rating":4,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase ",
"quantity":4,
"image":"http://ecx.images-amazon.com/images/I/41PVpDOB0HL.jpg"

}
,{
"department":"electronics",
"category":"mobile",
"productName":"Lenovo Vibe Shot (Graphite Grey 32GB)",
"price":22999,
"manufacturer":"lenovo",
"specifications":"16MP Rear, 8MP front camera, Manual shutter button, Camera with Pro and auto shooting modes, Optical Image stabilization &Low light sensor, Gorilla glass 3.0, 1.7GHz 64-bit octa core processor, 32GB Memory and 128GB expandable memory",
"color":"grey",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
"quantity":7,
"image":"http://ecx.images-amazon.com/images/I/518zSVjbISL.jpg"

}
,
{
"department":"electronics",
"category":"laptop",
"productName":"Dell Inspiron 15 5559 Notebook (6th Gen Intel Core i3- 4GB RAM- 1TB HDD- 39.62cm(15.6)- DOS) Black",
"price":29840,
"manufacturer":"dell",
"specifications":"2.3GHz Intel Core i3-6100U processor, 4GB DDR3 RAM, 1TB 5400rpm Serial ATA hard drive, 15.6-inch screen, Integrated Graphics, DOS",
"color":"black",
"rating":4,
"warrantyPeriod":"Dell laptops sold by sellers on Amazon.in carry a one year manufacturer warranty from Dell, from the date of purchase.",
"quantity":9,
"image":"http://ecx.images-amazon.com/images/I/41dPPUctnvL.jpg"
},{
"department":"electronics",
"category":"laptop",
"productName":"Dell Vostro-15 3559 3559541TBiBU 15.6-inch Laptop (Core i5-6200U/4GB/1TB/Ubuntu/Integrated Graphics), Black",
"price":36290,
"manufacturer":"dell",
"specifications":"2.8GHz Intel Core i5-6200U processor, 4GB DDR3 RAM, 1TB 5400rpm Serial ATA hard drive, 15.6-inch screen, Intel HD 520 Graphics, Ubuntu operating system",
"color":"black",
"rating":4,
"warrantyPeriod":"Dell laptops sold by sellers on Amazon.in carry a one year manufacturer warranty from Dell, from the date of purchase.",
"quantity":7,
"image":"http://ecx.images-amazon.com/images/I/41k5rlzMBFL.jpg"
},
{
"department":"electronics",
"category":"laptop",
"productName":"Apple MacBook Air MMGF2HN/A 13.3-inch Laptop (Core i5/8GB/128GB/Mac OS X/Integrated Graphics)",
"price":59991,
"manufacturer":"apple",
"specifications":"1.6GHz Intel Core i5 processor, 8GB DDR3 RAM, 128GB storage, 13.3-inch screen, Intel HD 6000 Graphics, Mac OS X operating system, 12 hours battery life, 1.4kg laptop",
"color":"white",
"rating":4,
"warrantyPeriod":"Apple MacBooks sold by sellers on Amazon.in carry Apple’s one year manufacturer warranty from date of purchase, subject to manufacturer’s own terms and conditions.",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/41GPeBcssaL.jpg"
},
{
"department":"electronics",
"category":"laptop",
"productName":"Apple Macbook Pro MD101HN/A 13-inch Laptop (Core i5/4GB/500GB/Mac OS Mavericks/Intel HD Graphics), Silver",
"price":50999,
"manufacturer":"apple",
"specifications":"2.5GHz Intel Core i5 Processor, 4GB DDR3 RAM, 500GB 5400rpm Hard drive, 13-inch Screen, Intel HD Graphics 4000, Mac OS X Mavericks Operating system, 1 Thunder bolt port, 13.3-inch Screen, Intel HD Graphics 4000",
"color":"silver",
"rating":4,
"warrantyPeriod":"Apple MacBooks sold by sellers on Amazon.in carry Apple’s one year manufacturer warranty from date of purchase, subject to manufacturer’s own terms and conditions.",
"quantity":3,
"image":"http://ecx.images-amazon.com/images/I/51jFJxwrxxL._SL1024_.jpg"
},
{
"department":"electronics",
"category":"laptop",
"productName":"Acer Aspire E5-572G (Core i5 4210U / 4GB / 1TB / 2gb NVIDIAA® GeForceA® 940M Graphics / Linux / Full HD Display (UN.MV2SI.001) ),Black",
"price":28490,
"manufacturer":"acer",
"specifications":"Intel Core i5 - 4th Gen, 4GB RAM, 1TB HDD, 15.6inch Full HD Screen & 2GB Graphics, Linux",
"color":"black",
"rating":4,
"warrantyPeriod":"1 Year Onsite Manufacturer Warranty.",
"quantity":4,
"image":"http://ecx.images-amazon.com/images/I/41C8hWjHMyL.jpg"
},
{
"department":"electronics",
"category":"laptop",
"productName":"Acer One S1002-15XR 10.1-inch Laptop (Intel Atom Z3735F/2GB/32GB + 500GB/Windows 10/Integrated Graphics)",
"price":17799,
"manufacturer":"acer",
"specifications":"1.33GHz Intel Z3735F Quad-core processor, 2GB DDR3L RAM, 32GB Flash Memory, 500GB HDD, 10.1-inch screen, Intel HD Graphics, Windows 10 operating system",
"color":"black",
"rating":4,
"warrantyPeriod":"1 Year Onsite Manufacturer Warranty.",
"quantity":12,
"image":"http://ecx.images-amazon.com/images/I/51PgRJSmS5L.jpg"
},
{
"department":"electronics",
"category":"camera",
"productName":"Canon EOS 1300D 18MP Digital SLR Camera (Black) with 18-55 and 55-250mm IS II Lens, 16GB Card and Carry Case",
"price":29995,
"manufacturer":"canon",
"specifications":" 18MP APS-C CMOS sensor and DIGIC 4+, 9-point AF with 1 center cross-type AF point, Standard ISO: 100 to 6400, expandable to 12800, Wi-Fi and NFC supported, Lens Mount: Canon EF mount ",
"color":"black",
"rating":5,
"warrantyPeriod":"one year standard warranty and one year additional warranty from the date of product purchase",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/811oich5fGL._SX522_.jpg"
},
{
"department":"electronics",
"category":"camera",
"productName":"Canon EOS 1200D 18MP Digital SLR Camera (Black) with 18-55mm and 55-250mm IS II Lens,8GB card and Carry Bag",
"price":27499,
"manufacturer":"canon",
"specifications":"18 megapixel CMOS (APS-C) image sensor, High-performance DIGIC 4 image processor, ISO 100-6400 (expandable to H: 12800) to shoot from bright to dim light, EOS full HD movie mode to capture brilliant results, Scene intelligent auto mode to deliver expertly optimized photos, 9-point AF system (including one center cross-type AF point) and AI servo, EOS 1200D digital SLR body",
"color":"black",
"rating":5,
"warrantyPeriod":"one year standard warranty and one year additional warranty from the date of product purchase",
"quantity":5,
"image":"http://ecx.images-amazon.com/images/I/41VA-%2BYM1VL.jpg"
},
{
"department":"electronics",
"category":"camera",
"productName":"Nikon D3400 24.2 MP Digital SLR Camera (Black) with AF-P DX NIKKOR 18-55mm f/3.5-5.6G VR Lens Kit with 8 GB Card and Camera Bag",
"price":28317,
"manufacturer":"nikon",
"specifications":"A helpful Guide Mode is available to aid in becoming acquainted with the D3400 through a series of step-by-step tutorials, A range of Special Effects are available to creatively refine the look of imagery in-camera, and include Night Vision, Super Vivid, Pop, Photo Illustration, Toy Camera Effect, Miniature Effect, Selective Color, Silhouette, High Key, and Low Key. ",
"color":"black",
"rating":5,
"warrantyPeriod":"one year standard warranty and one year additional warranty from the date of product purchase",
"quantity":7,
"image":"http://ecx.images-amazon.com/images/I/71DjqEeoijL._SL1500_.jpg"
},
{
"department":"electronics",
"category":"camera",
"productName":"Nikon D5200 24.1MP Digital SLR Camera (Black) with AF-S 18-55 mm VR II Kit Lens, Memory Card, Camera Bag",
"price":29495,
"manufacturer":"nikon",
"specifications":"Equipped with a 24.1 megapixel DX-format sensor, Powered with EXPEED 3 engine, Sensitivity range from ISO 100 to ISO 6400 and the best in class 39 point AF system, Live view mode for precise framing, Record full HD videos with amazing clarity in a wide range of frame rates, Comes with DSLR bag, EN-EL14 rechargeable Li-ion battery, battery charger, strap, USB cable, audio/video cable, Also includes eyepiece cap, accessory shoe cover, rubber eyecup, body cap, viewNX 2 CD-ROM and user manual, 8GB SD card and 18-55mm VR II kit lens",
"color":"black",
"rating":5,
"warrantyPeriod":"one year standard warranty and one year additional warranty from the date of product purchase",
"quantity":4,
"image":"http://ecx.images-amazon.com/images/I/41jj8vliejL.jpg"
},
{
"department":"electronics",
"category":"camera",
"productName":"Sony DSC W830 Cyber-shot 20.1 MP Point and Shoot Camera (Black) with 8x Optical Zoom, Memory Card and Camera Case",
"price":8249,
"manufacturer":"sony",
"specifications":"Super HAD CCD sensor with 20.1 effective megapixels, 720p MP4 movie mode the camera shoots 1280 x 720 high definition movies at 30 fps, 8x optical zoom Carl Zeiss Vario Tessar lens, Equipped with sweep panorama, intelligent auto and picture effect, 2.7-inch (230K dots) clear photo LCD display",
"color":"black",
"rating":3,
"warrantyPeriod":"one year standard warranty and one year additional warranty from the date of product purchase",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/71vdXwUnHRL._SL1200_.jpg"
},
{
"department":"electronics",
"category":"camera",
"productName":"Sony CyberShot DSC W830 20.1 MP Point and Shoot Camera (Pink) with 8x Optical Zoom, Memory Card and Camera Case",
"price":8989,
"manufacturer":"sony",
"specifications":"20.1 megapixel camera with 1/2.3 inch super HAD CCD image sensor, 720p MP4 movie mode the camera shoots 1280 x 720 high definition movies at 30 fps, The 8x zoom Carl Zeiss Vario Tessar lens helps you get much closer to your subjects, Has sweep panorama, intelligent auto and picture effect, Generous 2.7-inch (230K dots) Clear Photo LCD display features sharp, natural color that makes it easy to compose shots, read menus, and view photos, even in bright sunlight",
"color":"pink",
"rating":3,
"warrantyPeriod":"one year standard warranty and one year additional warranty from the date of product purchase",
"quantity":3,
"image":"http://ecx.images-amazon.com/images/I/71vfvZCwpyL._SL1200_.jpg"
},
{
"department":"electronics",
"category":"television",
"productName":"LG 43LH576T 108 cm (43 inches) Full HD Smart LED IPS TV (Black)",
"price":40910,
"manufacturer":"lg",
"specifications":" 108 centimeters LED Full HD 1920 x 1080, Connectivity HDMI: 1, USB Port: 1, FULL HD LED TV, SMART TV, MIRACAST & NETFLIX, YOUTUBE, 1 USB INPUT & 1 HDMI PORT ",
"color":"black",
"rating":5,
"warrantyPeriod":" 1 year warranty provided by the manufacturer from date of purchase ",
"quantity":6,
"image":"http://ecx.images-amazon.com/images/I/51%2BE%2BVemijL.jpg"
},
{
"department":"electronics",
"category":"television",
"productName":"LG 24LH458A 60 cm (24 inches) Full HD LED TV",
"price":12199,
"manufacturer":"lg",
"specifications":"61 centimeters LED 1920 x 1080 ",
"color":"black",
"rating":4,
"warrantyPeriod":"1 year warranty provided by the manufacturer from date of purchase ",
"quantity":4,
"image":"http://ecx.images-amazon.com/images/I/51b7ve108iL.jpg"
},
{
"department":"electronics",
"category":"television",
"productName":"Sony 80 cm (32 inches) BRAVIA KLV-32R302D HD Ready LED TV",
"price":22953,
"manufacturer":"sony",
"specifications":" HD, Clear Resolution Enhancer, 80 centimeters LED 1366 x 768, X-Protection PRO, Connectivity: HDMI*2, USB*1, Refresh Rate: 100 hertz, USB Multi Format Play and Multi Indian Languages,FM Radio, Clear Phase Speaker ",
"color":"black",
"rating":5,
"warrantyPeriod":"1 year warranty provided by the manufacturer from date of purchase",
"quantity":3,
"image":"http://ecx.images-amazon.com/images/I/71q%2BEXa91sL._SL1500_.jpg"
},
{
"department":"electronics",
"category":"television",
"productName":"Sony 108 cm (43 inches) BRAVIA KDL-43W800D Full HD 3D Android LED TV",
"price":59900,
"manufacturer":"sony",
"specifications":" Full HD, 108 centimeters Full HD LED 1920*1080, X-Reality PRO, Bass Reflex Speaker and Slice of Living Design ",
"color":"black",
"rating":5,
"warrantyPeriod":"1 year warranty provided by the manufacturer from date of purchase",
"quantity":7,
"image":"http://ecx.images-amazon.com/images/I/612MY126NQL._SL1500_.jpg"
},
{
"department":"electronics",
"category":"television",
"productName":"Panasonic 80 cm (32 inches) 32D400D HD Ready LED TV (Black)",
"price":15990,
"manufacturer":"panasonic",
"specifications":" 80 centimeters, HD Ready(1366*768), Connectivity : 1*HDMI,1*USB, Refresh Rate : 100 Hertz, IPS panel with wide viewing angle for high picture quality.Smooth reproduction of fast motion through 200 Hz Backlit Motion Rate, Dot noise reduction to reduce random picture noise and make images look clearer and crisper ",
"color":"black",
"rating":5,
"warrantyPeriod":"1 year manufacturer warranty from the date of purchase",
"quantity":9,
"image":"http://ecx.images-amazon.com/images/I/41Ajv12Ry5L.jpg"
},
{
"department":"electronics",
"category":"television",
"productName":"Panasonic TH-43DS630D 108 cm (43 inches) Full HD LED Smart IPS TV",
"price":51500,
"manufacturer":"panasonic",
"specifications":" 108 centimeters LED 1920 x 1080, Connectivity - Input: HDMI*3 , USB*2, Supported Audio Format: MP3, Supported Video Format: MPEG ",
"color":"silver",
"rating":3,
"warrantyPeriod":"1 year manufacturer warranty from the date of purchase",
"quantity":9,
"image":"http://ecx.images-amazon.com/images/I/41B5miqHtzL._SL1000_.jpg"
},{
"productName":"AND Women's Body Blouse Top",
"department":"women",
"category":"shirts, tops & tees",
"brand":"AND",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":1079,
"productDescription":"100% Polyester,Hand wash separately, use mild detergent, mild iron, Body Blouse, Three Quarter Sleeve, Round Neck",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/919BGTb4MDL._UL1500_.jpg"
},
{
"department":"women",
"category":"shirts, tops & tees",
"productName":"AND Women's Crop T-Shirt",
"brand":"AND",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":599,
"productDescription": "100% Polyester, Hand wash seperately, Crop, Sleeveless, Round Neck",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/81kFopC7YDL._UL1500_.jpg"
},
{
"department":"women",
"category":"shirts, tops & tees",
"productName":"Vero Moda Women's Regular Fit Casual Top",
"brand":"vero moda",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":598,
"productDescription": "100%Polyester, Plain Coloured, Regular Fit, Sleeveless, Wash dark color seperately",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/61M%2BtKNlPGL._UL1500_.jpg"
},{
"department":"women",
"category":"shirts, tops & tees",
"productName":"Vero Moda Women's Casual Top",
"brand":"vero moda",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":1198,
"productDescription": "100% Viscose,Embellished,Regular Fit, Sleeveless, Wash dark color seperately",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/71GPue4TujL._UL1500_.jpg"
},
{
"department":"women",
"category":"shirts, tops & tees",
"productName":"Chemistry Women's Tunic Top",
"brand":"chemistry",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":949,
"productDescription": "100% Viscose, Dark colours to be washed separately, Tunic, Long sleeve",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/91%2BMZA8gyKL._UL1500_.jpg"
},
{
"department":"women",
"category":"shirts, tops & tees",
"productName":"Chemistry Women's Button Down Shirt",
"brand":"chemistry",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":949,
"productDescription": "100% Cotton, Wash dark colours separately, Button down, long sleeve, Banded collar",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91P8tyJWqaL._UL1500_.jpg"
},
{
"department":"women",
"category":"kurtis",
"productName":"Biba Women's Straight Kurta",
"brand":"biba",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":719,
"productDescription": " Material: Cotton with long sleeve, Straight fit,Mid thigh, Wash separately in cold water, do not bleach, dry in shade, medium to hot iron, Casual wear ",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/810ARTN-cnL._UL1500_.jpg"
},
{
"department":"women",
"category":"kurtis",
"productName":"Biba Women's Asymmetrical Hemline Kurta",
"brand":"biba",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":799,
"productDescription": " Material: Rayon with three quarter sleeve and round neck, Asymmetrical hemline, Ankle length, Machine wash in cold water, light tumble dry, use mild detergent, do not bleach, cold iron, Casual",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/81T0gnm0COL._UL1500_.jpg"
},
{
"department":"women",
"category":"kurtis",
"productName":"W for Woman Women's Straight Kurta",
"brand":"W for Woman",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":779,
"productDescription": "Material: Satin with short sleeve and round neck, Straight fit, Knee length,Wash dark color separately, do not bleach, dry in shade, inside out, hot iron, Casual wear, Kurta length: 40.5 inches",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/71gXak94ycL._UL1500_.jpg"
},
{
"department":"women",
"category":"kurtis",
"productName":"W for Woman Women's Straight Kurta",
"brand":"W for Woman",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":1199,
"productDescription": " Material: Synthetic with long sleeves and round neck, Straight fit, Calf length, Dryclean only, Casual wear ",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/71L2HNIkl2L._UL1500_.jpg"
},
{
"department":"women",
"category":"kurtis",
"productName":"Aurelia Women's Straight Kurta",
"brand":"aurelia",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":769,
"productDescription": " Material: Synthetic with long sleeves and round neck, Straight fit, Calf length, Dryclean only, Casual wear ",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/81LK-djER9L._UL1500_.jpg"
},
{
"department":"women",
"category":"kurtis",
"productName":"Aurelia Women's Straight Kurta",
"brand":"aurelia",
"size":{"S":10,"M":10,"L":10},
"quantity":30,
"price":493,
"productDescription": " Material: Cotton with sleeveless and round neck, Straight fit, Ankle length, Hand wash,Casual wear, Kurta Length: 44 inches",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/81TP0U9ndGL._UL1500_.jpg"
},
{
"department":"women",
"category":"jeans",
"productName":"Levi Women's 711 Skinny Jeans",
"brand":"levi's",
"size":{"28":2,
"30":2,
"32":2,
"34":2,
"36":2},
"quantity":10,
"price":2799,
"productDescription": "68% Cotton, 23% polyester, 8% viscose and 1% elastaneSkinny fit,Inseam Length: 30 inches,Regular rise",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/81rfaAYsRJL._UL1500_.jpg"
},
{
"department":"women",
"category":"jeans",
"productName":"Levi's Women's 312 Shaping Slim Jeans",
"brand":"levi's",
"size":{"28":2,
"30":2,
"32":2,
"34":2,
"36":2},
"quantity":10,
"price":2499,
"productDescription": " 68% Cotton, 23% polyester, 8% viscose and 1% elastane,Shaping slim fit,Inseam Length: 30 inches,Regular rise",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/81ngCK7pC4L._UL1500_.jpg"
},
{
"department":"women",
"category":"jeans",
"productName":"Jealous 21 Women's Slim Jeans",
"brand":"jealous21",
"size":{"28":2,
"30":2,
"32":2,
"34":2,
"36":2},
"quantity":10,
"price":1359,
"productDescription": " 74% Cotton, 23% polyester and 3% elastane,Machine, hand wash, do not bleach, dry in shade, medium iron, use mild detergent onlySuper skinny fit,Zip fly with button closure,Regular rise,Inseam length: 31 inch",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91aPquBsgIL._UL1500_.jpg"
},
{
"department":"women",
"category":"jeans",
"productName":"Jealous 21 Women's Slim Jeans",
"brand":"jealous21",
"size":{"28":2,
"30":2,
"32":2,
"34":2,
"36":2},
"quantity":10,
"price":1429,
"productDescription": " 65% Cotton, 33% polyester and 2% elastane,Machine, hand wash, do not bleach, dry in shade, medium iron, use mild detergent onlyHottie fitRegular riseInseam length: 32 inchesLeg Style: Slim",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/81AQbVaaOhL._UL1500_.jpg"
},
{
"department":"women",
"category":"jeans",
"productName":"Lee Women's Skinny Jeans",
"brand":"lee",
"size":{"28":2,
"30":2,
"32":2,
"34":2,
"36":2},
"quantity":10,
"price":1159,
"productDescription": " 98% Cotton and 2% elastane,Zip fly wit button closure,Skinny,Waist style: High rise,Inseam length: 30 inch",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/91enU6AU7IL._UL1500_.jpg"
},
{
"department":"women",
"category":"jeans",
"productName":"Lee Women's Skinny Jeans",
"brand":"lee",
"size":{"28":2,
"30":2,
"32":2,
"34":2,
"36":2},
"quantity":10,
"price":1159,
"productDescription": " 98% Cotton and 2% elastane,Machine wash cold, colour may transfer, wash separately, use mild detergent, turn inside out before washing and drying, do not bleach, warm iron, do not wring, tumble dry or flat dry in shade, do not iron on print or embellishment/embroidery ,Denim,Skinny,Very low-rise,Inseam length: 31 inches,Clean",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/81XEQnsvZiL._UL1500_.jpg"
},
{
"department":"men",
"category":"shirts",
"productName":"Flying Machine Men's Casual Shirt",
"brand":"Flying Machine",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":849,
"productDescription": "97% Cotton and 3% spandex,Slim fit,Long sleeve,Made in India",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/61LWhd1jbqL._UL1500_.jpg"
},
{
"department":"men",
"category":"shirts",
"productName":"Flying Machine Men's Casual Shirt",
"brand":"Flying Machine",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":899,
"productDescription": " 100% Cotton Long sleeve,Slim fit,Button down,Made in India",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/91KmUIQGtKL._UL1500_.jpg"
},
{
"department":"men",
"category":"shirts",
"productName":"Buffalo Men's Casual Shirt",
"brand":"buffalo",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":1199,
"productDescription": " 100% Cotton,Regular fit,Wash separately in cold water, use mild detergent, do not bleach, dry in shade, warm iron,Made in India",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91NiicqXRVL._UL1500_.jpg"
},
{
"department":"men",
"category":"shirts",
"productName":"Buffalo Men's Casual Shirt",
"brand":"buffalo",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":1599,
"productDescription": " 100% Cotton,Regular fit,Wash separately in cold water, use mild detergent, do not bleach, dry in shade, warm iron,Made in India",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/91FWab4cAaL._UL1500_.jpg"
},
{
"department":"men",
"category":"shirts",
"productName":"Calvin Klein Men's Striped Casual Shirt",
"brand":"calvin klein",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":3439,
"productDescription": " Color: Grey,Material: Cotton,Pattern: Striped,Fit: Slim,Neck:Regular",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/918GMyQDRzL._UL1500_.jpg"
},
{
"department":"men",
"category":"shirts",
"productName":"Calvin Klein Men's White Solid Casual Shirt",
"brand":"calvin klein",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":4299,
"productDescription": " Color: White,Material: Cotton,Pattern: Solid,Fit: Slim,Neck:Regular",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/613JHOmGIeL._UL1500_.jpg"
},
{
"department":"men",
"category":"t-shirts",
"productName":"Aeropostale Men's T-Shirt",
"brand":"aeropostale",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":719,
"productDescription": " 100% Cotton,Half sleeve,Round neck,Regular fit,Machine was dry,Made in United States",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/816uRx%2Bv8hL._UL1500_.jpg"
},
{
"department":"men",
"category":"t-shirts",
"productName":"Aeropostale Men's T-Shirt",
"brand":"aeropostale",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":1079,
"productDescription": " 100% Cotton pique; 240 gsm solid,Half sleeve,Banded collar,Regular fit,Machine was dry,Made in India",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91hzrpqv3iL._UL1500_.jpg"
},
{
"department":"men",
"category":"t-shirts",
"productName":"UMM Men's T-Shirt",
"brand":"UMM",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":1079,
"productDescription": " 100% Cotton Slim fit180 gsm single jersey bio washed, crew necked half sleeve t-shirt with studs at front Wash dark colors separately, hand wash or machine wash cold, use mild detergent, do not wring, flat dry in shade, do not bleach, do not iron on print Made in India",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91EJr32Po1L._UL1500_.jpg"
},
{
"department":"men",
"category":"t-shirts",
"productName":"UMM Men's T-Shirt",
"brand":"UMM",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":779,
"productDescription": " 100% Cotton,Slim fit,180 gsm single jersey bio washed, crew neck t-shirt with zipper at chest for styling,Wash dark colors separately, hand wash or machine wash cold, use mild detergent, do not wring, flat dry in shade, do not bleach, do not iron on print,Made in India",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91ohdTuieXL._UL1500_.jpg"
},
{
"department":"men",
"category":"t-shirts",
"productName":"Arrow Sports Men's Polo",
"brand":"arrow",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":899,
"productDescription": " 100% Cotton Half sleeve regular fit Machine wash Made in India",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/91AJbSj4wGL._UL1500_.jpg"
},
{
"department":"men",
"category":"t-shirts",
"productName":"Arrow Men's T-Shirt",
"brand":"arrow",
"size":{"XXL":5,
"XL":5,
"L":5,
"M":3,
"S":3},
"quantity":21,
"price":1329,
"productDescription": " Material: Cotton,Fit Type: Regular Fit",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/61mxNwPMDsL._UL1500_.jpg"
},
{
"department":"men",
"category":"jeans",
"productName":"Levi's Men's 511 Slim Fit Jeans",
"brand":"levi's",
"size":{"32":5,
"34":5,
"36":5,
"38":3,
"40":3},
"quantity":21,
"price":1559,
"productDescription": " 100% Cotton,Zip fly with button closure,Slim fit jeans with straight leg,Denim weave with solid pattern jeans,Stretchable jeans,Made in India",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/81LeMlrqcQL._UL1500_.jpg"
},
{
"department":"men",
"category":"jeans",
"productName":"Levi's Men's 65504 Slim Fit Jeans",
"brand":"levi's",
"size":{"32":5,
"34":5,
"36":5,
"38":3,
"40":3},
"quantity":21,
"price":1699,
"productDescription": "99% Cotton and 1% elastane Zip fly with button closure Slim fit with tapered legs Made in India",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91nmw9zqNFL._UL1500_.jpg"
},
{
"department":"men",
"category":"jeans",
"productName":"Bare Men's Slim Fit Jeans",
"brand":"bare",
"size":{"32":5,
"34":5,
"36":5,
"38":3,
"40":3},
"quantity":21,
"price":1169,
"productDescription": "100% Cotton Zip fly with button closure Slim fit jeans with straight legs Wash dark colours separately,turn inside out before washing and drying do not bleach tumble dry normal use warm iron Leather patch at waist band Bare men denim jeans",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/91yYWutJaoL._UL1500_.jpg"
},
{
"department":"men",
"category":"jeans",
"productName":"Bare Men's Slim Fit Jeans",
"brand":"bare",
"size":{"32":5,
"34":5,
"36":5,
"38":3,
"40":3},
"quantity":21,
"price":1079,
"productDescription": "100% Cotton Zip fly with button closure Slim fit jeans with straight legs Wash dark colours separately,turn inside out before washing and drying do not bleach tumble dry normal use warm iron Leather patch at waist band Bare men denim jeans",
"rating":3,
"image":"http://ecx.images-amazon.com/images/I/91kvFTus%2B0L._UL1500_.jpg"
},
{
"department":"men",
"category":"jeans",
"productName":"Jack & Jones Men Casual Jeans",
"brand":"jack & jones",
"size":{"32":5,
"34":5,
"36":5,
"38":3,
"40":3},
"quantity":21,
"price":2997,
"productDescription": " Cotton,Slim Fit,Solid,Low Rise,Wash dark colors seperately",
"rating":5,
"image":"http://ecx.images-amazon.com/images/I/61fSXi961GL._UL1500_.jpg"
},
{
"department":"men",
"category":"jeans",
"productName":"Jack & Jones Men Skinny Fit Casual Jeans",
"brand":"jack & jones",
"size":{"32":5,
"34":5,
"36":5,
"38":3,
"40":3},
"quantity":21,
"price":2887,
"productDescription": " Cotton Solid Skinny Fit Low Rise Wash dark color seperately",
"rating":4,
"image":"http://ecx.images-amazon.com/images/I/61SCaCcGbzL._UL1500_.jpg"
}
],function(err,docs){
        
     if(err)
         {
             console.log(err);
         }
        res.json({"status":true});
    });
        


});




loginrouter.route('/login')
.post(function(req,res)
     {
        
        var loginDetails={
                "email":req.body.emailId.toLowerCase(),
                "password":req.body.password
        
        }
    
    
        user.count({"emailId":loginDetails.email}&&{"password":loginDetails.password},function(err,results)
         {   var count=JSON.parse(results);
          
            var data={
                "count":count,
                "logedin": req.session.logedin,
                
            };
          
           
        
           
            
              if(count>0)
                  {
                      
                    
                       user.find({"emailId":req.body.emailId.toLowerCase()},function(err,docs)
                                {
                           console.log(docs);
                           data.userDetails=docs[0];
                            console.log(data.userDetails);
                           req.session.userDetails=data.userDetails;
                      req.session.userName=data.userDetails.firstName+data.userDetails.lastName;
                     data.userName=req.session.userName;
                      console.log(req.session.userName);
                       req.session.logedin=true;
                      data.logedin=true;
                      res.json(data);
                   
                       });
                     
                  }
                  else
                      {
                          
                          res.json(data);
                      }
                     
        
            
          })
    
    
})
  
   
    
app.get('/productsdata',function(req,res)
        { 
        products.aggregate(
   [ { $sample: { size: 4 } } ],function(err,docs)
            {
                res.json(docs);
            }
)
            
        });

app.get('/refresh',function(req,res)
{  console.log(req.session.logedin);
    var data={
    "logedin":req.session.logedin,
        "userName":req.session.userName,
        "userDetails":req.session.userDetails
    };
 res.json(data);
//res.render('index');
});
app.post('/refresh',function(req,res)
{  console.log(req.session.logedin);
    var data={
    "logedin":req.session.logedin,
        "userName":req.session.userName,
        "userDetails":req.session.userDetails
    };
 res.json(data);
//res.render('index');
});
app.post('/logout',function(req,res)
{  req.session.logedin=false;
    req.session.userName="";
    var emailId=req.session.userDetails.emailId;
    
    var data={
    "logedin":req.session.logedin,
     "userName":req.session.userName  
    };
 user.update({ emailId:emailId},{
   $set: {
     "attocart":[]}},function(err,docs){});
  user.update(
   { emailId: emailId },
   { $push: { attocart: { $each: req.body.itemArray} } },function(err,docs){
       if(err)
           {
               console.log(err);
           }
       else
           {
               console.log(docs);
              
           }
       
       
   }
)
   user.update(
   { emailId: emailId },
   { $push: { wishlist: { $each: req.body.wishListArray} } },function(err,docs){
       if(err)
           {
               console.log(err);
           }
       else
           {
               console.log(docs);
              
           }
       
       
   }
)
 res.json(data);
//res.render('index');
});
app.post('/editprofile',function(req,res)
 { 
	
    
    var newdata={
        "password":req.body.password,
        "address":req.body.address,
        "mobilebno":req.body.mobilebno,
        "email":req.body.email
    };
    console.log(newdata);
  
user.update({ emailId:newdata.email },{
   $set: {
     "mobilebno":newdata.mobilebno,
       "password":newdata.password,
       "address":newdata.address
     }
    },function(err,updated){
     var data={
         "updated":false
     }
        if(err)
            {
                res.json(data);
            }
    else{
        data.updated=true;
        console.log(updated);
        res.json(data);
    }
});
});
app.get('/home',function(req,res)
       {
    console.log(" recvd req");
  
  products.find(function(err,docs)
  {
    console.log(docs);
      res.json(docs);
  });
    
});
app.post('/men',function(req,res)
 { console.log(res.locals.user+"localvariable");
	
    
    var category=req.body.category;
     
  products.find({$and:[{department:{$ne:"women"}},{category:{$eq:category}}]},function(err,docs)
  {
      res.json(docs);
  });
});
app.get('/men',function(req,res)
       {
    console.log(" recvd req");
  
  products.find({department:{$eq:"men"}},function(err,docs)
  {
    console.log(docs);
      res.json(docs);
  });
    
});
app.get('/women',function(req,res)
       {
    console.log(" recvd req");
  
  products.find({department:"women"},function(err,docs)
  {
    console.log(docs);
      res.json(docs);
  });
    
});
app.post('/women',function(req,res)
 { 
    console.log(req.body.category);
    var category=req.body.category;
     
  products.find({$and:[{department:{$ne:"men"}},{category:{$eq:category}}]},function(err,docs)
  {
    console.log(docs);
      res.json(docs);
  });
});
app.get('/electronics',function(req,res)
       {
    console.log(" recvd req");
  
  products.find({department:"electronics"},function(err,docs)
  {
    console.log(docs);
      res.json(docs);
  });
    
});
app.post('/electronics',function(req,res)
 { 
    console.log(req.body.category);
    var category=req.body.category;
     
  products.find({$and:[{department:{$eq:"electronics"}},{category:{$eq:category}}]},function(err,docs)
  {
    console.log(docs);
      res.json(docs);
  });
});
app.post('/search',function(req,res){
    req.session.searchedvalues=req.body.searchValue;
    var searchItem=req.body.searchValue;
     console.log("Search result "+req.session.searchedvalues);
  
    
  products.find( { $text: { $search:searchItem } },{ score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } ).exec(function(err,docs){
      
        console.log(docs);
      res.json(docs);
    
  });
});
app.post('/placeorder',function(req,res){
    
    var emailId=req.session.userDetails.emailId;
    
    console.log("data"+req.body.itemArray);
    
    
    user.update(
   { emailId: emailId },
   { $push: { orders: { $each: req.body.itemArray} } },function(err,docs){
       if(err)
           {
               console.log(err);
           }
       else
           {
               console.log(docs);
               console.log("len "+req.body.itemArray.length);
               if(req.session.userDetails.orders==null)
               {req.session.userDetails.orders=[];
               }
               for(var i=0;i<req.body.itemArray.length;i++)
                   { console.log(req.session.userDetails);
                 
               req.session.userDetails.orders.push(req.body.itemArray[i]);
                   }
               var updated={"status":true};
               res.json({"status":true});
           }
       
       
   }
)
    
});

app.listen(5000,function(err)
{
	console.log("running server on port "+port);
	
}); 
