'use strict';

 exports.helloWorld = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, PATCH, OPTIONS'
    );
    // return res.status(204).send('');
    const body = JSON.parse(req.body || {});
    const text = body.recipe;
    console.log(text);
    const endpointId = '3375909715597852672';
    const project = '982098893326';
    const location = 'us-central1';
    const aiplatform = require('@google-cloud/aiplatform');
    const { instance, prediction } =
        aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

    // Imports the Google Cloud Model Service Client library
    const { PredictionServiceClient } = aiplatform.v1;

    // Specifies the location of the api endpoint
    const clientOptions = {
        apiEndpoint: 'us-central1-aiplatform.googleapis.com',
    };

    // Instantiates a client
    const predictionServiceClient = new PredictionServiceClient(clientOptions);

    async function predictTextClassification() {
        // Configure the resources
        const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

        const predictionInstance =
            new instance.TextClassificationPredictionInstance({
                content: text,
            });
        const instanceValue = predictionInstance.toValue();

        const instances = [instanceValue];
        const request = {
            endpoint,
            instances,
        };

        const [response] = await predictionServiceClient.predict(request);
        console.log('Predict text classification response');
        console.log(`\tDeployed model id : ${response.deployedModelId}\n\n`);
        console.log('Prediction results:');
    
        let response_data = []
    
        for (const predictionResultValue of response.predictions) {
          const predictionResult =
            prediction.ClassificationPredictionResult.fromValue(
              predictionResultValue
            );
    
          for (const [i, label] of predictionResult.displayNames.entries()) {
            let dict = {}
            dict['label'] = label
            dict['confidence'] = predictionResult.confidences[i]
            response_data.push(dict);
          }
        }
        console.log(response_data);
    
        return res.status(200).send(response_data);
    
      }
      predictTextClassification();
  };
  