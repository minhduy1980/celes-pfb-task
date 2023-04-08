// create a footer component
import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const AppFooter = () => {
  return (
    <section className="footer text-center">
      Anthonydang#5425 | Celestia
      <ul className="list-group">
        <li className="list-item">This is just for test purpose.</li>
        <li className="list-item">Namespace - Genarate random with 8 bytes.</li>
        <li className="list-item">
          Data - Genarate random and data is in hex-encoded bytes of the raw
          message.
        </li>
        <li className="list-item">
          Gas Limit - The limit of gas to use for the transaction
        </li>
        <li className="list-item">Fee - The fee to use for the transaction</li>
      </ul>
    </section>
  );
};

export default AppFooter;
