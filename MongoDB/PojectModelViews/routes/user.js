const express = require("express");


const router = express.Router();


const {
  handelCreateUser,
  handelReadDataFromUser,
  handelAPIdata,
  handelGetDataById,
  handelUpdateDataById,
  handelDeleteDataById
} = require("../controllers/user");
// -Create Data into database
router.post("/create", handelCreateUser);

// -Read Data From database
router.get("/", handelReadDataFromUser);

router.get("/api", handelAPIdata);

router
  .route("/api/:id")
  // -Read Data From database by ID
  .get(handelGetDataById)

  // -Update Data From database
  .patch(handelUpdateDataById)
  // -Delete Data From database
  .delete(handelDeleteDataById);

module.exports = router;
