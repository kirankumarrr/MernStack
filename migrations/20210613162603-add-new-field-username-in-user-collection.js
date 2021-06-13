module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
   
    const fetchedUsers = await db.collection('users').find({}).toArray();
    const operations = fetchedUsers.map((user) => {
        return db.collection('users').updateOne({ _id: user._id }, {
                $set: {
                  username: user.username || user.name
                }
        })          
    })
  return Promise.all(operations);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return db.collection('users').updateMany({}, { $unset:  { username: null } })
  }
};
