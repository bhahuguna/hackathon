const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingschema=new Schema({
    hotel_name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      food_type: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
      },
      expiry_date: {
        type: Date,
        required: true
      },
      image_url: {
        type: String,
        // required: true
      }
    });
const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;