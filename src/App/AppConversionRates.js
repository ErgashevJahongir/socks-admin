import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import BaseOptionChart from '../Components/chart/BaseOptionChart';
import { fNumber } from '../Utils/formatNumber';
import {
  useEffect,
  useState
} from "react";
import instance from "../Api/Axios";
import {
  useData
} from '../Hook/UseData';
// components

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  // chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, ...other }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    socksData
  } = useData();
  const getNotification = () => {
      setLoading(true);
      instance
          .get(`api/socks/factory/notification/statistics`)
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
    const socks = socksData.filter(
        (data) => data.id === item.socksId
    );
    return socks[0]?.name || "tur o'chirilgan"
})

  const chartSeries = data.map((i) => i.amount);
  const chartMeasurement = data.map((i) => i.measurementName);
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
