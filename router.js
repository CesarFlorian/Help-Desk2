const express = require("express");
const router = express.Router();
const conexion = require("./database/db");
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/ticketsHistory", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.render("ticketsHistory", { tickets });
  } catch (error) {
    res.status(500).send("Error al obtener tickets");
  }
});

module.exports = router;
