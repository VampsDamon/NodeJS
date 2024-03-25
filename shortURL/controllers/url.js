const URL = require("../modules/url");
const shortid = require("shortid");

const handelGenerateShortURL = async (req, res) => {
  const shortID = shortid();
  const body = req.body;
  if (!body.url) return res.status(404).json({ error: "URL is required" });

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", { id: shortID });
};

const handelRedirectToURL = async (req, res) => {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    {
      $push: {
        visitHistory: {
          timestapm: Date.now(),
        },
      },
    }
  );

  res.redirect(entry?.redirectURL);
};

const handelGetAllData = async (req, res) => {
  const data = await URL.find({});

  return res.json(data);
};

const handelAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const data = await URL.findOne({ shortId });
  return res.json({
    redirectURL: data.redirectURL,
    totalClicks: data.visitHistory.length,
    analytics: data.visitHistory,
  });
};
module.exports = {
  handelGenerateShortURL,
  handelRedirectToURL,
  handelGetAllData,
  handelAnalytics,
};
