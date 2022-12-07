import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../Api/Axios";
import { message } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import "./CategoryVsMeasurment.css";

const CategoryVsMeasurement = () => {
    const [category, setCategory] = useState([]);
    const [measurement, setMeasurment] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentCategory, setCurrentCategory] = useState(1);
    const [pageSizeCategory, setPageSizeCategory] = useState(10);
    const { getCategoryData } = useData();
    const navigate = useNavigate();

    const getCategory = () => {
        setLoadingCategory(true);
        instance
            .get(`api/socks/factory/category/getAll`)
            .then((data) => {
                getCategoryData();
                setCategory(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyalarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoadingCategory(false));
    };

    const columnsCategory = [
        {
            title: "Kategoriya nomi",
            dataIndex: "name",
            key: "name",
            width: "100%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const getMeasurment = () => {
        setLoading(true);
        instance
            .get("api/socks/factory/measurement/getAll")
            .then((data) => {
                getMeasurment();
                setMeasurment(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("O'lchov birligilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "O'lchov nomi",
            dataIndex: "name",
            key: "name",
            width: "100%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <div className="category">
            <div className="others">
                <div>
                    <h3>Kategoriya</h3>
                    <CustomTable
                        current={currentCategory}
                        pageSize={pageSizeCategory}
                        pageSizeOptions={[10, 20]}
                        setCurrent={setCurrentCategory}
                        setPageSize={setPageSizeCategory}
                        getData={getCategory}
                        columns={columnsCategory}
                        tableData={category}
                        loading={loadingCategory}
                        setLoading={setLoadingCategory}
                    />
                </div>
                <div>
                    <h3>O'lchov birligi</h3>
                    <CustomTable
                        current={current}
                        pageSize={pageSize}
                        pageSizeOptions={[10, 20]}
                        setCurrent={setCurrent}
                        setPageSize={setPageSize}
                        getData={getMeasurment}
                        columns={columns}
                        tableData={measurement}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryVsMeasurement;
