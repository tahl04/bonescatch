import React, { useEffect, useState } from "react";
import ra from "@/styles/rank.module.scss";
import axios from "axios";
import Chart from "../src/Chartrank";

function Ranking() {
  const [data, setData] = useState();

  function getRank() {
    axios.get("/api/rank").then((res) => {
      setData(res.data);
    });
  }

  useEffect(() => {
    getRank();
  }, []);

  return (
    <>
      <section className={ra.rankWrap}>
        <nav className={ra.bam}>
          <img></img>
        </nav>
        <nav className={ra.bawi}>
          <img></img>
        </nav>
        <nav className={ra.bburi}>
          <img></img>
        </nav>
        <nav className={ra.bada}>
          <img></img>
        </nav>
        <Chart data={data}></Chart>
      </section>
    </>
  );
}

export default Ranking;
