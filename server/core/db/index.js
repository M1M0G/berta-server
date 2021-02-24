const mongoose = require("mongoose");
const uri = process.env.URI;
console.log('mongoose connecting...');
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      throw Error(err);
    }
  }
);