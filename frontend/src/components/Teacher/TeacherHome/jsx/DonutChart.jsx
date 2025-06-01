import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import styles from "../css/DonutChart.module.css";

const DonutChart = () => {
  const [topics, setTopics] = useState([]);
  const [counts, setCounts] = useState([]);
  const teacherEmail = localStorage.getItem('email');
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`${backendURL}/course/${teacherEmail}/course-enrollments-by-topic`, {withCredentials: true} );
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
                color: "#fff",
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontSize: "12px",
                      color: "#fff"
                    },
                    value: {
                      show: true,
                      fontSize: "12px",
                      color: "#fff",
                      formatter: val => `${val}%`
                    },
                    total: {
                      show: true,
                      label: "Total",
                      fontSize: "14px",
                      color: "#fff",
                    },
                  },
                },
              },
            },
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "7px",
                colors: ["#fff"]
              }
            },
            legend: {
              position: 'right',
              fontSize: '12px',
              labels: {
                colors: '#fff',
              },
            },
            responsive: [{
              breakpoint: 768,
              options: {
                chart: {
                  height: 300
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        value: {
                          fontSize: "10px"
                        },
                        total: {
                          fontSize: "12px"
                        }
                      }
                    }
                  }
                },
                legend: {
                  fontSize: '8px'
                }
              }
            }]
          }}
        />
      ) : (
        <p className={styles["loading-text"]}>Loading chart data...</p>
      )}
    </div>
  );
};

export default DonutChart;
