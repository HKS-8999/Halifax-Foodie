import boto3
import logging
from boto3.dynamodb.conditions import Attr
import pprint
from datetime import datetime
import json

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Reference : https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CustomerFeedback')


def lambda_handler(event, context):
    body = event['body']
    print(body)
    body_json = json.loads(body)
    restaurant_id = body_json['restaurant_id']
    user_id = body_json['user_id']
    feedback = body_json['feedback']
    id = body_json['id']
    try:

        table.put_item(
            Item={'id': id,
                  'restaurant_id': restaurant_id,
                  'user_id': user_id,
                  'feedback': feedback})
        return {
            'statusCode': 201,
            'body': json.dumps('Success')
        }
    except:
        return {
            'statusCode': 200,
            'body': json.dumps('Error')
        }
