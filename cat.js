function saveCategory(db, data) {
  const categoryCollection = db.collection("category");
  categoryCollection.insertMany(data);
}

async function getCategory(db, name,order) {
  let query = {};

if(name)
{
query.name = name;
}
if(order)
{
  query.order = {$gte:order}
}
  const result = await db.collection("category").find((query));
  const cat = result.toArray();
  console.log(query)

  return cat;
  // const result =await db.collection("phones").find(query);
  // const phones = result.toArray();
  // return phones;
}
async function ShowIsActive(db)
{
const result = db.collection("category").find({"isActive":true})
const cat = result.toArray();
return cat

}


var ObjectId = require('mongodb').ObjectId;   

async function IdShow(db,categoryId)
{
  const result = await db.collection("category").find({"_id": new ObjectId(categoryId)})
  const cat = await result.toArray();
  return cat[0]

}
module.exports = { saveCategory, getCategory,ShowIsActive,IdShow };
