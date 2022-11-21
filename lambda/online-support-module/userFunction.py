import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    reqEvent = event['interpretations'][0]['intent']['name']
    
    if(reqEvent == 'rateOrderIntent'):
        orderIdFromLex = event['interpretations'][0]['intent']['slots']['orderId']['value']['originalValue']
        orderRatingFromLex = event['interpretations'][0]['intent']['slots']['orderRating']['value']['originalValue']
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
            table = boto3.resource('dynamodb').Table('orderTable')
            rateOrderData = table.update_item(
                Key={'orderId': '1001'},
                UpdateExpression="SET orderRating = :newRating",
                ExpressionAttributeValues={":newRating": orderRatingFromLex},
            )
            print(rateOrderData)
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
    
    elif(reqEvent == 'paymentIntent'):
        orderIdFromLex = event['interpretations'][0]['intent']['slots']['paymentOrder']['value']['originalValue']
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
                      "content": "The amount from your account is " + data['Item']['orderAmount']['N'] +""
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
