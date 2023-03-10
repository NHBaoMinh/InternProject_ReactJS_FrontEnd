function logger(reducer) {
    return (prevState, action) => {
        console.log("Prev State: ", prevState);
        console.log("Action: ", action);
        const newState = reducer(prevState, action);
        console.log("New State: ", newState);
        return newState;
    };
}

export default logger;
