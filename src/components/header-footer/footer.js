import "./footer.scss";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WalletIcon from "@mui/icons-material/Wallet";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { Box, Grid, Container, Button } from "@mui/material";

function Footer() {
    return (
        <Container
            maxWidth="100%"
            disableGutters={true}
            className="footer-container"
        >
            <Container maxWidth="100%" className="store-advantages">
                <Container className="store-advantages-detail">
                    <Container className="store-advantages-detail-items">
                        <Box className="store-advantages-detail-items-icon">
                            <MilitaryTechIcon
                                sx={{
                                    color: "black",
                                    width: "32px",
                                    height: "32px",
                                }}
                            ></MilitaryTechIcon>
                        </Box>
                        <Box className="store-advantages-detail-items-title">
                            Đơn Vị Bán Lẻ Nhạc Cụ Lớn Nhất Châu Á
                        </Box>
                        <Box className="store-advantages-detail-items-content">
                            Hơn 50.000 nghệ sỹ tin tưởng và mua hàng trực tuyến
                            cùng chúng tôi từ năm 2013.
                        </Box>
                    </Container>
                    <Container className="store-advantages-detail-items">
                        <Box className="store-advantages-detail-items-icon">
                            <LocalShippingIcon
                                sx={{
                                    Containeror: "black",
                                    width: "32px",
                                    height: "32px",
                                }}
                            ></LocalShippingIcon>
                        </Box>
                        <Box className="store-advantages-detail-items-title">
                            Giao Hàng Miễn Phí & Đảm Bảo Vận Chuyển
                        </Box>
                        <Box className="store-advantages-detail-items-content">
                            Giao hàng miễn phí toàn quốc cho mọi đơn hàng.
                        </Box>
                    </Container>
                    <Container className="store-advantages-detail-items">
                        <Box className="store-advantages-detail-items-icon">
                            <WalletIcon
                                sx={{
                                    Containeror: "black",
                                    width: "32px",
                                    height: "32px",
                                }}
                            ></WalletIcon>
                        </Box>
                        <Box className="store-advantages-detail-items-title">
                            Mua Sắm Trực Tuyến Đảm Bảo An Toàn
                        </Box>
                        <Box className="store-advantages-detail-items-content">
                            Sắm hàng online dễ dàng và bảo mật cùng hệ thống
                            thanh toán đáng tin cậy của chúng tôi.
                        </Box>
                    </Container>
                    <Container className="store-advantages-detail-items">
                        <Box className="store-advantages-detail-items-icon">
                            <LocalOfferIcon
                                sx={{
                                    Containeror: "black",
                                    width: "32px",
                                    height: "32px",
                                }}
                            ></LocalOfferIcon>
                        </Box>
                        <Box className="store-advantages-detail-items-title">
                            Đơn Giá Đã Bao Gồm Các Khoản Thuế
                        </Box>
                        <Box className="store-advantages-detail-items-content">
                            Tất cả đơn giá đều bao gồm thuế, bạn có thể tham
                            khảo hàng loạt sản phẩm một cách dễ dàng.
                        </Box>
                    </Container>
                </Container>
            </Container>

            <Container maxWidth="100%" className="store-information">
                <Container className="store-information-linked">
                    <FacebookRoundedIcon
                        sx={{ color: "white", width: "32px", height: "32px" }}
                    ></FacebookRoundedIcon>

                    <InstagramIcon
                        sx={{ color: "white", width: "32px", height: "32px" }}
                    ></InstagramIcon>
                </Container>

                <Grid
                    container
                    sx={{ maxWidth: "lg", margin: "auto", padding: "0 15px" }}
                    className="information-container"
                >
                    <Grid item xl={3}>
                        <Box className="footer-information-title">
                            Thương hiệu
                        </Box>
                        <Box>
                            <ul sx={{ lineHeight: "1.5" }}>
                                <li>Fender</li>
                                <li>PRS</li>
                                <li>Ibanez</li>
                                <li>Marshall</li>
                                <li>Martin Guitars</li>
                                <li>Squier</li>
                            </ul>
                        </Box>

                        <Box sx={{ textAlign: "left" }}>Xem hết</Box>
                    </Grid>
                    <Grid item xl={3}>
                        <Box className="footer-information-title">
                            Phân loại
                        </Box>
                        <Box>
                            <ul>
                                <li>Hàng mới về</li>
                                <li>Guitars & Basses</li>
                                <li>Thiết bị DJ</li>
                                <li>Amplifiers & Monitors</li>
                                <li>Trống & Bộ gõ</li>
                                <li>Phần mềm & Thu âm</li>
                            </ul>
                        </Box>
                        <Box sx={{ textAlign: "left" }}>Xem hết</Box>
                    </Grid>
                    <Grid item xl={3}>
                        <Box className="footer-information-title">
                            Thông tin chung
                        </Box>
                        <Box>
                            <ul>
                                <li>Giới thiệu</li>
                                <li>Tìm cửa hàng</li>
                                <li>Đặt hàng & thanh toán</li>
                                <li>Giao nhận</li>
                                <li>Chính sách đổi trả</li>
                                <li>Quyền riêng tư</li>
                                <li>Điều khoản sử dụng</li>
                                <li>Liên hệ</li>
                                <li>Chế độ bảo hành</li>
                                <li>Bải viết</li>
                                <li>Tuyển dụng</li>
                                <li>Blog</li>
                            </ul>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                            }}
                        >
                            <Box className="footer-information-title" sx={{textAlign: "left"}}>
                                ĐĂNG KÝ NHẬN THÔNG BÁO QUA MAIL
                            </Box>
                            <Box sx={{ marginBottom: "14px" }}>
                                Đăng ký nhận thông tin ưu đãi Tết từ Swee Lee!
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#af9966",
                                fontWeight: "700",
                                padding: "9px 29px",
                                "&:hover": { backgroundColor: "#917c4f" },
                                marginBottom: "16px",
                            }}
                        >
                            Đăng ký
                        </Button>
                        <Container
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                            }}
                            disableGutters={true}
                        >
                            <Box sx={{ fontWeight: "700" }}>
                                CHỌN QUỐC GIA CỦA BẠN
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}

export default Footer;
