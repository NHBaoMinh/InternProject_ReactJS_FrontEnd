import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCollectionWithIDHandler } from "../../services/collectionServices";
import { getProductByCollectionHandler } from "../../services/productServices";
import Alert from "../alert/alert.js";
import ProductList from "../product/ProductList.js";
import "./CollectionProduct.scss";

function CollectionProduct() {
    let { id } = useParams();
    const [collectionData, setCollectionData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrorMessage] = useState("");

    const closeMessage = () => {
        setIsError(false);
        setErrorMessage("");
    };

    useEffect(() => {
        async function fetchData() {
            let resCollectionData = await getCollectionWithIDHandler(id);
            let resProductData = await getProductByCollectionHandler(id, 1);

            if (resCollectionData.errCode === 1) {
                setIsError(true);
                setErrorMessage(resCollectionData.message);
                return;
            }
            setCollectionData(resCollectionData.data[0]);
            setProductData(resProductData.data);
        }

        fetchData();
    }, []);

    return (
        <Container>
            {isError === true && (
                <Alert
                    severity="error"
                    action={closeMessage}
                    message={errMessage}
                ></Alert>
            )}
            <div className="collection-info">
                <img
                    src={
                        process.env.REACT_APP_BACKEND_URL +
                        collectionData.CollectionImg
                    }
                    alt={collectionData.CollectionName}
                />
                <p className="collection-info__description">
                    {collectionData.CollectionDescription}
                </p>
            </div>
            <div>
                <ProductList data={productData}></ProductList>
            </div>
        </Container>
    );
}

export default CollectionProduct;
