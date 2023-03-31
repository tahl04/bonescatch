import React, { useEffect } from "react";
import ra from "@/styles/rank.module.scss";
import axios from "axios";

function Ranking() {
  function getRank() {
    axios.get("/api/rank").then((res) => {
      console.log(res.data);
    });
  }

  useEffect(() => {
    getRank();
  }, []);

  return (
    <>
      <div className={ra.rankWrap}>
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
      </div>
    </>
  );
}

export default Ranking;
