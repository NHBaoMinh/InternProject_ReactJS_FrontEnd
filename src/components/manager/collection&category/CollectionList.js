import { DataGrid } from "@mui/x-data-grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
} from "@mui/material/";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";

import {
    handleGetAllCategory,
    createNewCategory,
    updateCategory,
} from "../../../services/categoryServices.js";
import {
    handleGetAllCollection,
    createNewCollection,
    updateCollection,
} from "../../../services/collectionServices.js";

import Alert from "../../alert/alert.js";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 110,
        editable: true,
    },
    {
        headerName: "Action",
        description: "This column has various action buttons.",
        sortable: false,
        renderCell: (params) => (
            <Button
                variant="contained"
                onClick={() => {
                    alert(params.getValue(params.ID, "ID"));
                }}
            >
                Update
            </Button>
        ),
        width: 160,
    },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const tableData = [
    {
        id: 1,
        name: "tom1",
    },
    {
        id: 2,
        name: "tom2",
    },
    {
        id: 3,
        name: "tom3",
    },
    {
        id: 4,
        name: "mike",
    },
];

function CollectionPage() {
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [collectionData, setCollectionData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [createCollectionOpen, setCreateCollectionOpen] = useState(false);
    const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
    const [updateCollectionOpen, setUpdateCollectionOpen] = useState(false);
    const [updateCategoryOpen, setUpdateCategoryOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState();
    const [collectionID, setCollectionID] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");
    const [collectionImg, setCollectionImg] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let collectionRes, categoryRes;
            try {
                collectionRes = await handleGetAllCollection();
                categoryRes = await handleGetAllCategory();
                setCollectionData(collectionRes.data);
                setCategoryData(categoryRes.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const filterCategory = (collectionId, categoryArr) => {
        let filtered = categoryArr.filter((item) => {
            return item.CategoryCollection === collectionId;
        });
        return filtered;
    };

    const handleCreateNewCollection = async () => {
        try {
            let data = await createNewCollection(name, description, imageFile);
            alert(data.message);
            if (data.errCode === 0) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateNewCategory = async () => {
        try {
            let data = await createNewCategory(name, collectionID);
            alert(data.message);
            if (data.errCode === 0) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCollection = async () => {
        try {
            if (name === "") {
                await setName(collectionName);
            }
            if (description === "") {
                await setDescription(collectionDescription);
            }
            let data;

            if (imageFile === null) {
                data = await updateCollection(
                    collectionID,
                    name,
                    description,
                    collectionImg
                );
            } else {
                data = await updateCollection(
                    collectionID,
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
    };

    const handleUpdateCategory = async () => {
        if (name === "") {
            alert("No Change Detected!");
            return;
        }

        try {
            let data = await updateCategory(categoryID, name);

            alert(data.message);
            if (data.errCode === 0) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    // const onSelectFile = (e) => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setImageFile(undefined);
    //         return;
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setImageFile(e.target.files[0]);
    // };

    return (
        <div style={{ height: "auto", margin: "10px" }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setCreateCollectionOpen(true)}
                sx={{ margin: "10px 0", marginLeft: "auto" }}
            >
                Create New Collection
            </Button>

            <Modal
                open={createCollectionOpen}
                onClose={() => setCreateCollectionOpen(false)}
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
                        New Collection
                    </Typography>
                    <TextField
                        label="Collection Name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <TextField
                        label="Collection Description"
                        multiline
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                    {preview && (
                        <img
                            src={preview}
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
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
                    <Button
                        variant="contained"
                        onClick={handleCreateNewCollection}
                    >
                        Create
                    </Button>
                </Box>
            </Modal>

            {collectionData.map((collection) => (
                <Accordion
                    id={collection.CollectionID}
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
                        <Typography variant="h5">
                            {collection.CollectionName}
                        </Typography>
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
                                            collection.CollectionImg
                                        }
                                        style={{
                                            maxWidth: "200px",
                                            maxHeight: "200px",
                                        }}
                                        alt={collection.CollectionName}
                                    ></img>
                                </div>
                            </Grid>

                            <Grid item xl={8}>
                                <Typography>
                                    {collection.CollectionDescription}
                                </Typography>
                            </Grid>

                            <Grid item xl={2}>
                                <Button
                                    variant="contained"
                                    onClick={async () => {
                                        await setCollectionID(
                                            collection.CollectionID
                                        );
                                        await setCollectionName(
                                            collection.CollectionName
                                        );
                                        await setCollectionImg(
                                            collection.CollectionImg
                                        );
                                        await setCollectionDescription(
                                            collection.CollectionDescription
                                        );
                                        setUpdateCollectionOpen(true);
                                    }}
                                >
                                    Update
                                </Button>
                                <Modal
                                    open={updateCollectionOpen}
                                    onClose={() =>
                                        setUpdateCollectionOpen(false)
                                    }
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
                                            Update Collection {collectionName} -
                                            ID: {collectionID}
                                        </Typography>
                                        <TextField
                                            label="Collection Name"
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }}
                                            defaultValue={collectionName}
                                        />
                                        <TextField
                                            label="Collection Description"
                                            multiline
                                            onChange={(event) => {
                                                setDescription(
                                                    event.target.value
                                                );
                                            }}
                                            defaultValue={collectionDescription}
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
                                                            collectionImg
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
                                            onClick={handleUpdateCollection}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </Modal>
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography variant="h5">Category List</Typography>

                            <Button
                                variant="contained"
                                onClick={() => {
                                    setCollectionID(collection.CollectionID);
                                    setCollectionName(
                                        collection.CollectionName
                                    );
                                    setCreateCategoryOpen(true);
                                }}
                                sx={{
                                    margin: "10px 0",
                                    marginLeft: "auto",
                                    backgroundColor: "#eecda3",
                                    "&:hover": {
                                        backgroundColor: "#b7a58e",
                                    },
                                }}
                            >
                                Create New Category
                            </Button>
                            <Modal
                                open={createCategoryOpen}
                                onClose={() => setCreateCategoryOpen(false)}
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
                                        New Category for {collectionName} -{" "}
                                        {collectionID}
                                    </Typography>
                                    <TextField
                                        label="Category Name"
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />

                                    <Button
                                        variant="contained"
                                        onClick={handleCreateNewCategory}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Modal>

                            {/* <DataGrid
                         rows={rows}
                         columns={columns}
                         pageSize={5}
                         rowsPerPageOptions={[5]}
                         checkboxSelection
                         autoHeight={true}
                     ></DataGrid> */}

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Category Name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterCategory(
                                        collection.CollectionID,
                                        categoryData
                                    )?.map((category) => {
                                        return (
                                            <TableRow key={category.CategoryID}>
                                                <TableCell align="left">
                                                    <Typography
                                                        style={{
                                                            fontSize: "13px",
                                                            margin: "0px",
                                                        }}
                                                    >
                                                        {category.CategoryID}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        style={{
                                                            fontSize: "13px",
                                                            margin: "0px",
                                                        }}
                                                    >
                                                        {category.CategoryName}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            setCategoryID(
                                                                category.CategoryID
                                                            );
                                                            setCategoryName(
                                                                category.CategoryName
                                                            );
                                                            setUpdateCategoryOpen(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Modal
                                                        open={
                                                            updateCategoryOpen
                                                        }
                                                        onClose={() => {
                                                            setUpdateCategoryOpen(
                                                                false
                                                            );
                                                        }}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform:
                                                                    "translate(-50%, -50%)",
                                                                width: 800,
                                                                bgcolor:
                                                                    "background.paper",
                                                                boxShadow:
                                                                    "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                                p: 4,
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "10px",
                                                            }}
                                                        >
                                                            <Typography
                                                                align="center"
                                                                variant="h4"
                                                            >
                                                                Update{" "}
                                                                {categoryName}{" "}
                                                                Category with
                                                                ID: {categoryID}
                                                            </Typography>
                                                            <TextField
                                                                label="Category Name"
                                                                defaultValue={
                                                                    categoryName
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setName(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                }}
                                                            />

                                                            <Button
                                                                variant="contained"
                                                                onClick={
                                                                    handleUpdateCategory
                                                                }
                                                            >
                                                                Update
                                                            </Button>
                                                        </Box>
                                                    </Modal>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default CollectionPage;
