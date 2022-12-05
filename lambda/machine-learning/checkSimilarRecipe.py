import json
import boto3
from boto3.dynamodb.conditions import Attr
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Key_Ingredients')


def lambda_handler(event, context):
    body = event['body']
    body_json = json.loads(body)
    type = body_json['type']
    res = table.scan(FilterExpression=Attr('type').eq(type))
    if res['Count'] == 0:
           return{
            'statusCode': 200,
            'body': json.dumps('No records exist')
           }
    else:
        
        recipes = []
        items = res['Items']
        for item in items:
            recipe_map = {'recipe_name': item['recipe_name']}
            recipes.append(recipe_map)
        print(recipe_map)
        return{
            'statusCode' : 200,
            'body' : json.dumps(recipes)
        }
