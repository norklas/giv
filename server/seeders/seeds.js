const faker = require("faker");
const db = require("../config/connection");
const {
  User,
  Cause,
  Category,
  Point,
  Share,
} = require("../models");

db.once("open", async () => {
  await User.deleteMany({});
  await Cause.deleteMany({});
  await Category.deleteMany({});
  await Point.deleteMany({});
  await Share.deleteMany({});

  // create categories
  const categoryTitles = [
    "Disaster Relief",
    "Medical - Cancer Research",
    "Medical - Mental Health",
    "Medical - Lung Disease",
    "Medical - ALS",
    "Medical - Diabetes",
    "Medical - MDS",
    "Homeless Services",
    "Hunger",
    "Developing Nations",
    "Animal Welfare",
    "Community Development",
    "Special Education",
    "Museum",
    "Scholarship",
    "Humanitarian Relief",
    "Non-Medical Research",
    "Environmental",
    "Parks",
  ];

  const categoryData = [];
  for (let i = 0; i < categoryTitles.length; i++) {
    categoryData.push({ title: categoryTitles[i] });
  }

  const createdCategories = await Category.collection.insertMany(categoryData);
  console.log("Seeded Categories");

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
