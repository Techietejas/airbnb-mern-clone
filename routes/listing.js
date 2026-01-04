const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isloggedin, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedin,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateListing)
  )
  .delete(wrapAsync(listingController.destroyListing));

//Edit route
router.get(
  "/:id/edit",
  isloggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
