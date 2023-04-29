const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

async function lookup(searchterm, db_connect) {
  students = await db_connect.collection("students").aggregate(
    [
      {
        '$search': {
          'index': 'default', 
          'autocomplete': {
            'query': searchterm, 
            'path': 'name'
          }
        }
      }, {
        '$limit': 10
      }, {
        '$project': {
          'name': 1,
          'year': 1, 
          'category': 1
        }
      }
    ]
  );
  return students
}
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
  let db_connect = dbo.getDb("webstack");
  let searchterm = req.query
  let students;
  if (searchterm) {
    console.log("searchterm is" + searchterm)
    console.log("search term present")
    students = lookup(searchterm, db_connect)
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched posts',
      data: { students },
    });
  } else {
    console.log("no search term")
    db_connect.collection("students").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
});


// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("students")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   year: req.body.year,
   category: req.body.category,
 };
 db_connect.collection("students").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     year: req.body.year,
     category: req.body.category,
   },
 };
 db_connect
   .collection("students")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("students").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;