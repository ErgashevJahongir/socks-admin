import { useEffect, useState } from "react";
import instance from "../Api/Axios";
import { Card } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { Space } from "antd";
import AppCurrencySummary from "../Components/AppCurrencySummary";
import { useData } from "../Hook/UseData";
import Loading from "../Components/Loading";

const Dashboard = () => {
    const { socksData } = useData();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState([]);
    const getNotification = () => {
        setLoading(true);
        instance
            .get(`api/socks/factory/notification/diagram`)
            .then((data) => {
                setData(data.data.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const getCurrency = () => {
        setLoading(true);
        instance
            .get(`api/socks/factory/api/socks/factory/currency`)
            .then((data) => {
                setCurrency(data.data.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getNotification();
        getCurrency();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const ApexChart = () => {
        const [options, setOptions] = useState({
            chart: {
                type: "bar",
                height: 380,
            },
            plotOptions: {
                bar: {
                    barHeight: "100%",
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: "bottom",
                    },
                },
            },
            colors: data.map((item) => {
                const color =
                    item.color === "GREEN"
                        ? "#0f0"
                        : item.color === "YELLOW"
                        ? "#ff0"
                        : "#f00";
                return color;
            }),
            dataLabels: {
                enabled: true,
                textAnchor: "start",
                style: {
                    colors: ["#fff"],
                },
                formatter: function (val, opt) {
                    return (
                        opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                    );
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true,
                },
            },
            stroke: {
                width: 1,
                colors: ["#fff"],
            },
            xaxis: {
                categories: data.map((item) => {
                    const socks = socksData.filter(
                        (data) => data.id === item.socksId
                    );
                    return socks[0]?.name || "tur o'chirilgan";
                }),
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            title: {
                text: "Mahsulotlar soni",
                align: "center",
                floating: true,
            },
            subtitle: {
                text: "Mahsulotlar soni haqida malumot",
                align: "center",
            },
            tooltip: {
                theme: "dark",
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function () {
                            return "";
                        },
                    },
                },
            },
        });
        const [series, setSeries] = useState([
            {
                data: data.map((item) => {
                    return item.amount;
                }),
            },
        ]);

        return (
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={380}
                />
            </div>
        );
    };

    return (
        <>
            <Space size={"large"} className="space-dashboard">
                <Card xs={24} sm={24} md={12} lg={12} xl={12} key={"currency"}>
                    <AppCurrencySummary
                        title={currency?.ccyNmUZ}
                        currency={currency?.rate}
                        color="primary"
                        icon={"ant-design:dollar-circle-filled"}
                    />
                </Card>
                <Card xs={24} sm={24} md={12} lg={12} xl={12} key={"amount"}>
                    <ApexChart />
                </Card>
            </Space>
        </>
    );
};

export default Dashboard;
