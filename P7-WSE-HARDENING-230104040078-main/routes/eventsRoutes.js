const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");
const { validateEvent } = require("../middlewares/validation");

// GET all
router.get("/", eventsController.getAllEvents);

// GET by id
router.get("/:id", eventsController.getEventById);

// POST create
router.post("/", validateEvent, eventsController.createEvent);

// PUT update
router.put("/:id", validateEvent, eventsController.updateEvent);

// DELETE
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
