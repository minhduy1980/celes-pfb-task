import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import banner from "./banner.png";

const Home = () => {
  const [id, setId] = useState("");
  const [mess, setMess] = useState("");
  const [height, setHeight] = useState("");
  const [txh, setTxh] = useState("");
  const [shares, setShares] = useState("");
  const [gasLimit, setGasLimit] = useState(80000);
  const [fee, setFee] = useState(2000);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (height) {
      getData(id, height).then((res) => {
        setShares(res.data.shares);
        setValidated(true);
        setLoading(false);
      });
    }
  }, [height]);

  const getGenData = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/rand_data`);
  };

  const postData = async (namespace_id, data, gas_limit, fee) => {
    return await axios.post(`${process.env.REACT_APP_API}/submit`, {
      namespace_id,
      data,
      gas_limit,
      fee,
    });
  };

  const getData = async (id, height) => {
    return await axios.get(`${process.env.REACT_APP_API}/${id}/${height}`);
  };

  const FormDataNot = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right">ID</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control form-control-plaintext"
            value={id}
            placeholder="Random Namespace"
            onChange={(e) => setId(e.target.value)}
            readOnly
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right">Data</label>
        <div className="col-sm-9">
          <textarea
            type="text"
            className="form-control form-control-plaintext"
            value={mess}
            placeholder=" Random Message"
            onChange={(e) => setMess(e.target.value)}
            rows="2"
            readOnly
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right">Gas</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control form-control-plaintext"
            value={gasLimit}
            placeholder="Gas limit"
            onChange={(e) => setGasLimit(e.target.value)}
            readOnly
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-right">Fee</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control form-control-plaintext"
            value={fee}
            placeholder="Fee use"
            onChange={(e) => setFee(e.target.value)}
            readOnly
          />
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <Button
          onClick={handleGenerate}
          type="primary"
          shape="round"
          className="mr-3 d-inline-flex align-items-center"
          size="large"
        >
          Genarate
        </Button>

        <Button
          onClick={handleSubmit}
          type="primary"
          shape="round"
          className="ml-3 d-inline-flex align-items-center"
          size="large"
          disabled={!id || !mess}
        >
          Submit
        </Button>
      </div>
    </form>
  );

  const FormDataHave = () => (
    <>
      <br />
      <h4 className="text-center">Success!</h4>
      <label>Information data</label>
      <textarea
        type="text"
        className="form-control"
        value={shares}
        placeholder=" Random Message"
        onChange={(e) => setShares(e.target.value)}
        rows="3"
        readOnly
      />
      <br />
      <p className="text-center">
        Height: {height} and TxHash:{" "}
        <a
          href={`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txh}`}
        >
          {"..." + txh.substring(txh.length - 20)}
        </a>
      </p>
    </>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    postData(id, mess, 80000, 4000)
      .then((res) => {
        setHeight(res.data.height);
        setTxh(res.data.txhash);
      })
      .catch((err) => {
        console.log(err);
      });
    setMess("");
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    getGenData()
      .then((res) => {
        setId(res.data.id);
        setMess(res.data.mess);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" p-5">
      <div className="row align-items-center">
        <div className="col-md-12">
          <img src={banner} alt="banner" className="img-fluid center" />
          <h1 className="text-center">
            {" "}
            UI for Submitting PayForBlob Transactions
          </h1>
          <br />
          <FormDataNot />
          <br />
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : validated ? (
            <FormDataHave />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
