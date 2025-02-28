module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.createCollection("clients");
    // await db.collection("clients").insertOne({
    //   name: "Clients",
    //   nameProposer: "Clients proposer",
    //   address: "Client address",
    //   phone: "12345789",
    //   email: "client@gmail.com",
    //   dob: "01/01/1999",
    // });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("clients").drop();
  },
};
