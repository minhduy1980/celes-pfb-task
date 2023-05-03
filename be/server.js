const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const crypto = require("crypto");

require("dotenv").config();

const app = express();
app.use(cors()); 

app.use(bodyParser.json({ limit: "3mb" }));

app.get(`${process.env.API}/rand_data`, async (req, res) => {
  const id = crypto.randomBytes(8).toString("hex");
  const lenMsg = Math.floor(Math.random() * 100); 

  const mess = crypto.randomBytes(lenMsg).toString("hex");
  res.json({ id, mess });
});

app.post(`${process.env.API}/submit`, async (req, res) => {
  console.log(req.body);

  axios
    .post(`${process.env.LOCALH}/submit_pfb`, await req.body)
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
      `${process.env.LOCALH}/namespaced_shares/${id}/height/${height}`
    ).then((respone) => {
      res.json(respone.data);
      console.log(respone.data);
    }).catch((error) => {
      console.error(error);
      res.json(error);
    });
  }
);

const port = process.env.PORT||8000;
app.listen(port, "0.0.0.0", () =>
  console.log(`Server is running on port ${port}`)
);
