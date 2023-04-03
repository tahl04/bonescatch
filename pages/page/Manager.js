import sin from "@/styles/manager.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../src/MyContext";

function Manager() {
  const { data, who } = useContext(DataContext);
  return (
    <div className={sin.wrap}>
      <nav>
      <h1>신고 리스트</h1>
      <div className={sin.report}>

      </div>
      </nav>
    </div>
  )
}

export default Manager
