// 1 - Ek API banana hai order krne ke liye
// 2 - User se input lena hai ki kitne items(id,quantity) wo order karega
// 3 - Agar stock me utne items honge toh order placed
// 4 - Aur phir database me update krna hai order decrease ka
// 5 - agar items stock me nhi hai toh phir  message dena hai ki not available
var ObjectId = require("mongodb").ObjectId;
async function orderItem(db, id, quantity) {
  const item = await db.collection("items").findOne({ _id: new ObjectId(id) });
  if (item) {
    if (quantity <= item.inStock) {
      let decreament = item.inStock - quantity;
      await db
        .collection("items")
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { inStock: decreament } }
        );
      return true;
    } else return false;
  } else return false;
}

module.exports = { orderItem };
