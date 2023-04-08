const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(cors()); 

app.use(bodyParser.json({ limit: "2mb" }));

app.get(`${process.env.API}/rand_data`, async (req, res) => {
  const id = crypto.randomBytes(8).toString("hex");
  const lenMsg = Math.floor(Math.random() * 100); 

  const mess = crypto.randomBytes(lenMsg).toString("hex");
  res.json({ id, mess });
});

app.post(`${process.env.API}/submit`, async (req, res) => {
  console.log(req.body);

  axios
    .post(`${process.env.LOCALHOST}/submit_pfb`, await req.body)
    .then((respone) => {
      res.json(respone.data);
    })
    .catch((error) => {
      console.error(error);
      res.json(error);
    });
});

app.get(
  `${process.env.API}/:id/:height`,
  async (req, res) => {
    const { id, height } = req.params;
    axios.get(
      `${process.env.LOCALHOST}/namespaced_shares/${id}/height/${height}`
    ).then((respone) => {
      res.json(respone.data);
      console.log(respone.data);
    }).catch((error) => {
      console.error(error);
      res.json(error);
    });
  }
);

const port = process.env.PORT;
app.listen(port, "0.0.0.0", () =>
  console.log(`Server is running on port ${port}`)
);
