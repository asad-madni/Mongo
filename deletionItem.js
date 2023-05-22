var ObjectId = require("mongodb").ObjectId;
async function deleteItem(db, id) {
    db.disconnect()
  const response = await db.collection("itemseeee").deleteOne({ _id: new ObjectId(id) });
  console.log('response', response)
 return true;
}

module.exports = { deleteItem };
 