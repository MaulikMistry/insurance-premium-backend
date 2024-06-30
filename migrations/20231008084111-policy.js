module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.createCollection("policy")
    // await db.collection("policy").insertOne({
    //   scheme_id:454,
    //   client_id:545646,
    //   type_of_policy:"yearly",
    //   regional_head_id:879,
    //   area_manager_id:876878,
    //   representative_name:"dev sankalp",
    //   login_date:"dev sankalp",
    //   expiry_date:"dev sankalp",
    //   expiry_month:"dev sankalp",
    //   main_category:"dev sankalp",
    //   sub_category:"dev sankalp",
    //   branch_location:"dev sankalp",
    //   channel:"dev sankalp",
    //   employee_code:"dev sankalp",
    //   vehicle_no:"dev sankalp",
    // });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("policy").drop()
  }
};
