import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const tokenStringSes = sessionStorage.getItem("socks-token");
        const tokenStringLoc = localStorage.getItem("socks-token");
        const userToken = JSON.parse(tokenStringSes || tokenStringLoc);
        return userToken;
    };
    const [token, setToken] = useState(getToken());
    const saveToken = (userToken, save) => {
        save
            ? localStorage.setItem("socks-token", JSON.stringify(userToken))
            : sessionStorage.setItem("socks-token", JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
}
