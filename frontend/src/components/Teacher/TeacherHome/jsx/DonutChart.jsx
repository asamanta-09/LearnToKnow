import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import styles from "../css/DonutChart.module.css";

const DonutChart = () => {
  const [topics, setTopics] = useState([]);
  const [counts, setCounts] = useState([]);
  const teacherEmail=localStorage.getItem('email');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`/course/${teacherEmail}/course-enrollments-by-topic`);
        const data = res.data;

        const topicNames = data.map(item => item.topic);
        const studentCounts = data.map(item => item.studentCount);

        setTopics(topicNames);
        setCounts(studentCounts);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    if (teacherEmail) {
      fetchChartData();
    }
  }, [teacherEmail]);

  return (
    <div className={styles["chart-container"]}>
      {counts.length > 0 && topics.length > 0 ? (
        <Chart
          type="donut"
          width="100%"
          height={500}
          series={counts}
          options={{
            labels: topics,
            title: {
              text: "Student Enrollment by Course Topic",
              align: "left",
              style: {
                fontSize: "15px",
                fontWeight: "bold",
                color: "#333",
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      showAlways: true,
                      fontSize: "20px",
                      color: "#f90000",
                    },
                  },
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
          }}
        />
      ) : (
        <p className={styles["loading-text"]}>Loading chart data...</p>
      )}
    </div>
  );
};

export default DonutChart;
