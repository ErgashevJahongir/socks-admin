import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import {
    useTheme,
    styled
} from '@mui/material/styles';
import {
    Card,
    CardHeader
} from '@mui/material';
import {
    fNumber
} from '../Utils/formatNumber';
import BaseOptionChart from '../Components/chart/BaseOptionChart';
import {
    useEffect,
    useState
} from "react";
import instance from "../Api/Axios";
import {
    useData
} from '../Hook/UseData';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({
    theme
}) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': {
        height: CHART_HEIGHT
    },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

// ----------------------------------------------------------------------

AppCurrentVisits.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartColors: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.array,
};

export default function AppCurrentVisits({
    title,
    subheader,
    chartData,
    ...other
}) {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {
      createMaterialData
    } = useData();
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

    useEffect(() => {
        getNotification();
    }, []);

    const chartLabels = data.map((item) => {
      const socks = createMaterialData.filter(
          (data) => data.id === item.materialId
      );
      return socks[0]?.name || "tur o'chirilgan"
  })

  const chartColors = data.map((item) => {
    const color =
        item.color === "GREEN"
            ? "#0f0"
            : item.color === "YELLOW"
            ? "#ff0"
            : "#f00";
    return color;
})

    const chartSeries = data.map((i) => i.amount);
    
    const chartOptions = merge(BaseOptionChart(), {
        colors: chartColors,
        labels: chartLabels,
        stroke: {
            colors: [theme.palette.background.paper]
        },
        legend: {
            floating: true,
            horizontalAlign: 'center'
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false
            }
        },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: false
                    }
                }
            },
        },
    });

    return (
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
  
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
        </ChartWrapperStyle>
      </Card>
    );
}
