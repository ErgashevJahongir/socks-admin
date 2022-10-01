import { message, notification } from "antd";
import { useEffect, useState } from "react";
import instance from "../Api/Axios";
import { Grid, Card, Container, Typography, useTheme } from "@mui/material";
import AppWidgetSummary from "../Components/AppWidgetSummary";
import AppCurrentVisits from "../App/AppCurrentVisits";
import AppWebsiteVisits from "../App/AppWebsiteVisits";
import AppCurrencySummary from "../Components/AppCurrencySummary";

const Dashboard = () => {
    const theme = useTheme();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [notificationn, setNotificationn] = useState([]);
    const [currency, setCurrency] = useState([]);
    const getNotification = (current, pageSize) => {
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
        <>
            {/* {son === 1 &&
                notificationn.map((item) => {
                    const args = {
                        message: item.title,
                        description: item.text,
                        duration: 0,
                        onClick: () => {
                            console.log("Notification Clicked!");
                        },
                        onClose: () => {
                            instance
                                .put(
                                    `api/oil/station/notification/update?id=${item.id}`
                                )
                                .then((data) => null)
                                .catch((err) => console.log(err));
                        },
                    };
                    son = 2;
                    console.log(notificationn);
                    notification.warning(args);
                    return null;
                })} */}
            {data.map((item) => (
                <Container className="content-container">
                    <Grid className="grid-container" container spacing={3}>
                        <Card xs={12} sm={6} md={3} key={item.id} sx={{width: '30%'}}>
                            <AppCurrencySummary
                                title={currency.ccyNmUZ}
                                currency={currency.rate}
                                color="primary"
                                icon={"ant-design:dollar-circle-filled"}
                            />
                        </Card>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title={item.socksId}
                                total={item.amount}
                                // item ? item.color : 0
                                sx={{ bgcolor: item.amount > 10000 ? "green" : ''}}
                                icon={"ant-design:pie-chart-filled"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title={item.socksId}
                                total={item.amount}
                                color="warning"
                                sx={{
                                    bgcolor: item.amount > 5000 ? "yellow" : "",
                                }}
                                icon={"ant-design:windows-filled"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title={item.socksId}
                                total={item.amount}
                                color="error"
                                sx={{ bgcolor: item.amount > 2000 ? 'red' : '' && item.amount > 5000 ? 'yellow' : '' && item.amount > 10000 ? 'green' : ''}}
                                icon={"ant-design:bug-filled"}
                            />
                        </Grid>
                    </Grid>
                 {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />

            
          </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                // { label: item.name, value: item.amount },
                // { label: item.name, value: item.amount },
                // { label: item.name, value: item.amount },
                // { label: item.name, value: item.amount },
                // { label: item.name, value: 4344 },
                { label: item.name, value: 5435 },
                { label: item.name, value: 1443 },
                { label: item.name, value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}
                </Container>
            ))}
        </>
    );
};

export default Dashboard;
