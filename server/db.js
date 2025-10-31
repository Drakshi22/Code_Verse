const mon = require("mongoose");
require('dotenv/config');
const connectToMongo=async (url)=>{
    return mon.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.warn("DB is now connected");
    }) . catch((req)=>{
        console.warn("Error " + req );
    })
}
module.exports={connectToMongo};