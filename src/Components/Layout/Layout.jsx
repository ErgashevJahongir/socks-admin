import { Layout, BackTop } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const { Content } = Layout;

function LayoutMenu() {
    return (
        <Layout>
            <Layout className="site-layout">
                <Navbar />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "12px 8px",
                        minHeight: "100vh",
                    }}
                >
                    <div className="container">
                        <BackTop />
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutMenu;
