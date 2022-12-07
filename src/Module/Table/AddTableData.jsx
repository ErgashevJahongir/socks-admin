import { useState } from "react";
import { Button, Col, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CollectionCreateForm = ({
    visible,
    onCreate,
    onCancel,
    formData,
    modalTitle,
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={visible}
            title={modalTitle}
            okText="Qo'shish"
            cancelText="Bekor qilish"
            width={
                Object.keys(formData).length > 8
                    ? window.innerWidth > 720
                        ? 700
                        : 350
                    : 350
            }
            onCancel={() => {
                onCancel();
            }}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.error("Validate Failed:", info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                {formData?.map((data) => {
                    return (
                        <Col
                            span={
                                Object.keys(formData).length > 8
                                    ? window.innerWidth > 720
                                        ? 12
                                        : 24
                                    : 24
                            }
                            key={data.name}
                        >
                            <Form.Item
                                key={data.name}
                                name={data.name}
                                label={data.label}
                                rules={[
                                    {
                                        required: data.required
                                            ? data.required
                                            : true,
                                        message: `${data.label}ni kiriting`,
                                    },
                                ]}
                            >
                                {data.input}
                            </Form.Item>
                        </Col>
                    );
                })}
            </Form>
        </Modal>
    );
};

const AddData = ({ onCreate, formData, modalTitle }) => {
    const [visible, setVisible] = useState(false);

    const onCreatee = (values) => {
        onCreate(values);
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                className="add-button"
                icon={<PlusOutlined />}
            >
                Qo'shish
            </Button>
            <CollectionCreateForm
                formData={formData}
                modalTitle={modalTitle}
                visible={visible}
                onCreate={onCreatee}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default AddData;
