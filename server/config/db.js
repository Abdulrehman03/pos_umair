const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/pos_umair";
// const db = `mongodb+srv://gullidanda:gullidanda@gullidanda.jizwl.mongodb.net/gullidanda?retryWrites=true&w=majority`;
// const db = `mongodb+srv://user:user@eallaine.miefs.mongodb.net/EALLAINE?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    // mongoose.set("useNewUrlParser", true);
    // mongoose.set("useFindAndModify", false);
    // mongoose.set("useCreateIndex", true);
    await mongoose.connect(db, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDB;
