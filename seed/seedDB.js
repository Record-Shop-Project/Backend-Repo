const mongoose = require('mongoose');
const User = require('../models/User');
const Record = require('../models/Record');
var faker = require('faker');

console.log(`We are about to write a seed script`);

(async function () {
  const dbUrl = 'mongodb+srv://encsooo:encsooo@cluster0.ug2lp.mongodb.net/record_db?retryWrites=true&w=majority';

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  mongoose.connection.on('error', () => console.log('Can not connect to the DB'));
  mongoose.connection.on('open', () => console.log('Connected to the database....'));

  // We need to drop users
  try {
    await User.deleteMany({});
    console.log(`Old users moved to a better place, Spandau`);
  } catch (error) {
    console.log(error);
  }

  // We need to drop records
  try {
    await Record.deleteMany({});
    console.log(`Old records moved to a better place, the woods`);
  } catch (error) {
    console.log(error);
  }

  // Construct 20 fake users and 20 fake records
  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      //create a fake user
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: '0123456789',
        nickname: faker.internet.userName(),
      };

      console.log(`User ${userData.email} has been created`);

      const user = new User(userData);
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log(`We stored 20 users in the DB`);
  } catch (error) {
    console.log(error);
  }

  const recordsPromises = Array(20)
    .fill(null)
    .map(() => {
      //create a fake user
      const recordData = {
        cover: faker.image.nightlife(500, 500),
        title: faker.lorem.words(),
        artist: faker.lorem.word(),
        year: faker.random.number(1980, 2021),
        price: 19.20
      };

      console.log(`Record "${recordData.title}" has been created`);

      const record = new Record(recordData);
      return record.save();
    });

  try {
    await Promise.all(recordsPromises);
    console.log(`We stored 20 records in the DB`);
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
})();
