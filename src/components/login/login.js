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
                            <h2>Đăng Nhập</h2>

                            <Stack style={{ marginBottom: "10px" }}>
                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Địa chỉ Email</label>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ Email"
                                        name="email"
                                        className="email"
                                        onChange={(e) => getEmail(e)}
                                    ></input>
                                </Stack>

                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="password"
                                        placeholder="●●●●●●●●●●"
                                        onChange={(e) => getPassword(e)}
                                    ></input>
                                </Stack>

                                <Stack style={{ marginBottom: "20px" }}>
                                    <button
                                        className="login-button"
                                        onClick={loginHandler}
                                    >
                                        Đăng nhập
                                    </button>
                                </Stack>
                                <a href="/"> Quên mật khẩu?</a>
                            </Stack>
                            <Stack>
                                <p>hoặc tiếp tục với</p>
                            </Stack>

                            <Stack>
                                <button className="bandland">
                                    Liên kết với Bandland
                                </button>
                            </Stack>

                            <Stack>
                                <a href="/" className="bandland-link">
                                    Chưa phải thành viên Bandland?
                                </a>
                            </Stack>
                        </Grid>
                        <Grid item md={6} xl={5} className="info-container">
                            <Stack>
                                <h2>Lý do đăng ký?</h2>
                            </Stack>
                            <Stack>
                                <p>
                                    Tạo tài khoản nhanh chóng, dễ dàng và miễn
                                    phí! Hơn nữa, bạn sẽ được truy cập vào những
                                    tính năng tuyệt vời chỉ dành riêng cho thành
                                    viên:
                                </p>
                            </Stack>
                            <Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <LocalShippingIcon></LocalShippingIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Theo dõi đơn hàng online dễ dàng
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <AddShoppingCartIcon></AddShoppingCartIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Xem lịch sử mua hàng
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <AddCardIcon></AddCardIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Thao tác thanh toán nhanh gọn
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                            <Stack sx={{ marginTop: "15px" }}>
                                <p sx={{ fontSize: "14px" }}>
                                    Chưa đăng ký thành viên?
                                </p>
                            </Stack>
                            <Stack>
                                <Link to="/signup">
                                    <button>Tạo tài khoản</button>
                                </Link>
                            </Stack>
                            <Stack>
                                <p sx={{ fontSize: "14px" }}>
                                    Dữ liệu cá nhân của bạn được chúng tôi bảo
                                    vệ cẩn thận, vui lòng đọc thông tin bảo mật{" "}
                                    <a href="/">tại đây</a>.
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
