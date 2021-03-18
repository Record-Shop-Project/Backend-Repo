const mongoose = require('mongoose');
const User = require('../models/User');
const Record = require('../models/Record');
const faker = require('faker');
require('dotenv').config();

(async function () {
    const strConn = process.env.DB_CONNECTION
    mongoose.connect(strConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    mongoose.connection.on('error', () => console.log("Cannot connect to DB"));
    mongoose.connection.on('open', () => console.log("Connected to DB. YaY"));

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
            nickname: faker.internet.userName(),
            email: faker.internet.email(),
            password: '1234',
            avatar: 'https://images.squarespace-cdn.com/content/v1/5b767372506fbefa1c2e1a39/1591137534047-6UC0XAJIUS551VZ2VUM5/ke17ZwdGBToddI8pDm48kCcI7etBRADtzlxqGLJUEhl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UYQXM0qUkEKFwFydzVeItFkl7lV4xb0V2Aa7fVfA5XnrYCNktvz-O8E62ZORL8IqRg/John+Lennon.jpg?format=2500w'
        };
        console.log(`${userData.firstName} has been created`);
        const user = new User(userData);
        return user.save(); // generate the promise
    });

    try {
        await Promise.all(userPromises); // wait for all 10 promisses is resolved
        console.log("users were stored in DB")
    } catch (error) {
        console.log(error)
    }

    const recordPromises = Array(20)
    .fill(null)
    .map(() => {
        const recordData = {
            cover: faker.random.image(),
            title: faker.random.words(),
            artist: faker.random.words(),
            year: faker.date.past()
        };
        console.log(`${recordData.title} has been created`);
        const record = new Record(recordData);
        return record.save();
    });

    try {
        await Promise.all(recordPromises);
        console.log("records were stored in DB")
    } catch (error) {
        console.log(error)
    }



       mongoose.connection.close();
})();