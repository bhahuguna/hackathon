const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodoverride=require("method-override");
// const {listingSchema}=require("./schema.js");
const wrapAsync=require("./utils/wrapAsync.js");

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


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

// app.get("/listings/:id",async (req,res)={
//     let{id}=req.params;
//     const listing=await Listing.findById(id);

// })


app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find();
    // console.log(allListings);
res.render("listings/index.ejs",{allListings});
})

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
//show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create route
app.post("/listings",wrapAsync(async(req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    // console.log(req.body);
    await newListing.save();
   res.redirect("/listings");
//    next(err);
}))
//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body);
    res.redirect("/listings");
})

//delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
})

app.get("/err",(req,res)=>{
    abcd=abcd;
})


app.use((err,req,res,next)=>{
res.send("something went wrong");
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
