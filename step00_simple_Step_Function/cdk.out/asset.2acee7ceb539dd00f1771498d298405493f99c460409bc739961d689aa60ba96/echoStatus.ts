type Event = {
    operationSuccessful: Boolean
}

exports.handler = (event: Event) => {

    console.log(event);

    if (event.operationSuccessful) {
        console.log("The data was added successfully");
    } else {
        console.log("The data was not added to the database");
    }

}