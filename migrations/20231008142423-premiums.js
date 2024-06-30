module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.createCollection("premiums");
    // await db.collection("premiums").insertOne({
    //   client_id: 23,
    //   pilicy_id: 23,
    //   sum_assured: 34,
    //   total_premium: 234,
    //   gst_tax: 432,
    //   cheque_amount: 432,
    //   cheque_date: "01/01/1999",
    //   bank_name: "test",
    //   bank_branch: "test",
    //   premium_mode: "test",
    //   premium_paying_term: "test",
    //   code_no: "DSTEWR",
    //   premium_date:"01/01/1999",
    //   premium_paying_date:"01/01/1999"
    // });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("premiums").drop();
  }
};
