import { Route, Routes } from "react-router-dom";
import { useData } from "./Hook/UseData";
import Clients from "./Clients/Clients";
import LayoutMenu from "./Components/Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Error404 from "./Module/ErrorPages/Error404";
import Error500 from "./Module/ErrorPages/Error500";
import Profil from "./Profil/Profil";
import Users from "./Others/Users/Users";
import Others from "./Others/Others/Others";
import OutDebt from "./Debt/OutDebt";
import Socks from "./Socks/Socks";
import IncomeSocks from "./IncomeSocks/IncomeSocks";
import OutcomeSocks from "./OutcomeSocks/OutcomeSocks";
import Material from "./Material/Material";
import Loading from "./Components/Loading";
import BlockPage from "./Module/ErrorPages/BlockPage";
import OutcomeMaterial from "./OutcomeMaterial/OutcomeMaterial";
import NotificationList from "./Components/NotificationList/NotificationList";
import OutcomeNakladnoy from "./OutcomeNakladnoy/OutcomeNakladnoy";
import SocksResource from "./Others/SocksResource/SocksResource";

const RoutesPage = () => {
    const { user, userLoading } = useData();

    if (user && userLoading) {
        return <Loading />;
    }

    return (
        <>
            {user?.block ? (
                <Routes>
                    <Route path="/" element={<BlockPage />} />
                </Routes>
            ) : (
                <Routes>
                    <Route element={<LayoutMenu />}>
                        <Route index element={<Dashboard />} />
                        <Route path="home" element={<Dashboard />} />
                        <Route path="material" element={<Material />} />
                        <Route
                            path="outcome-material"
                            element={<OutcomeMaterial />}
                        />
                        <Route path="socks" element={<Socks />} />
                        <Route
                            path="income-material"
                            element={<IncomeSocks />}
                        />
                        <Route
                            path="outcome-socks"
                            element={<OutcomeSocks />}
                        />
                        <Route
                            path="outcome-nakladnoy"
                            element={<OutcomeNakladnoy />}
                        />
                        <Route path="clients" element={<Clients />} />
                        <Route path="others" element={<Others />} />
                        <Route path="profil" element={<Profil />} />
                        {user.roleId === 1 || user.roleId === 2 ? (
                            <>
                                <Route path="users" element={<Users />} />
                                <Route path="debts" element={<OutDebt />} />
                                <Route
                                    path="socks-resource"
                                    element={<SocksResource />}
                                />
                            </>
                        ) : null}
                        {user.roleId === 1 ? (
                            <Route
                                path="notification"
                                element={<NotificationList />}
                            />
                        ) : null}
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<Error404 />} />
                    <Route path="server-error" element={<Error500 />} />
                </Routes>
            )}
        </>
    );
};

export default RoutesPage;
