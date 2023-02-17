import { Link, useNavigate } from "react-router-dom";

function AdminHome() {
    const list = [
        {
            title: "Product",
            color: "linear-gradient(90deg, rgba(33,147,176,1) 35%, rgba(109,213,237,1) 100%)",
            link: "/admin/products",
        },
        {
            title: "Brand",
            color: "linear-gradient(90deg, rgba(255,175,189,1) 35%, rgba(255,195,160,1) 100%)",
            link: "/admin/brands",
        },
        {
            title: "Collection",
            color: "linear-gradient(90deg, rgba(235,51,73,1) 35%, rgba(244,92,67,1) 100%)",
            link: "/admin/categories-collections",
        },
        {
            title: "Statistic",
            color: "linear-gradient(90deg, rgba(238,205,163,1) 35%, rgba(239,98,159,1) 100%)",
            link: "",
        },
    ];

    const navigate = useNavigate();
    const goToLink = (link) => {
        navigate(link);
    };

    return (
        <div
            className="Admin-Home"
            style={{
                margin: "30px 0",
                display: "flex",
                justifyContent: "space-around",
            }}
        >
            {list.map((item) => (
                <div
                    key={item.title}
                    style={{
                        display: "flex",
                        borderRadius: "10px",
                        background: item.color,
                        fontSize: "24px",
                        width: "300px",
                        height: "300px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        color: "#000",
                    }}
                    onClick={() => {
                        goToLink(item.link);
                    }}
                >
                    <div
                        style={{
                            margin: "auto",
                        }}
                    >
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminHome;
