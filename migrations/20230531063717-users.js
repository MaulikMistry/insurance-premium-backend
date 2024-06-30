var bcrypt = require("bcryptjs");
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.createCollection("users")
    await db.collection("users").insertOne({
      username:"maulik",
      name:"Maulik Mistry",
      email:"Maulik@gmail.com",
      role:"admin",
      password: bcrypt.hashSync("Maulik@123", 8)})
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("users").drop()
  }
};
