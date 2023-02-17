import { Link, Routes, Route } from "react-router-dom";
import Login from "../login/login.js";
import ProductCard from "../product/ProductCard.js";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AssuredWorkloadRoundedIcon from "@mui/icons-material/AssuredWorkloadRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import data from "./test-data.json";

import "./MainPage.scss";

function MainPage() {
    return (
        // <Container>
        //     <Row>
        //         <Col xl={2}><ProductCard></ProductCard></Col>

        //     </Row>
        // </Container>

        <div>
            <Container>
                <div style={{ height: "auto", width: "100%", marginTop: 20 }}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img
                                style={{ height: "auto", width: "100%" }}
                                alt="1"
                                src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/2022_Year_End_Deals_1110x333_2220x666_2x_SLVN_2200x660_crop_top.jpg?v=1669005534"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ height: "auto", width: "100%" }}
                                alt="2"
                                src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/ESP_Brand_Launch_1110x333_2220x666_2x_3ad6f104-a56f-43a3-beb1-717ec9385ab3_2200x660_crop_top.jpg?v=1668389025"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ height: "auto", width: "100%" }}
                                alt="3"
                                src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/Fender_MIJ_Collection_1110x333_2220x666_2x_SLVN_2200x660_crop_top.jpg?v=1667186833"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ height: "auto", width: "100%" }}
                                alt="4"
                                src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/Upgrade_Your_Telecaster_1110x333_2220x666_2x_SLVN_2200x660_crop_top.jpg?v=1665974127Z"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <Grid container className="providing-service">
                    <Grid className="providing-service-card" xl={3} item>
                        <div>
                            <div className="providing-service-card-icon">
                                <ForumRoundedIcon></ForumRoundedIcon>
                            </div>
                        </div>
                        <div className="providing-service-card-info">
                            <div className="providing-service-card-info-title">
                                Hỗ trợ nhiệt tình
                            </div>
                            <div className="providing-service-card-info-detail">
                                Luôn giúp bạn có sự lựa chọn thích hợp
                            </div>
                        </div>
                    </Grid>
                    <Grid className="providing-service-card" xl={3} item>
                        <div>
                            <div className="providing-service-card-icon">
                                <Inventory2RoundedIcon></Inventory2RoundedIcon>
                            </div>
                        </div>
                        <div className="providing-service-card-info">
                            <div className="providing-service-card-info-title">
                                Giao hàng uy tín
                            </div>
                            <div className="providing-service-card-info-detail">
                                Gói hàng cẩn thận, giao hàng tận tay
                            </div>
                        </div>
                    </Grid>
                    <Grid className="providing-service-card" xl={3} item>
                        <div>
                            <div className="providing-service-card-icon">
                                <AssuredWorkloadRoundedIcon></AssuredWorkloadRoundedIcon>
                            </div>
                        </div>
                        <div className="providing-service-card-info">
                            <div className="providing-service-card-info-title">
                                Thanh toán bảo đảm
                            </div>
                            <div className="providing-service-card-info-detail">
                                Mua hàng trực tuyến dễ dàng, nhanh chóng
                            </div>
                        </div>
                    </Grid>
                    <Grid className="providing-service-card" xl={3} item>
                        <div>
                            <div className="providing-service-card-icon">
                                <LocalShippingRoundedIcon></LocalShippingRoundedIcon>
                            </div>
                        </div>
                        <div className="providing-service-card-info">
                            <div className="providing-service-card-info-title">
                                Miễn phí giao hàng
                            </div>
                            <div className="providing-service-card-info-detail">
                                Miễn phí vận chuyển cho mọi đơn hàng
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div>
                    <h4
                        style={{
                            textAlign: "left",
                            color: "#af9966",
                            textTransform: "uppercase",
                        }}
                    >
                        SẢN PHẨM BÁN CHẠY
                    </h4>
                    <Grid
                        container
                        spacing={4}
                        maxWidth="lg"
                        justifyContent="center"
                        sx={{ marginTop: 5, marginBottom: 15 }}
                    >
                        {data.map((element) => (
                            <Grid item sx={{ height: 360 }}>
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                        height: 360,
                                    }}
                                >
                                    <ProductCard
                                        name={element.name}
                                        price={element.price}
                                        image={element.img}
                                        available={element.available}
                                    ></ProductCard>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <div>
                    <div style={{ display: "flex" }}>
                        <h4
                            style={{
                                textAlign: "left",
                                color: "#af9966",
                                textTransform: "uppercase",
                            }}
                        >
                            Hàng mới về
                        </h4>
                        <div
                            style={{
                                borderLeft: "1px solid #af9966",
                                height: "30px",
                                margin: "0 20px",
                            }}
                        ></div>
                        <Link
                            to="/"
                            style={{
                                color: "#4a4a4a",
                                fontStyle: "italic",
                            }}
                        >
                            Xem Tất Cả Sản Phẩm Mới
                            <ChevronRightIcon
                                style={{
                                    color: "#af9966",
                                }}
                            ></ChevronRightIcon>
                        </Link>
                    </div>

                    <Grid
                        container
                        spacing={4}
                        maxWidth="lg"
                        justifyContent="center"
                        sx={{ marginTop: 5, marginBottom: 15 }}
                    >
                        {data.map((element) => (
                            <Grid item sx={{ height: 360 }}>
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                        height: 360,
                                    }}
                                >
                                    <ProductCard
                                        name={element.name}
                                        price={element.price}
                                        image={element.img}
                                        available={element.available}
                                    ></ProductCard>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <Grid container spacing={4} marginBottom={10}>
                    <Grid item xl={6}>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/2-col-banners_1080x540_2x_Ibanez_Restocks_SLVN_540x270_crop_top.jpg?v=1667189092"
                            alt="something_1"
                        />
                    </Grid>
                    <Grid item xl={6}>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/2-col-banners_1080x540_2x_Latest_Greatest_Pedal_SLVN_540x270_crop_top.jpg?v=1669619568"
                            alt="something_2"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={4} marginBottom={10}>
                    <Grid item xl={6}>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/XLarge_1080x540_2x_2_540x270_crop_top.jpg?v=1613530719"
                            alt="something_3"
                        />
                    </Grid>
                    <Grid item xl={6}>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0020/5111/2996/files/XLarge_1080x540_2x_1_540x270_crop_top.jpg?v=1613530719"
                            alt="something_4"
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default MainPage;
