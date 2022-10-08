import { useEffect, useState } from "react";
import instance from "../Api/Axios";
import {
    Grid,
    Card,
    Container,
    Typography,
    useTheme,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import AppWidgetSummary from "../Components/AppWidgetSummary";
import AppConversionRates from "../App/AppConversionRates";
import AppCurrentVisits from "../App/AppCurrentVisits";
import AppCurrencySummary from "../Components/AppCurrencySummary";
import { useData } from "../Hook/UseData";
import MonthlyBarChart from "./MonthlyBarChart";
import { Box, Stack } from "@mui/system";
import MainCard from "../Components/MainCard";
import styled from "@emotion/styled";
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: "hidden",
    position: "relative",
    "&:after": {
        content: '""',
        position: "absolute",
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: "50%",
        top: -30,
        right: -180,
    },
    "&:before": {
        content: '""',
        position: "absolute",
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: "50%",
        top: -160,
        right: -130,
    },
}));
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
        <Container className="content-container">
            <Grid className="grid-container" container spacing={3}>
                <Grid className="currency" sx={{marginBottom: '10px'}} xs={12} sm={6} md={3} item key={"dollar"}>
        <>
            <Space size={"large"} className="space-dashboard">
                <Card xs={24} sm={24} md={12} lg={12} xl={12} key={"currency"}>
                    <AppCurrencySummary
                        title={currency?.ccyNmUZ}
                        currency={currency?.rate}
                        color="primary"
                        icon={"ant-design:dollar-circle-filled"}
                    />
                </Grid>
            </Grid>
            <Grid sx={{gap: '20px'}} className="grid-container" spacing={2}>
                <Grid
                    className="grid1"
                    sx={{ width: "70%" }}
                    item
                    xs={12}
                    md={6}
                    lg={3}
                >
                    <AppConversionRates
                        title="Sotilgan mahsulotlar hisoboti"
                        // subheader="(+43%) than last year"
                    />
                </Grid>
                <Grid
                    className="grid1 grid2"
                    sx={{ width: "30%" }}
                    item
                    xs={12}
                    md={6}
                    lg={3}
                >
                    <AppCurrentVisits title="Materiallar hisoboti" />
                </Grid>
            </Grid>
        </Container>
                </Card>
                <Card xs={24} sm={24} md={12} lg={12} xl={12} key={"amount"}>
                    <ApexChart />
                </Card>
            </Space>
        </>
    );
};

export default Dashboard;
