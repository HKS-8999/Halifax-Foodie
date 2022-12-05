import boto3
import logging
from boto3.dynamodb.conditions import Attr
import pprint
import json
import gspread

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Reference : https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html

cred = gspread.service_account(filename='credentials.json')
gsheet = cred.open("visualizeData")
sheet1 = gsheet.sheet1

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CustomerFeedback')
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
        sheet1.delete_rows(2, 100)
        polarity = []
        items = res['Items']
        for item in items:
            sentiment = comprehend.detect_sentiment(Text = item['feedback'], LanguageCode = "en")
            print(sentiment['Sentiment'])
            polarity_map = {'user_id': item['user_id'], 'sentiment': sentiment['Sentiment'], 'feedback': item['feedback']}
            polarity.append(polarity_map)
        print(polarity_map)
        print(polarity)
        write_events_to_google_sheet(polarity)
        return{
            'statusCode' : 200,
            'body' : json.dumps(polarity)
        }
    
def write_events_to_google_sheet(polarity_map):
    for item in polarity_map:
        feedback = item['feedback']
        print(feedback)
        sentiment = item['sentiment']
        print(sentiment)
        row = [feedback, sentiment]
        print(row)
        sheet1.insert_row(row, index = 2)