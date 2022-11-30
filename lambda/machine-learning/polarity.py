import boto3
import logging
from boto3.dynamodb.conditions import Attr
import pprint
import json

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Reference : https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('User_Feedback')
comprehend = boto3.client("comprehend")

def lambda_handler(event, context):
    body = event['body']
    body_json = json.loads(body)
    restaurant_id = body_json['restaurantId']
    res = table.scan(FilterExpression=Attr('restaurant_id').eq(restaurant_id))
    if res['Count'] == 0:
           return{
            'statusCode': 200,
            'body': json.dumps('No reviews exist')
           }
    else:
        polarity = []
        items = res['Items']
        for item in items:
            sentiment = comprehend.detect_sentiment(Text = item['feedback'], LanguageCode = "en")
            print(sentiment['Sentiment'])
            polarity_map = {'user_id': item['user_id'], 'sentiment': sentiment['Sentiment'], 'feedback': item['feedback']}
            polarity.append(polarity_map)
        return{
            'statusCode' : 200,
            'body' : json.dumps(polarity)
        }