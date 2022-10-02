import { message, notification } from "antd";
import { useEffect, useState } from "react";
import instance from "../Api/Axios";
import { Grid, Card, Container, Typography, useTheme } from "@mui/material";
import AppWidgetSummary from "../Components/AppWidgetSummary";
import AppConversionRates from "../App/AppConversionRates";
import AppCurrentVisits from "../App/AppCurrentVisits";
import AppCurrencySummary from "../Components/AppCurrencySummary";
import { useData } from "../Hook/UseData";
import MonthlyBarChart from "./MonthlyBarChart";
import { Box, Stack } from "@mui/system";
import MainCard from "../Components/MainCard";

const Dashboard = () => {
    const theme = useTheme();
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

    return (
        <Container className="content-container">
            <Grid className="grid-container" container spacing={3}>
                <Grid
                    xs={12}
                    sm={6}
                    md={3}
                    item
                    key={"dollar"}
                    sx={{ marginTop: "2%" }}
                >
                    <AppCurrencySummary
                        title={currency.ccyNmUZ}
                        currency={currency.rate}
                        color="primary"
                        icon={"ant-design:dollar-circle-filled"}
                    />
                </Grid>
                {/* {data.map((item, i) => {
                    const socks = socksData.filter(
                        (data) => data.id === item.socksId
                    );
                    return (
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title={socks[0]?.name || "tur o'chirilgan"}
                                total={item.amount}
                                sx={{
                                    bgcolor:
                                        item.color === "GREEN"
                                            ? "green"
                                            : item.color === "YELLOW"
                                            ? "yellow"
                                            : "red",
                                }}
                                icon={"ant-design:pie-chart-filled"}
                            />
                        </Grid>
                    );
                })} */}
                {/* <Grid sx={{ height: '50vh'}} item xs={12} md={6} lg={8}>
                    <AppConversionRates
                        title="Conversion Rates"
                        subheader="(+43%) than last year"
                        chartData={[
                            { label: "France", value: data[1]?.amount },
                            { label: "l", value: data[2]?.amount },
                            { label: "China", value: data[3]?.amount },
                            { label: "Canada", value: data[4]?.amount },
                        ]}
                        chartColors={[
                            theme.palette.primary.main,
                            // theme.palette.chart.yellow[0],
                            // theme.palette.chart.blue[0],
                            // theme.palette.chart.violet[0],
                            // theme.palette.chart.green[0],
                            // theme.palette.chart.red[0]
                        ]}
                    />
                </Grid> */}
            </Grid>
        </Container>
    );
};

export default Dashboard;
