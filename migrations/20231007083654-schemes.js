module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.createCollection("schemes")
    // await db.collection("schemes").insertOne({
    //   name:"Dev Sankalp",
    //   company_name:"Dev Sankalp",
    //   premium_paying_term:"yearly",
    //   area_manager:"dev sankalp",
    // });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("schemes").drop()
  }
  
};
