const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");


main()
.then(()=>{
    console.log("connected to db");
})
.catch(err=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/hackathon');
 }


 const initdb = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data was initialized successfully!");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};
initdb();
