import { Button, Col, Form, Input, message, Row, Space } from "antd";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { useData } from "../Hook/UseData";
import instance from "../Api/Axios";
import CustomSelect from "../Module/Select/Select";

const Profil = () => {
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const { user, getUserData, roleData } = useData();

    useEffect(() => {
        setLoading(false);
    }, []);

    const onReset = () => {
        form.resetFields();
    };

    const onFill = (user) => {
        form.setFieldsValue({
            fio: user.fio,
            roleId: user.roleId,
            phoneNumber: user.phoneNumber,
        });
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
                console.error("Validate Failed:", info);
                setLoading(false);
            });
    };

    const onUpdate = (values) => {
        delete values.passwordRetry;
        instance
            .put(`api/socks/factory/user`, { ...user, ...values })
            .then(function (response) {
                getUserData();
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
                        <Form.Item name="roleId" label="Roleni kiriting">
                            <CustomSelect
                                backValue={"id"}
                                placeholder={"Roleni tanlang"}
                                selectData={roleData
                                    ?.filter(
                                        (item) =>
                                            item?.roleName !== "ROLE_ADMIN"
                                    )
                                    .map((data) => {
                                        return { ...data, name: data.roleName };
                                    })}
                                DValue={user?.roleId}
                                disabled={true}
                            />
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
                            <Space className="profil-buttons" size="middle">
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
                                    onClick={() => onFill(user)}
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
