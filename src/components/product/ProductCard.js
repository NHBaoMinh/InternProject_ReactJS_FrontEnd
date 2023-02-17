// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./ProductCard.scss";

function ProductCard(props) {
    return (
        // <Card className="product-item">
        //     <Card.Img variant="top" src={props.image}className="product-image"/>
        //     <Card.Body>
        //         <Card.Title className="product-title" style={{color: "black"}}>{props.name}</Card.Title>
        //         <Card.Text>
        //         {props.available === true ? "Còn hàng" : "Hết hàng"}
        //         </Card.Text>
        //         <Card.Text>
        //         {props.price}
        //         </Card.Text>

        //         <Button variant="primary">Go somewhere</Button>
        //     </Card.Body>
        // </Card>

        <Card
            sx={{
                width: 190,
                height: 380,
                textAlign: "left",
                position: "relative",
                padding: "15px",
                // boxShadow: "none"
            }}
            className="product-card"
        >
            <CardMedia
                component="img"
                image={process.env.REACT_APP_BACKEND_URL + props.image}
                alt="item image"
            />
            <CardContent sx={{ padding: 0 }}>
                <div
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: 0,
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        paragraph={true}
                        sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            height: "70px",
                        }}
                    >
                        {props.name}
                    </Typography>
                </div>

                <Typography
                    sx={{ position: "absolute", bottom: 60 }}
                    justify="center"
                    variant="body2"
                    component="div"
                    className={
                        props.available ? "text-available" : "text-unavailable"
                    }
                >
                    {props.available ? "Còn hàng" : "Đặt hàng"}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    sx={{ fontSize: 16, position: "absolute", bottom: 30 }}
                >
                    <strong>
                        {new Intl.NumberFormat().format(props.price)}
                        <u>đ</u>
                    </strong>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
