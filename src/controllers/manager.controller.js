const Managers = require("../models/manager.model");
const logger = require('../logger/CreateLog')

exports.managerList = (req, res) => {
  Managers.find({})
    .then((resp) => {
      return res.status(200).send({
        data: resp,
        message: "Manager List get successfull",
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
exports.managerCreate = (req, res) => {
  const { name, type } = req.body;
  const newManager = new Managers({
    name,
    type,
  });
  newManager
    .save()
    .then((resp) => {
      return res.status(201).send({
        data: resp,
        message: "Manager Created Successfull",
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

exports.managerView = (req, res) => {
  const { id } = req.params;
  Managers.findOne({ _id: id }).then((resp) => {
    return res.status(200).send({
      data: resp,
      message: "Manager view",
    });
  });
};

exports.managerEdit = (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  Managers.updateOne({ _id: id }, { $set: { name, type } })
    .then((resp) => {
      return res.status(200).send({
        data: resp,
        message: "Manager edited",
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

exports.managerDelete = (req, res) => {
  const { id } = req.body;

  Managers.deleteOne({ _id: id })
    .then((resp) => {
      return res
        .status(200)
        .send({ data: resp, message: "Mangaer deleted successfull" });
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
