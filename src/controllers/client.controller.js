const Clients = require("../models/client.model");
const logger = require('../logger/CreateLog')

exports.clientList = (req, res) => {
  Clients.find({})
    .then((resp) => {
      return res.status(200).send({
        data: resp,
        message: "Client List get successfull",
      });
    })
    .catch((err) => {
      logger.log({
        level: "error",
        error: err,
        message: err.message,
      });
      return res.status(500).send({
        err: err.message,
        message: "Server error",
      });
    });
};

exports.clientCreate = (req, res) => {
  const { name, nameProposer, address, phone, email, dob } = req.body;
  const newClient = new Clients({
    name,
    nameProposer,
    address,
    phone,
    email,
    dob,
  });
  newClient
    .save()
    .then((resp) => {
      return res.status(201).send({
        data: resp,
        message: "Product Created Successfull",
      });
    })
    .catch((err) => {
      logger.log({
        level: "error",
        error: err,
        message: err.message,
      });
      return res.status(500).send({
        err: err.message,
        message: "Server error",
      });
    });
};

exports.clientView = (req, res) => {
  const { id } = req.params;
  Clients.findOne({ _id: id }).then((resp) => {
    return res.status(200).send({
      data: resp,
      message: "Client view",
    });
  });
};

exports.clientEdit = (req, res) => {
  const { id } = req.params;
  const { name, nameProposer, address, phone, email, dob } = req.body;

  Clients.updateOne(
    { _id: id },
    { $set: { name, nameProposer, address, phone, email, dob } }
  )
    .then((resp) => {
      return res.status(200).send({
        data: resp,
        message: "Client edited",
      });
    })
    .catch((err) => {
      logger.log({
        level: "error",
        message: err.message,
        error: err,
      });
      return res.status(500).send({
        err: err.message,
        message: "Server Error",
      });
    });
};

exports.clientDelete = (req, res) => {
  const { id } = req.body;

  Clients.deleteOne({ _id: id })
    .then((resp) => {
      return res
        .status(200)
        .send({ data: resp, message: "Client deleted successfull" });
    })
    .catch((err) => {
      logger.log({
        level: "error",
        error: err,
        message: err.message,
      });
      return res
        .status(500)
        .send({ err: err.message, message: "Server Error" });
    });
};
