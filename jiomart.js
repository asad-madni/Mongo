// // post data in mogodb
// async function saveMart(db, data) {
//   const martCollection = await db.collection("martCategory");
//   martCollection.insertMany(data);
// }
// post sub category in mongodb
async function saveSubCategory(db, data) {
  const martCollection = await db.collection("subCategories");
  console.log("hello");
  martCollection.insertMany(data);
}

// query
async function getMartCategory(db) {
  const result = await db.collection("martCategory").find({ isActive: true });
  const categories = await result.toArray();
  return categories;
}

// /mart/categories/:categoryId/subcategories
async function getMartSubCategory(db, parentId) {
  const result = await db 
    .collection("subCategories")
    .find({ parentId: parentId, isActive: true })
    .sort({ priority: -1 });
  const subCategories = await result.toArray();
  return subCategories;
}
// posting items data in mongodb
async function postItems(db, data) {
  const itemCollection = await db.collection("items");
  itemCollection.insertMany(data);
}
// Getting data items by passing subcategory ID

async function getItemsbySubCateogry(db, dataOfItems) {
  const getItems = await db
    .collection("subCategories")
    .find({ subCategoryId: dataOfItems });
  let result = await getItems.toArray();
  return result;
}

// query on items collection
// let query ={}
async function queryOnItems(db, buy) {
  const queryData = await db
    .collection("items")
    .find({ inStock: { $gt: buy } });
  const result = queryData.toArray();
  return result;
}
var ObjectId = require('mongodb').ObjectId;   
    // .collection("subCategories").updateOne({ _id: new ObjectId(subCategoryId) },{ $set: { name: data.name } })

async function updateSubcategory(db, subCategoryId, data) {
  const updateResponse = await db.collection("subCategories")
   .updateOne({ _id: new ObjectId(subCategoryId) },{ $set:{name: data.name, priority:data.priority,isActive:data.isActive}})
      console.log(updateResponse.upsertedCount)
    const result = updateResponse.modifiedCount > 0 ? true : false;
    return result
}

module.exports = {
  postItems,
  getMartCategory,
  getMartSubCategory,
  saveSubCategory,
  getItemsbySubCateogry,
  queryOnItems,
  updateSubcategory,
};



