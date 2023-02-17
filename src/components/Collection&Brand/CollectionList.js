import { Grid, Container } from "@mui/material";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { handleGetAllCollection } from "../../services/collectionServices";

function CollectionList() {
    const [collectionData, setCollectionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await handleGetAllCollection();
                setCollectionData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Grid container sx={{marginTop: "20px", marginBottom: "20px"}}>
                {collectionData.map((collection) => (
                    <Grid item xs={2}>
                        <Link to={"/collections/" + collection.CollectionID} style={{textDecoration: "none"}}>
                            <img
                                style={{
                                    maxWidth: "170px",
                                    maxHeight: "170px",
                                    minWidth: "170px",
                                    minHeight: "170px",
                                }}
                                src={
                                    process.env.REACT_APP_BACKEND_URL +
                                    collection.CollectionImg
                                }
                                alt={collection.CollectionName}
                            ></img>
                            <p style={{marginTop: "10px", textDecoration: "none", color: "black"}}>{collection.CollectionName}</p>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default CollectionList;
