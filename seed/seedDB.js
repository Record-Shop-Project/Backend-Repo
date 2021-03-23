const mongoose = require("mongoose");
const User = require("../models/User");
const Record = require("../models/Record");
const faker = require("faker");
require("dotenv").config();

(async function () {
  const strConn = process.env.DB_CONNECTION;
  mongoose.connect(strConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  mongoose.connection.on("error", () => console.log("Cannot connect to DB"));
  mongoose.connection.on("open", () => console.log("Connected to DB. YaY"));

  try {
    await User.deleteMany({});
    console.log("users deleted");
  } catch (error) {
    console.log(error);
  }

  try {
    await Record.deleteMany({});
    console.log("records deleted");
  } catch (error) {
    console.log(error);
  }

  const userPromises = Array(10)
    .fill()
    .map(() => {
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nickName: faker.internet.userName(),
        email: faker.internet.email(),
        password: "1234",
        avatar: "/images/avatar1.jpg",
      };
      console.log(`${userData.firstName} has been created`);
      const user = new User(userData);
      return user.save(); // generate the promise
    });

  try {
    await Promise.all(userPromises); // wait for all 10 promisses is resolved
    console.log("users were stored in DB");
  } catch (error) {
    console.log(error);
  }

  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const recordData = {
        cover: faker.random.image(),
        title: faker.random.words(),
        artist: faker.random.words(),
        year: faker.date.past(),
      };
      console.log(`${recordData.title} has been created`);
      const record = new Record(recordData);
      return record.save();
    });

  try {
    await Promise.all(recordPromises);
    console.log("records were stored in DB");
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
})();
