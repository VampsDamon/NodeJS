const express = require("express");

const router = express.Router();
const {
  handelGenerateShortURL,
  handelRedirectToURL,
  handelGetAllData,
  handelAnalytics,
} = require("../controllers/url");



router.post("/", handelGenerateShortURL);

router.get("/:shortId",handelRedirectToURL);

router.get("/api/all", handelGetAllData);

router.get("/analytics/:shortId", handelAnalytics)



module.exports = { router };
