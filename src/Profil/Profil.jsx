import { Button, Col, Form, Input, message, Row, Space } from "antd";
import { useEffect, useState } from "react";
import CustomSelect from "../Module/Select/Select";
import Loading from "../Components/Loading";
import { useData } from "../Hook/UseData";
import instance from "../Api/Axios";

const Profil = () => {
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    // const { user, getUserData } = useData();

    useEffect(() => {
        setLoading(false);
    }, []);

    const onReset = () => {
        form.resetFields();
    };

    const onFill = (user) => {
        // form.setFieldsValue({
        //     fio: user.fio,
        //     username: user.username,
        //     phoneNumber: user.phoneNumber,
        //     branchId: user.branchGetDTO?.name,
        // });
    };

    const onOk = () => {
        form.validateFields()
            .then((values) => {
                Object.keys(values).forEach(
                    (key) => values[key] === undefined && delete values[key]
                );
                setLoading(true);
                const bothFieldsAreFilled =
                    values.password && values.passwordRetry;
                const passwordsMatch =
                    values?.password === values?.passwordRetry;
                if (bothFieldsAreFilled) {
                    if (passwordsMatch) {
                        onUpdate(values);
                        form.resetFields();
                    } else {
                        setLoading(false);
                    }
                } else {
                    onUpdate(values);
                    form.resetFields();
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
                setLoading(false);
            });
    };

    const onUpdate = (values) => {
        delete values.passwordRetry;
        instance
            .put(`api/socks/factory/user`, { ...values })
            .then(function (response) {
                // getUserData();
                message.success("Foydalanuvchi muvaffaqiyatli taxrirlandi");
            })
            .catch(function (error) {
                console.error(error);
                message.error("Foydalanuvchini taxrirlashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <h3>Profil</h3>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                }}
            >
                <h4>Profil malumotlarini o'zgartirish</h4>
            </div>
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="fio" label="Foydalanuvchi ismi">
                            <Input placeholder="Foydalanuvchi ismini kiriting" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="username" label="Usernameni kiriting">
                            <Input placeholder="Usernameni kiriting" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="branchId" label="Ishlash filiali">
                            {/* <CustomSelect
                                backValue={"id"}
                                // DValue={user.branchGetDTO?.id}
                            /> */}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label="Foydalanuvchi nomeri"
                        >
                            <Input placeholder="Foydalanuvchi nomeri kiriting" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="password" label="Parol" hasFeedback>
                            <Input.Password placeholder="Parolni kiriting" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="passwordRetry"
                            label="Parolni qaytadan kiriting"
                            hasFeedback
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Parolni noto'g'ri kiritayapsiz"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Parolni qaytadan kiriting" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} justify="center">
                    <Col span={24}>
                        <Form.Item>
                            <Space
                                // align="center"
                                className="profil-buttons"
                                size="middle"
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={onOk}
                                    style={{ width: 120 }}
                                >
                                    O'zgartirish
                                </Button>
                                <Button
                                    htmlType="button"
                                    onClick={onReset}
                                    style={{ width: 120 }}
                                >
                                    Tozalash
                                </Button>
                                <Button
                                    htmlType="button"
                                    // onClick={() => onFill(user)}
                                    style={{ width: 120 }}
                                >
                                    To'ldirish
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Profil;
