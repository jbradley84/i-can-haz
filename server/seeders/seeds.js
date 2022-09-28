//const faker = require('faker');
const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { Collection, User, Item, Comment } = require('../models');

db.once('open', async () => {
   await Collection.deleteMany({});
   await User.deleteMany({});
   await Item.deleteMany({});
   await Comment.deleteMany({});

   // create user data
   const userData = [];

   for (let i = 0; i < 50; i += 1) {
      const username = faker.internet.userName();
      const email = faker.internet.email(username);
      const password = faker.internet.password();

      userData.push({ username, email, password });
   }

   const createdUsers = await User.collection.insertMany(userData);

   // create collections
   let createdCollections = [];
   for (let i = 0; i < 100; i += 1) {
      const collectionName = faker.commerce.product();
      const collectionDescription = faker.lorem.words(Math.round(Math.random() * 20) + 1);

      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username, _id: userId } = createdUsers.ops[randomUserIndex];

      const createdCollection = await Collection.create({ collectionName, collectionDescription });

      const updatedUser = await User.updateOne(
         { _id: userId },
         { $push: { collections: createdCollection._id } }
      );

      createdCollections.push(createdCollection);
   }

   // create items
   for (let i = 0; i < 100; i += 1) {
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
   for (let i = 0; i < 100; i += 1) {
      const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username } = createdUsers.ops[randomUserIndex];

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