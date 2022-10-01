import {
    useEffect,
    useState
} from 'react';

// material-ui
import {
    useTheme
} from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import instance from '../Api/Axios';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
    const theme = useTheme();

    const {
        primary,
        secondary
    } = theme.palette.text;
    const info = theme.palette.info.light;

    // const [series, setSeries] = useState([]);
    const [series] = useState([
        {
            data: [80, 95, 70, 42, 65, 55, 78]
        }
    ]);
    const [loading, setLoading] = useState(true);
    console.log(series);

    const [options, setOptions] = useState(barChartOptions);
    const getNotification = () => {
        setLoading(true);
        instance
            .get(`api/socks/factory/notification/diagram`)
            .then((data) => {
                const filtered = data.data.data.map(
                    (item) => {
                        return item.amount
                    }
                );
                // setSeries([{data: [filtered]}]);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }; 

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary,
                            secondary, secondary,
                            secondary, secondary,
                            secondary
                        ]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
        getNotification()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default MonthlyBarChart;
