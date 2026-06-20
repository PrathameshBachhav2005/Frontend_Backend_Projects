import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_CONN)
//     .then(() => {
//         console.log("MongoDB is connected...");
//     })
//     .catch((err) => {
//         console.error("MongoDB connection failed:", err.message);
//         // Exit so the process doesn't silently serve HTML errors
//         process.exit(1);
//     });


// if you use below code then also call below code in Server.js file like this way "mongodb()"


const mongodb = async () => {
   try {
      await mongoose.connect(process.env.MONGO_CONN);
      console.log("MongoDB Connected");
   } 
   catch(err) {
      console.log("MongoDB Not Connected");
      console.log(err);
      process.exit(1);
   }
}

export default mongodb;