//const faker = require('faker');
const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { Collection, User } = require('../models');

db.once('open', async () => {
   await Collection.deleteMany({});
   await User.deleteMany({});

   // create user data
   const userData = [];

   for (let i = 0; i < 10; i += 1) {
      const username = faker.internet.userName();
      const email = faker.internet.email(username);
      const password = "password";
      const createdUsers = await User.create({username, email, password});
      userData.push(createdUsers);
   }


   // console.log(userData
   // create collections
   let createdCollections = [];
   for (let i = 0; i < 15; i += 1) {
      const collectionName = faker.commerce.product();
      const collectionDescription = faker.lorem.words(Math.round(Math.random() * 10) + 1);

      const randomUserIndex = Math.floor(Math.random() * userData.length);
      // console.log(randomUserIndex);
      const { username, _id: userId } = userData[randomUserIndex];
      
      const createdCollection = await Collection.create({ collectionName, collectionDescription, username });

      await User.updateOne({ _id: userId }, { $push: { collections: createdCollection._id } });
      // console.log(User.createdCollection._id);
      createdCollections.push(createdCollection);
   }

   // create items
   for (let i = 0; i < 50; i += 1) {
      const itemName = faker.commerce.productName();
      const itemImage = faker.image.image();
      const itemDescription = faker.commerce.productDescription();

      const randomCollectionIndex = Math.floor(Math.random() * createdCollections.length);
      const { _id: collectionId } = createdCollections[randomCollectionIndex];

      await Collection.updateOne(
         { _id: collectionId },
         { $push: { items: { itemName, itemImage, itemDescription } } },
         { runValidators: true }
      );
   }

   // create comments
   for (let i = 0; i < 10; i += 1) {
      const commentBody = faker.lorem.words(Math.round(Math.random() * 10) + 1);

      const randomUserIndex = Math.floor(Math.random() * userData.length);
      const { username } = userData[randomUserIndex];

      const randomCollectionIndex = Math.floor(Math.random() * createdCollections.length);
      const { _id: collectionId } = createdCollections[randomCollectionIndex];

      await Collection.updateOne(
         { _id: collectionId },
         { $push: { comments: { commentBody, username } } },
         { runValidators: true }
      );
   }

   console.log('all done!');
   process.exit(0);
});