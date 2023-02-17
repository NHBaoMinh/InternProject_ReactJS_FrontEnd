import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";

import {
    handleGetAllBrand,
    createNewBrand,
    updateBrand,
} from "../../../services/brandServices.js";

const BrandPage = () => {
    const [createBrandOpen, setCreateBrandOpen] = useState(false);
    const [updateBrandOpen, setUpdateBrandOpen] = useState(false);
    const [brandData, setBrandData] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState();
    const [brandID, setBrandID] = useState("");
    const [brandName, setBrandName] = useState("");
    const [brandDescription, setBrandDescription] = useState("");
    const [brandImg, setBrandImg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let brand = await handleGetAllBrand();
                setBrandData(brand.data);
                console.log(brandData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!imageFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleCreateNewBrand = async () => {
        try {
            let data = await createNewBrand(name, description, imageFile);
            alert(data.message);
            if (data.errCode === 0) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateBrand = async () => {
        let data;
        return new Promise(async (resolve, reject) => {
            if (name === "") {
                await console.log("Called Inside 2")
                await setName(brandName);
            }
            if (description === "") {
                await console.log("Called Inside 3")
                await setDescription(brandDescription);
            }
            resolve("Nike")
        }).then(async () => {
            console.log(name, description, imageFile)
            try {
                console.log("Called Inside 4")
                if (imageFile === null) {
                    data = await updateBrand(
                        brandID,
                        name,
                        description,
                        brandImg
                    );
                } else {
                    data = await updateBrand(
                        brandID,
                        name,
                        description,
                        imageFile
                    );
                }

                alert(data.message);
                if (data.errCode === 0) {
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
            return true;
        });
    };

    return (
        <div style={{ height: "auto", margin: "10px" }}>
            <Button
                variant="contained"
                color="secondary"
                sx={{ margin: "10px 0", marginLeft: "auto" }}
                onClick={() => setCreateBrandOpen(true)}
            >
                Create New Brand
            </Button>
            <Modal
                open={createBrandOpen}
                onClose={() => setCreateBrandOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 800,
                        bgcolor: "background.paper",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography align="center" variant="h4">
                        New Brand
                    </Typography>
                    <TextField
                        label="Brand Name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <TextField
                        label="Brand Description"
                        multiline
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                    {preview && (
                        <img
                            src={preview}
                            style={{
                                maxWidth: "300px",
                                maxHeight: "300px",
                            }}
                            alt="0"
                        ></img>
                    )}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ backgroundColor: "green", width: "200px" }}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setImageFile(event.target.files[0]);
                            }}
                        />
                    </Button>
                    <Button variant="contained" onClick={handleCreateNewBrand}>
                        Create
                    </Button>
                </Box>
            </Modal>
            {brandData.map((brand) => (
                <Accordion
                    sx={{
                        border: "1px solid black",
                        borderRadius: "5px",
                        boxShadow: "none",
                        margin: "10px 0",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                    >
                        <Typography variant="h5">{brand.BrandName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            marginTop: "5px",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xl={2}>
                                <div
                                    style={{
                                        maxWidth: "200px",
                                        maxHeight: "200px",
                                    }}
                                >
                                    <img
                                        src={
                                            process.env.REACT_APP_BACKEND_URL +
                                            brand.BrandImg
                                        }
                                        style={{
                                            maxWidth: "200px",
                                            maxHeight: "200px",
                                        }}
                                        alt="1"
                                    ></img>
                                </div>
                            </Grid>

                            <Grid item xl={8}>
                                <Typography>
                                    {brand.BrandDescription}
                                </Typography>
                            </Grid>

                            <Grid item xl={2}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setBrandID(brand.BrandID);
                                        setBrandName(brand.BrandName);
                                        setBrandDescription(
                                            brand.BrandDescription
                                        );
                                        setBrandImg(brand.BrandImg);
                                        setUpdateBrandOpen(true);
                                    }}
                                >
                                    Update
                                </Button>

                                <Modal
                                    open={updateBrandOpen}
                                    onClose={() => setUpdateBrandOpen(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: 800,
                                            bgcolor: "background.paper",
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                            p: 4,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}
                                    >
                                        <Typography align="center" variant="h4">
                                            Update brand {brandName} - ID:{" "}
                                            {brandID}
                                        </Typography>
                                        <TextField
                                            label="Brand Name"
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }}
                                            defaultValue={brandName}
                                        />
                                        <TextField
                                            label="Brand Description"
                                            multiline
                                            onChange={(event) => {
                                                setDescription(
                                                    event.target.value
                                                );
                                            }}
                                            defaultValue={brandDescription}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <div style={{ width: "49%" }}>
                                                    <Typography variant="h6">
                                                        Old Image (Don't upload
                                                        new one if you Do not
                                                        wish to change):
                                                    </Typography>
                                                    <img
                                                        src={
                                                            process.env
                                                                .REACT_APP_BACKEND_URL +
                                                            brandImg
                                                        }
                                                        style={{
                                                            maxWidth: "200px",
                                                            maxHeight: "200px",
                                                        }}
                                                        alt={"0"}
                                                    ></img>
                                                </div>
                                                <div
                                                    style={{
                                                        width: "2%",
                                                        borderLeft:
                                                            "1px solid #af9966",
                                                        height: "100px",
                                                        margin: "0 20px",
                                                    }}
                                                ></div>
                                                <div style={{ width: "49%" }}>
                                                    <Typography variant="h6">
                                                        Uploaded Image Preview:
                                                    </Typography>
                                                    {preview && (
                                                        <img
                                                            src={preview}
                                                            style={{
                                                                maxWidth:
                                                                    "200px",
                                                                maxHeight:
                                                                    "200px",
                                                            }}
                                                            alt={"0"}
                                                        ></img>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                sx={{
                                                    backgroundColor: "green",
                                                    width: "200px",
                                                }}
                                            >
                                                Upload Files
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(event) => {
                                                        console.log(
                                                            event.target
                                                                .files[0]
                                                        );
                                                        setImageFile(
                                                            event.target
                                                                .files[0]
                                                        );
                                                    }}
                                                />
                                            </Button>
                                        </div>

                                        <Button
                                            variant="contained"
                                            onClick={handleUpdateBrand}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </Modal>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default BrandPage;
