const express = require("express");
const router = express.Router();
const conexion = require("./database/db");
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Abierto" },
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

router.post("/addTicket", async (req, res) => {
  try {
    const { title, description } = req.body;
    const status = req.body.status || "Abierto"; // Si no viene status, usar "Abierto"
    const nuevoTicket = new Ticket({ title, description, status });
    await nuevoTicket.save();
    res.redirect("/ticketsHistory");
  } catch (err) {
    res.status(500).send("Error al crear el ticket");
  }
});

router.get("/addTicket", (req, res) => {
  res.render("addTicket");
});

router.post("/addTicket", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const nuevoTicket = new Ticket({ title, description, status });
    await nuevoTicket.save();
    res.redirect("/ticketsHistory");
  } catch (err) {
    res.status(500).send("Error al crear el ticket");
  }
});

router.get("/editTicket/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).send("Ticket no encontrado");
    res.render("editTicket", { ticket });
  } catch (err) {
    res.status(500).send("Error al cargar el ticket");
  }
});

router.post("/editTicket/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    await Ticket.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status,
    });
    res.redirect("/ticketsHistory");
  } catch (err) {
    res.status(500).send("Error al actualizar el ticket");
  }
});

module.exports = router;
