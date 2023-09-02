import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongo is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParer: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
  }
};
//TODO: https://www.youtube.com/watch?v=wm5gMKuwSYk 1 28
