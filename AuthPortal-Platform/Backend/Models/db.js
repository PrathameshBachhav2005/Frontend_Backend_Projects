import mongoose from "mongoose";

const mongodb=mongoose.connect(process.env.MONGO_CONN);

mongodb.then(()=>{
    console.log("Mongodb is connected...");
}).catch((err)=>{
    console.log(`Mongodb is Not Connected  ${err}`)
})

export default mongodb;


// if you use below code then also call below code in Server.js file like this way "mongodb()"


// const connectDB = async () => {
//    try {
//       await mongoose.connect(process.env.MONGO_CONN);
//       console.log("MongoDB Connected");
//    } 
//    catch(err) {
//       console.log("MongoDB Not Connected");
//       console.log(err);
//    }
// }

// export default connectDB;