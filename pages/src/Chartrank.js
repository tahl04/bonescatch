


/////////////////////////////////// 미오픈 ///////////////////////////////////////



import { Chart as ChartJS, ArcElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, registerables } from "chart.js";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend);

import React, { useEffect, useState } from "react";
import ra from "@/styles/rank.module.scss";

const Chartrank = ({ data }) => {
  const [triberank, setTriberank] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (data !== undefined && data.length !== 0) {
      data.map((tri) => {
        if (tri.STATE != 3) triberank[Number(tri.STATE) + 1]++;
        else triberank[0]++;
      });
    }
  }, [data]);

  return (
    <div className={ra.chart_wrap}>
      <div>
        <PolarArea
          data={{
            labels: ["밤 까마귀", "뿌리 풍뎅이", "바다 집게", "바위 멧돼지"],
            datasets: [
              {
                label: "세력도",
                data: triberank,
                backgroundColor: ["#951fcc33", "#0c56ee33", "#e21a4533", "#ff9d0b33"],
                borderColor: ["#951fcc", "#0c56ee", "#e21a45", "#ff9d0b"],
                borderWidth: 3,
              },
            ],
          }}
          options={{}}
          className={ra.chart}
        />
      </div>
    </div>
  );
};

export default Chartrank;
