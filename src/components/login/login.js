import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCardIcon from "@mui/icons-material/AddCard";

import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";

import { handleLoginAPI } from "../../services/userServices.js";
import Alert from "../alert/alert.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const getEmail = (event) => {
        setEmail(event.target.value);
    };

    const getPassword = (event) => {
        setPassword(event.target.value);
    };
    //
    const loginHandler = async () => {
        let data;
        try {
            data = await handleLoginAPI(email, password);
            console.log(data);
            if (data.errCode !== 0) {
                setIsError(true);
                setErrorMessage(data.message);
                return;
            }
            if (data.errCode === 0) {
                setIsError(false);
                setErrorMessage("");
                // Cookies.set("LoggedIn", data.data.SessionID, { expires: process.env.COOKIE_EXPIRATION_TIME });
                await localStorage.setItem(
                    "UserData",
                    JSON.stringify(data.data)
                );
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            }
        }
    };

    const closeMessage = () => {
        setIsError(false);
        setErrorMessage("");
    };

    return (
        <div>
            <Container
                className="error-container"
                maxWidth="lg"
                sx={{ marginTop: 5 }}
            >
                {isError === true && (
                    <Alert
                        severity="error"
                        action={closeMessage}
                        message={errMessage}
                    ></Alert>
                )}
            </Container>
            <div className="login-page">
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid
                            item
                            md={6}
                            xl={5}
                            className="login-container"
                            style={{ backgroundColor: "#f8f8f8" }}
                        >
                            <h2>????ng Nh???p</h2>

                            <Stack style={{ marginBottom: "10px" }}>
                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>?????a ch??? Email</label>
                                    <input
                                        type="text"
                                        placeholder="?????a ch??? Email"
                                        name="email"
                                        className="email"
                                        onChange={(e) => getEmail(e)}
                                    ></input>
                                </Stack>

                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>M???t kh???u</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="password"
                                        placeholder="??????????????????????????????"
                                        onChange={(e) => getPassword(e)}
                                    ></input>
                                </Stack>

                                <Stack style={{ marginBottom: "20px" }}>
                                    <button
                                        className="login-button"
                                        onClick={loginHandler}
                                    >
                                        ????ng nh???p
                                    </button>
                                </Stack>
                                <a href="/"> Qu??n m???t kh???u?</a>
                            </Stack>
                            <Stack>
                                <p>ho???c ti???p t???c v???i</p>
                            </Stack>

                            <Stack>
                                <button className="bandland">
                                    Li??n k???t v???i Bandland
                                </button>
                            </Stack>

                            <Stack>
                                <a href="/" className="bandland-link">
                                    Ch??a ph???i th??nh vi??n Bandland?
                                </a>
                            </Stack>
                        </Grid>
                        <Grid item md={6} xl={5} className="info-container">
                            <Stack>
                                <h2>L?? do ????ng k???</h2>
                            </Stack>
                            <Stack>
                                <p>
                                    T???o t??i kho???n nhanh ch??ng, d??? d??ng v?? mi???n
                                    ph??! H??n n???a, b???n s??? ???????c truy c???p v??o nh???ng
                                    t??nh n??ng tuy???t v???i ch??? d??nh ri??ng cho th??nh
                                    vi??n:
                                </p>
                            </Stack>
                            <Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <LocalShippingIcon></LocalShippingIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Theo d??i ????n h??ng online d??? d??ng
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <AddShoppingCartIcon></AddShoppingCartIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Xem l???ch s??? mua h??ng
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <AddCardIcon></AddCardIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Thao t??c thanh to??n nhanh g???n
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                            <Stack sx={{ marginTop: "15px" }}>
                                <p sx={{ fontSize: "14px" }}>
                                    Ch??a ????ng k?? th??nh vi??n?
                                </p>
                            </Stack>
                            <Stack>
                                <Link to="/signup">
                                    <button>T???o t??i kho???n</button>
                                </Link>
                            </Stack>
                            <Stack>
                                <p sx={{ fontSize: "14px" }}>
                                    D??? li???u c?? nh??n c???a b???n ???????c ch??ng t??i b???o
                                    v??? c???n th???n, vui l??ng ?????c th??ng tin b???o m???t{" "}
                                    <a href="/">t???i ????y</a>.
                                </p>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default Login;
