const faker = require("faker");
const db = require("../config/connection");
const {
  User,
  Cause,
} = require("../models");

db.once("open", async () => {
  await User.deleteMany({});
  await Cause.deleteMany({});

  // create categories

  // create causes
  const causeData = [];

  for (let i = 0; i < 100; i++) {
    const title = faker.company.catchPhrase();
    const description = faker.lorem.paragraph();
    const url = faker.internet.url();
    const category =
      createdCategories[Math.floor(Math.random() * createdCategories.length)];
    const location = faker.address.cityName();

    causeData.push({
      title: title,
      description: description,
      url: url,
      category: category,
      location: location,
    });
  }

  const createdCauses = await Cause.collection.insertMany(causeData);
  console.log("Seeded Causes");

  // create users
  const userData = [];

  for (let i = 0; i < 100; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const causeNum = Math.floor(Math.random) * createdCategories.length;
    const causes = [];
    for (let j = 0; j < causeNum; j++) {
      const randomCauseIndex = Math.floor(Math.random() * createdCauses.length);
      causes.push(createdCauses.ops[randomCauseIndex]);
    }
    const points = Math.floor(Math.random() * 100);

    userData.push({
      username: username,
      email: email,
      password: password,
      causes: causes,
      points: points,
    });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log("Seed Users");
  // need seeds for Comment, Medal, Point, and Share
  console.log("Seeding complete");
  process.exit(0);
});
