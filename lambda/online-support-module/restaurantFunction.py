import json
import boto3
import uuid
from boto3.dynamodb.conditions import Attr

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    # table = boto3.resource('dynamodb').Table('recipeTable')
    # data = table.scan(FilterExpression = Attr('recipeName').eq('Pizza'))
    # dataItem = data['Items'][0]
    # print(dataItem)
    # recipeIdFromDynamo = dataItem['recipeId']
    # print(recipeIdFromDynamo)
  
  
    reqEvent = event['interpretations'][0]['intent']['name']
    recipeTableName = 'recipeTable'
    orderTableName = 'orderTable'
    
    
    if(reqEvent == 'recipeIntent'):
        recipeNameFromLex = event['interpretations'][0]['intent']['slots']['recipeName']['value']['originalValue']
        recipePriceFromLex = event['interpretations'][0]['intent']['slots']['recipePrice']['value']['originalValue']
        print(recipeNameFromLex)

        recipeId = str(uuid.uuid4())
        table = boto3.resource('dynamodb').Table(recipeTableName)
        createRecipeItem = table.put_item(
                                Item={
                                    'recipeId': recipeId,
                                    'recipeName': recipeNameFromLex,
                                    'recipePrice': recipePriceFromLex,
                                }
                            )
        
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
                      "content": "Your recipe item "+ recipeNameFromLex +" with price of " + recipePriceFromLex + " has been added to your inventory successfully! Your recipe item reference number is "+ recipeId +"."
                    }
                ]
        }
    elif(reqEvent == 'updateRecipePriceIntent'):
        updateRecipeNameFromLex = event['interpretations'][0]['intent']['slots']['recipeName']['value']['originalValue']
        updateRecipePriceFromLex = event['interpretations'][0]['intent']['slots']['updatedRecipePrice']['value']['originalValue']
        
        table = boto3.resource('dynamodb').Table(recipeTableName)
        data = table.scan(FilterExpression = Attr('recipeName').eq(updateRecipeNameFromLex))
        # data = response['Items']
        # print(response)
        print(data)
        if 'Items' not in data:
            print("null")
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
                  "content": "Your restaurant inventory does not have any recipe with name " + updateRecipeNameFromLex + "."
                  }
                ]
            }
        else:
            table = boto3.resource('dynamodb').Table(recipeTableName)
            dataItem = data['Items'][0]
            recipeIdFromDynamo = dataItem['recipeId']
            print(recipeIdFromDynamo)
            updateRecipePriceRes = table.update_item(
                Key={'recipeId': recipeIdFromDynamo},
                UpdateExpression="SET recipePrice = :newRecipePrice",
                ExpressionAttributeValues={":newRecipePrice": updateRecipePriceFromLex},
            )
            print(updateRecipePriceRes)
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
                      "content": "The price for the recipe " + updateRecipeNameFromLex+" with recipe Id " + recipeIdFromDynamo+ " has been updated to " + updateRecipePriceFromLex + "."
                      }
                    ]
                }   
    else:
      orderIdFromLex = event['interpretations'][0]['intent']['slots']['orderId']['value']['originalValue']
      orderStatusFromLex = event['interpretations'][0]['intent']['slots']['orderStatus']['value']['originalValue']
      print(orderIdFromLex)
      data = client.get_item(
      TableName=orderTableName,
      Key={
          'orderId': {'S': orderIdFromLex}
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
            updateOrderStatusRes = table.update_item(
                Key={'orderId': orderIdFromLex},
                UpdateExpression="SET orderStatus = :neworderStatus",
                ExpressionAttributeValues={":neworderStatus": orderStatusFromLex},
            )
            print(updateOrderStatusRes)
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
                    "content": "The order status for the order with order order ID"+ orderIdFromLex +" has been updated to "+ orderStatusFromLex+"."
                    }
                  ]
              }
