const { DynamoDb } = require('aws-sdk');

exports.handler = async () => {
    // const dynamoDb = new DynamoDb();                                       //creating an instance of DynamoDb

    //creating the id
    var generateId = Date.now();
    var idString = generateId.toString();

    const params = {
        TableName: process.env.DynamoTable,
        Item: {
            id: { S: idString },
            message: { S: "New Entry Added" }
        },
    };

    try {
        await DynamoDb.putItem(params).promise();
        return { operationSuccessful: true }                                     //returning this object 
    } catch (error) {
        console.log("DynamoDb error: ", error);
        return { operationSuccessful: false }
    }
}