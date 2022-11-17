import { useState } from "react";
import instance from "../Api/Axios";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    message,
    Radio,
    Row,
    Space,
} from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import CustomSelect from "../Module/Select/Select";
import moment from "moment";

const OutcomeNakladnoy = () => {
    const [outcomeSocks, setOutcomeSocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [totalInputValue, setTotalInputValue] = useState(null);
    const [client, setClient] = useState(null);
    const [valueDebt, setValueDebt] = useState(null);
    const [deadlineValue, setDeadlineValue] = useState(null);
    const { socksData, measurementData, user, clientData } = useData();
    const navigate = useNavigate();

    const columns = [
        {
            title: "Mahsulot nomi",
            dataIndex: "socksId",
            key: "socksId",
            width: "25%",
            render: (record) => {
                const data = socksData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
        },
        {
            title: "Miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "25%",
        },
        {
            title: "O'lchovi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "25%",
            render: (record) => {
                const data = measurementData?.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
        },
        {
            title: "Narxi",
            dataIndex: "price",
            key: "price",
            width: "25%",
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        setOutcomeSocks((prev) => {
            const product = prev.filter(
                (data) => data.socksId === values.socksId
            );
            if (product[0]) {
                return prev.map((item) => {
                    return item.socksId === product[0].socksId
                        ? {
                              ...item,
                              amount: item.amount + values.amount,
                          }
                        : item;
                });
            } else {
                return [...prev, { ...values, id: values.socksId }];
            }
        });
        setLoading(false);
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        values.socksId === initial.socksId
            ? setOutcomeSocks((prev) => {
                  return prev.map((item) => {
                      return item.socksId === values.socksId
                          ? {
                                ...item,
                                price: values.price,
                                amount: values.amount,
                            }
                          : item;
                  });
              })
            : setOutcomeSocks((prev) => {
                  const newProduct = prev.filter(
                      (data) => data.socksId === values.socksId
                  );
                  const nroduct = prev.filter(
                      (data) => data.socksId !== initial.socksId
                  );
                  return newProduct[0]
                      ? nroduct.map((item) => {
                            return item.socksId === values.socksId
                                ? {
                                      ...item,
                                      amount: item.amount + values.amount,
                                  }
                                : item;
                        })
                      : prev.map((item) => {
                            return item.socksId === initial.socksId
                                ? {
                                      ...values,
                                      id: values.socksId,
                                  }
                                : item;
                        });
              });
        setLoading(false);
    };

    const handleDelete = (arr) => {
        setLoading(true);
        let newTableData = [...outcomeSocks];
        arr.map((itemId) => {
            newTableData = [
                ...newTableData.filter((item) => item.id !== itemId),
            ];
            return null;
        });
        setOutcomeSocks(newTableData);
        setLoading(false);
    };

    const showLargeDrawer = () => {
        setOpen(true);
        let totalsumma = 0;
        outcomeSocks.map((item) => {
            const ulchov = measurementData.filter(
                (data) => data.id === item.measurementId
            );
            const amount =
                ulchov[0].name.toLowerCase() === "tonna"
                    ? 1000
                    : ulchov[0].name.toLowerCase() === "gram"
                    ? 0.001
                    : 1;
            totalsumma = totalsumma + item.price * item.amount * amount;
            return null;
        });
        setTotalInputValue(totalsumma);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onCash = (bol, tableData) => {
        setLoading(true);
        const value = tableData.map((values) => {
            const date = new Date();
            return {
                clientId: client,
                measurementId: values.measurementId ? values.measurementId : 2,
                amount: values.amount,
                socksId: values.id,
                price: values.price,
                branchId: user.branchId,
                date,
                cash: bol,
                debt: valueDebt === "true" ? true : false,
            };
        });

        valueDebt === "true"
            ? value.map((values) => {
                  instance
                      .post("api/socks/factory/outcome", { ...values })
                      .then(function (response) {
                          const deadline = deadlineValue;
                          const value = {
                              clientId: values.clientId,
                              price: values.price * values.amount,
                              outcomeSocksId: response.data.data,
                              deadline,
                          };
                          valueDebt === "true" &&
                              instance
                                  .post("api/socks/factory/debt", { ...value })
                                  .then(function (response) {})
                                  .catch(function (error) {
                                      console.error(error);
                                      if (error.response?.status === 500)
                                          navigate("/server-error");
                                      message.error(
                                          "Tashqi qarzni qo'shishda muammo bo'ldi"
                                      );
                                  })
                                  .finally(() => {
                                      setLoading(false);
                                  });
                      })
                      .catch(function (error) {
                          console.error(error);
                          if (error.response?.status === 500)
                              navigate("/server-error");
                          message.error(
                              "Sotilgan naskini qo'shishda muammo bo'ldi"
                          );
                      })
                      .finally(() => {
                          setLoading(false);
                          setValueDebt(null);
                          setDeadlineValue(null);
                      });
                  return null;
              })
            : instance
                  .post("api/socks/factory/outcome/many", [...value])
                  .then(function (response) {
                      message.success(
                          "Sotilgan quruq meva muvaffaqiyatli qo'shildi"
                      );
                      setOutcomeSocks([]);
                  })
                  .catch(function (error) {
                      console.error(error);
                      if (error.response?.status === 500)
                          navigate("/server-error");
                      message.error(
                          "Sotilgan quruq mevani qo'shishda muammo bo'ldi"
                      );
                  })
                  .finally(() => {
                      setLoading(false);
                  });
        setOpen(false);
        setTotalInputValue(null);
        setDeadlineValue(null);
        setValueDebt(null);
        setClient(null);
    };

    const onChangeDebt = (e) => {
        setValueDebt(e.target.value);
    };

    const onChangeDeadline = (e) => {
        setDeadlineValue(moment(e).toISOString());
    };

    return (
        <>
            <h3>Optom sotish</h3>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={(a) => a}
                columns={columns}
                tableData={outcomeSocks}
                loading={loading}
                setLoading={setLoading}
                pageSizeOptions={[10, 20]}
            />
            <Row justify="end">
                <Button
                    type="primary"
                    size="large"
                    style={{
                        fontSize: "30px",
                        padding: "20px 50px",
                        height: "85px",
                        marginTop: "20px",
                    }}
                    onClick={showLargeDrawer}
                    disabled={outcomeSocks[0] ? false : true}
                >
                    Sotish
                </Button>
                <Drawer
                    title={"Quruq meva sotish"}
                    placement="right"
                    size={"large"}
                    onClose={onClose}
                    open={open}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Bekor qilish</Button>
                            <Button
                                type="primary"
                                onClick={() => onCash(true, outcomeSocks)}
                            >
                                Naqt pul
                            </Button>
                        </Space>
                    }
                >
                    <Row style={{ display: "block" }}>
                        <Col
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginRight: "16px",
                                }}
                            >
                                <p>Mahsulot olayotgan klient</p>
                                <CustomSelect
                                    backValue={"id"}
                                    placeholder={
                                        "Naski sotilayotgan klient"
                                    }
                                    selectData={clientData?.map((item) => ({
                                        ...item,
                                        name: item.fio,
                                    }))}
                                    onChange={(e) => setClient(e)}
                                />
                            </div>
                            <div>
                                <p>Qarzgami</p>
                                <Radio.Group onChange={onChangeDebt}>
                                    <Radio value="false"> Yo'q </Radio>
                                    <Radio value="true">
                                        {" "}
                                        <p>Ha</p>
                                        {valueDebt === "true" ? (
                                            <>
                                                <div
                                                    style={{
                                                        width: "115%",
                                                        marginLeft: "-25px",
                                                    }}
                                                >
                                                    Qaytarish vaqti
                                                    <DatePicker
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        onChange={
                                                            onChangeDeadline
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : null}{" "}
                                    </Radio>
                                </Radio.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row align={"middle"} gutter={[16, 16]}>
                        <Col
                            span={24}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "end",
                            }}
                        >
                            <h3>Jami summa: </h3>
                            <h3
                                style={{
                                    textAlign: "right",
                                    fontSize: "25px",
                                    fontWeight: 700,
                                }}
                            >
                                {totalInputValue}
                            </h3>
                        </Col>
                        <Col
                            span={24}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Space size={"large"}>
                                <Button
                                    onClick={() => onCash(false, outcomeSocks)}
                                    icon={<CreditCardOutlined />}
                                    style={{
                                        padding: "10px 30px",
                                        height: 60,
                                        fontSize: "18px",
                                    }}
                                >
                                    Platitik orqali
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<DollarOutlined />}
                                    onClick={() => onCash(true, outcomeSocks)}
                                    style={{
                                        padding: "10px 30px",
                                        height: 60,
                                        fontSize: "18px",
                                    }}
                                >
                                    Naqt pul orqali
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Drawer>
            </Row>
        </>
    );
};

export default OutcomeNakladnoy;
