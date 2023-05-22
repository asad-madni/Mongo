
const express = require("express"); // Import library

const app = express(); // Create instance
const port = 6000; // Define port
app.use(express.json()); // to parse json input from body
app.get("/", function (req, res) {
  res.json({
    message: "Hello",
  });
});
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
let db;
console.log("Connecting to mongodb");
const client = new MongoClient(url);
// Database Name
const dbName = "p";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db("p");
}
main();
// const {
//   saveCategory,
//   getCategory,
//   ShowIsActive,
//   IdShow,
// } = require("./category");

// app.post("/categorySave", (req, res) => {
//   saveCategory(db, req.body);
//   res.json({
//     status: 200,
//     message: "Cateogries returned successfully",
//   });
// });
// app.get("/categoryGet", async (req, res) => {
//   const { name, order } = req.body;

//   const matchedCatogries = await getCategory(db, name, order);
//   res.json({
//     status: 200,
//     message: "Categories returned successfully",
//     data: matchedCatogries,
//   });
// });

// app.get("/categoryIsActive", async (req, res) => {
//   const showingActive = await ShowIsActive(db);
//   res.json({
//     status: 200,
//     message: "Categories returned successfully",
//     data: showingActive,
//   });
// });

// app.get("/abc/:id", async (req, res) => {
//   let categoryId = req.params.id;
//   const showId = await IdShow(db, categoryId);
//   res.json({
//     status: 200,
//     message: "Categories returned successfully",
//     data: showId,
//   });
// });
///////////start from here

const {
  getMartCategory,
  getMartSubCategory,
  saveSubCategory,
  postItems,
  getItemsbySubCateogry,
  queryOnItems,
  updateSubcategory,
} = require("./jiomart");
// API to post category data
app.post("/postCategory", async (req, res) => {
  saveMart(db, req.body);
  res.json({
    status: 200,
    message: "Sub Categories added successfully",
  });
});
// API to post subcategory
app.post("/postSubCategory", async (req, res) => {
  saveSubCategory(db, req.body);
  res.json({
    status: 200,
    message: "Jio mart collection returned successfully..",
  });
});
// // API to perform some actions
// app.get("/getMart", async (req, res) => {
//   const { types, name, buy } = req.body;
//   const getMartData = await getMart(db, types, name, buy);
//   res.json({
//     status: 200,
//     message: "Categories returned successfully",
//     data: getMartData,
//   });
// });
/// GET API to get data by ID in URL
app.get("/getMart/subCategory/:id", async (req, res) => {
  parentId = req.params.id;
  const getMartData = await getMartSubCategory(db, parentId);
  res.json({
    status: 200,
    message: "Categories returned successfully",
    data: getMartData,
  });
});

app.post("/items", async (req, res) => {
  postItems(db, req.body);
  res.json({
    status: 200,
    message: "Items returned successfully",
  });
});

app.get("/subCategoryId/:id", async function (req, res) {
  let dataOfItems = req.params.id;
  const getItemData = await getItemsbySubCateogry(db, dataOfItems);
  res.json({
    status: 200,
    message: "SubCategories returned successfully",
    data: getItemData,
  });
});

app.put("/subCategories/:id", async function (req, res) {
  let subCategoryId = req.params.id;
  let data = req.body;
  let updatedData = await updateSubcategory(db, subCategoryId, data);
  console.log(updatedData);
  if (updatedData == true) {
    res.json({
      status: 200,
      message: "SubCategories updated successfully",
      data: updatedData,
    });
  } else
    return res.json({
      status: 500,
      message: "Updation failed",
      data: updatedData,
    });
});

app.get("/queryOnItems", async (req, res) => {
  const { buy } = req.body;
  const queryData = await queryOnItems(db, buy);
  res.json({
    status: 200,
    message: "SubCategories returned successfully",
    data: queryData,
  });
});
const {orderItem} = require("./orderOperation")

app.post("/order", async (req, res) => {
  const { id, quantity } = req.body;
  const orderedData = await orderItem(db,id, quantity);
  
if(orderedData== true)
{
  res.json({
    status: 200,
    message: "Order placed Successfully",
   
  });
}
else res.json({
  status:400,
  message:"Items are not available with this much quantity"
})


});
const{deleteItem} = require("./deletionItem")

app.delete("/items/:itemId",async function(req,res)
{
const id = req.params.itemId
const deleteData = await deleteItem(db,id)
if(deleteData== true)
{
  res.json({
    status: 200,
    message: "Item deleted succesfully",
   
  });
}
else res.json({
  status:400,
  message:"Unsuccessfull deletion"
})


})

////////////////////////////////////////////MEDICAL STORE//////////////////////////////////

// For posting data to database
app.post("/postMedicine",async function(req,res)
{
  postItems(db, req.body);
  res.json({
    status: 200,
    message: "Items returned successfully",
  });

})












app.listen(port, function (err) {
  if (err) {
    console.log("Failed to listen on port ", port);
  } else console.log(`app running at: http://localhost:${port}/`);
});
