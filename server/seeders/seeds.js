const faker = require("faker");
const db = require("../config/connection");
const { User, Cause } = require("../models");
// variables to control number of seeds generated
const numUsers = 100;
const numCauses = 100;

db.once("open", async () => {
  await User.deleteMany({});
  await Cause.deleteMany({});

  const titleTypes = ["Relief", "Research", "Support", "Fundraiser", "Charitable Organization", "Federations", "Services"]

  const titleDetails = ["Cancer", "ALS", "Diabetes", "Arthritis", "Parkinson's", "Leukemia", "Alzheimer's", "COVID-19", "Affordable Housing", "Environmental", "Hunger", "Disaster", "Humanitarian", "Autism", "Education", "Conservation", "Wildlife", "Peace and Human Rights", "Veterans"]

  const categories = ["Animal Welfare", "Disaster Relief", "Education", "Environmental", "Housing", "Hunger", "Medical Research", "Medical Support", "Veterans Support", "Other"]

  // create causes
  const causeData = [];

  for (let i = 0; i < numCauses; i++) {
    const titleDetail = titleDetails[Math.floor(Math.random() * titleDetails.length)];
    const titleType = titleTypes[Math.floor(Math.random() * titleTypes.length)];
    const title =  titleDetail.concat(" ", titleType);
    const description = faker.lorem.paragraph();
    const url = faker.internet.url();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const location = faker.address.cityName();
    const points = Math.floor(Math.random() * 20000);

    causeData.push({
      title: title,
      description: description,
      url: url,
      category: category,
      location: location,
      points: points
    });
  }

  const createdCauses = await Cause.collection.insertMany(causeData);
  console.log("Seeded Causes");

  // create users
  const userData = [];

  for (let i = 0; i < numUsers; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const points = Math.floor(Math.random() * 1000);

    userData.push({
      username: username,
      email: email,
      password: password,
      points: points,
    });
  }

  const createdUsers = await User.collection.insertMany(userData);
  // console.log(createdUsers);

  console.log("Seeded Users");

  console.log("Seeding complete");
  process.exit(0);
});
