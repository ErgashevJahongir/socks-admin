import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Clients from "./Clients/Clients";
import useToken from "./Hook/UseToken";
import { useData } from "./Hook/UseData";
import LayoutMenu from "./Components/Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import WorkerDebt from "./Debt/WorkerDebt";
import Login from "./Login/Login";
import Error404 from "./Module/ErrorPages/Error404";
import Error500 from "./Module/ErrorPages/Error500";
import Profil from "./Profil/Profil";
import Users from "./Others/Users/Users";
import Worker from "./Others/Worker/Worker";
import Others from "./Others/Others/Others";
import Branch from "./Others/BranchVsRole/Branch";
import InDebt from "./Debt/InDebt";
import OutDebt from "./Debt/OutDebt";
import Notification from "./Components/Notification/Notification";
import Socks from "./Socks/Socks";
import WarehouseSocks from "./WarehouseSocks/WarehouseSocks";
import IncomeSocks from "./IncomeSocks/IncomeSocks";
import OutcomeSocks from "./OutcomeSocks/OutcomeSocks";
import Material from "./Material/Material";

function App() {
    const { token } = useToken();
    const navigate = useNavigate();
    const { user } = useData();

    useEffect(() => {
        if (!token) {
            return navigate("/Login", { replace: true });
        }
    }, []);
    return (
        <Routes>
            <Route element={<LayoutMenu />}>
                <Route index element={<Dashboard />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="material" element={<Material />} />
                <Route path="socks" element={<Socks />} />
                <Route
                    path="warehouse-socks"
                    element={<WarehouseSocks />}
                />
                <Route path="income-socks" element={<IncomeSocks />} />
                <Route path="outcome-socks" element={<OutcomeSocks />} />
                <Route path="worker-debts" element={<WorkerDebt />} />
                <Route path="indebts" element={<InDebt />} />
                <Route path="outdebts" element={<OutDebt />} />
                <Route path="clients" element={<Clients />} />
                <Route path="users" element={<Users />} />
                <Route path="worker" element={<Worker />} />
                <Route path="others" element={<Others />} />
                <Route path="branchs" element={<Branch />} />
                <Route path="profil" element={<Profil />} />
                <Route path="notification" element={<Notification />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
            <Route path="server-error" element={<Error500 />} />
        </Routes>
    );
}

export default App;
