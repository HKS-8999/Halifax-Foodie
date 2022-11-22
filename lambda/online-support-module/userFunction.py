import json
import boto3

# Boto client to get the resource DynamoDB
client = boto3.client('dynamodb')

# Lamdba function
def lambda_handler(event, context):
    
    reqEvent = event['interpretations'][0]['intent']['name']
    orderTableName = 'orderTable'

    # Functionality if the intent is rate order intent to add the rating in DynamoDB
    if(reqEvent == 'rateOrderIntent'):
        orderIdFromLex = event['interpretations'][0]['intent']['slots']['orderId']['value']['originalValue']
        orderRatingFromLex = event['interpretations'][0]['intent']['slots']['orderRating']['value']['originalValue']
        print(orderIdFromLex)
        
        data = client.get_item(
        TableName=orderTableName,
        Key={
            'orderId': {'S': orderIdFromLex}
        }
        )
        if 'Item' not in data:
            print("null")
            # Return the respone for Lex
            return{
              "sessionState": {
                  "dialogAction": {
                      "type": "Close"
                  },
                  "intent": {
                      "name": reqEvent,
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
            table = boto3.resource('dynamodb').Table(orderTableName)
            rateOrderData = table.update_item(
                Key={'orderId': orderIdFromLex},
                UpdateExpression="SET orderRating = :newRating",
                ExpressionAttributeValues={":newRating": orderRatingFromLex},
            )
            print(rateOrderData)
            # Return the respone for Lex
            return {
                  "sessionState": {
                      "dialogAction": {
                          "type": "Close"
                      },
                      "intent": {
                          "name": reqEvent,
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
    # Functionality if the user wants to know the amount he paid for the order
    elif(reqEvent == 'paymentIntent'):
        orderIdFromLex = event['interpretations'][0]['intent']['slots']['paymentOrder']['value']['originalValue']
        print(orderIdFromLex)
        
        data = client.get_item(
        TableName='orderTable',
        Key={
            'orderId': {'S': orderIdFromLex}
        }
        )
    
        if 'Item' not in data:
            print("null")
            # Return the respone for Lex
            return{
              "sessionState": {
                  "dialogAction": {
                      "type": "Close"
                  },
                  "intent": {
                      "name": reqEvent,
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
            # Return the respone for Lex
            return {
                  "sessionState": {
                      "dialogAction": {
                          "type": "Close"
                      },
                      "intent": {
                          "name": reqEvent,
                            "state": "Fulfilled"
                      }
                  },
                  "messages": [
                      {
                      "contentType": "PlainText",
                      "content": "The amount from your account is " + data['Item']['orderAmount']['N'] +""
                      }
                    ]
                }
    # Functionality if the user wants to know the status of the order
    else:
      orderIdFromLex = event['interpretations'][0]['intent']['slots']['orderId']['value']['originalValue']
      print(orderIdFromLex)
      data = client.get_item(
      TableName=orderTableName,
      Key={
          'orderId': {'S': orderIdFromLex}
      }
      )
  
      if 'Item' not in data:
          print("null")
          # Return the respone for Lex
          return{
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": reqEvent,
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
          # Return the respone for Lex
          return {
                "sessionState": {
                    "dialogAction": {
                        "type": "Close"
                    },
                    "intent": {
                        "name": reqEvent,
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
