import mongoose from "mongoose";

const dataBase = "mongodb://localhost/authClassWork";

const dbConfig = async () => {
  const dataStore = await mongoose.connect(dataBase);
  console.log(`data base connected ${dataStore.connection.host}`);
};

export default dbConfig;
