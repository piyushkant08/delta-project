const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const intiDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((ob) => {
    return ({ ...ob, owner: "668dae60b4f6fba3a26e36e0" });
  });
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

intiDB();
