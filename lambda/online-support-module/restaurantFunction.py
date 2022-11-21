import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
  
    reqEvent = event['interpretations'][0]['intent']['name']
    
    if(reqEvent == 'recipeIntent'):
        recipeNameFromLex = event['interpretations'][0]['intent']['slots']['recipeName']['value']['originalValue']
        recipePriceFromLex = event['interpretations'][0]['intent']['slots']['recipePsrice']['value']['originalValue']
        print(recipeNameFromLex)

        recipeTableName = 'recipeTable'
        
        table = boto3.resource('dynamodb').Table(recipeTableName)
        createRecipeItem = table.put_item(
                                Item={
                                    'recipName': recipeNameFromLex,
                                    'recipePrice': recipePriceFromLex,
                                }
                            )
        print(createRecipeItem)
        return {
            "sessionState": {
                "dialogAction": {
                "type": "Close"
                },
                "intent": {
                "name": "orderIntent",
                "state": "Fulfilled"
                }
            },
                "messages": [
                    {
                      "contentType": "PlainText",
                      "content": "The order with order Id "+orderIdFromLex+" has been rated "+ orderRatingFromLex+" star successfully!"
                    }
                ]
        }
        
    else:
      orderIdFromLex = event['interpretations'][0]['intent']['slots']['orderId']['value']['originalValue']
      print(orderIdFromLex)
      data = client.get_item(
      TableName='orderTable',
      Key={
          'orderId': {'S': '1001'}
      }
      )
  
      if 'Item' not in data:
          print("null")
          return{
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": "orderIntent",
                      "state": "Fulfilled"
                }
            },
            "messages": [
                {
                "contentType": "PlainText",
                "content": "Your order Id does not match! Please try again"
                }
              ]
          }
      else:
          print(data)
          return {
                "sessionState": {
                    "dialogAction": {
                        "type": "Close"
                    },
                    "intent": {
                        "name": "orderIntent",
                          "state": "Fulfilled"
                    }
                },
                "messages": [
                    {
                    "contentType": "PlainText",
                    "content": "Your current order status is " + data['Item']['orderStatus']['S'] +""
                    }
                  ]
              }
