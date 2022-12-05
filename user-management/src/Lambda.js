var aws = require('aws-sdk');
var ddb = new aws.DynamoDB({apiVersion: '2012-10-08'}); //library of dynamodb stored

//handler is automatically executed when received trigger event
exports.handler = async (event, context) => {
    console.log(event);
    let date = new Date();

    const tableName = process.env.TABLE_NAME;
    const region = process.env.REGION;
    console.log(tableName,region)
    console.log("table=" + tableName + " -- region=" + region);
   
    aws.config.update({region: region});
            
    if (event.request.userAttributes.sub) {
        let gender = "";
        if (event.gender){
            gender = event.gender
        }
        // -- Write data to DDB (object)
        let ddbParams = {
            Item: {
                'id': {S: event.request.userAttributes.sub},
                'email': {S: event.request.userAttributes.email},
                'createdAt': {S: date.toISOString()},
                'gender':{S: gender},
            },
            TableName: tableName
        };

        // Call DynamoDB to insert items into table name
        try {
            await ddb.putItem(ddbParams).promise()
            console.log("Success");
        } catch (err) {
            console.log("Error", err);
        }

        console.log("Success: Everything executed correctly");
        context.done(null, event);

    } else {
        // Nothing to do, the user's email ID is unknown
        console.log("Error: Nothing was written to DDB or SQS");
        context.done(null, event);
    }


    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
}
