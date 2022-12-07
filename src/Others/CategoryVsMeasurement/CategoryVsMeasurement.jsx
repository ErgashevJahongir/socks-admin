import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../Api/Axios";
import { message } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import "./CategoryVsMeasurment.css";

const CategoryVsMeasurement = () => {
    const [pageData, setPageData] = useState({
        measurement: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });
    const [pageDataCategory, setPageDataCategory] = useState({
        category: [],
        loadingCategory: true,
        currentCategory: 1,
        pageSizeCategory: 10,
    });
    const { getCategoryData } = useData();
    const navigate = useNavigate();

    const getCategory = () => {
        setPageDataCategory((prev) => ({ ...prev, loadingCategory: true }));
        instance
            .get(`api/socks/factory/category/getAll`)
            .then((data) => {
                getCategoryData();
                setPageDataCategory((prev) => ({
                    ...prev,
                    category: data.data?.data,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyalarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageDataCategory((prev) => ({
                    ...prev,
                    loadingCategory: false,
                }))
            );
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
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get("api/socks/factory/measurement/getAll")
            .then((data) => {
                getMeasurment();
                setPageData((prev) => ({
                    ...prev,
                    measurement: data.data?.data,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("O'lchov birligilarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
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
                        pageSizeOptions={[10, 20]}
                        getData={getCategory}
                        columns={columnsCategory}
                        tableData={pageDataCategory.category}
                        current={pageDataCategory.currentCategory}
                        pageSize={pageDataCategory.pageSizeCategory}
                        setCurrent={(newProp) =>
                            setPageDataCategory((prev) => ({
                                ...prev,
                                currentCategory: newProp,
                            }))
                        }
                        setPageSize={(newProp) =>
                            setPageDataCategory((prev) => ({
                                ...prev,
                                pageSizeCategory: newProp,
                            }))
                        }
                        loading={pageDataCategory.loadingCategory}
                        setLoading={(newProp) =>
                            setPageDataCategory((prev) => ({
                                ...prev,
                                loadingCategory: newProp,
                            }))
                        }
                    />
                </div>
                <div>
                    <h3>O'lchov birligi</h3>
                    <CustomTable
                        pageSizeOptions={[10, 20]}
                        getData={getMeasurment}
                        columns={columns}
                        tableData={pageData.measurement}
                        current={pageData.current}
                        pageSize={pageData.pageSize}
                        setCurrent={(newProp) =>
                            setPageData((prev) => ({
                                ...prev,
                                current: newProp,
                            }))
                        }
                        setPageSize={(newProp) =>
                            setPageData((prev) => ({
                                ...prev,
                                pageSize: newProp,
                            }))
                        }
                        loading={pageData.loading}
                        setLoading={(newProp) =>
                            setPageData((prev) => ({
                                ...prev,
                                loading: newProp,
                            }))
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryVsMeasurement;
