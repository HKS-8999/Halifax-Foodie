import json
import boto3
import pprint
import re
import logging
from boto3.dynamodb.conditions import Key, Attr
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def create_response(status, message, data):
    return {
        "status": status,
        "message": message,
        "data": data
    }

def lambda_handler(event, context):
    try:
        s3 = boto3.client("s3")
        dynamoDb = boto3.resource('dynamodb')
        table = dynamoDb.Table('Key_Ingredients')
        
        body = event['body']
        bodyJson = json.loads(body)
        file = bodyJson['filename']
        restaurant_id = bodyJson['restaurantId']
        bucket_name = "myserverlessproject"
        key = file + ".txt"
        
        res = table.scan(FilterExpression=Attr('recipe_name').eq(file) & Attr('restaurant_id').eq(restaurant_id))
        if res['Count'] == 1:
            response = create_response(True,"Already extracted", None)
        else:
            s3_object = s3.get_object(Bucket = bucket_name, Key = key)
            paragraph = str(s3_object['Body'].read())
            comprehend = boto3.client("comprehend")
            response = comprehend.detect_key_phrases(Text = paragraph, LanguageCode = "en")
            key_ingredients = []
            for text in response['KeyPhrases']:
                list = re.findall(r'\b[A-Z]+(?:\s+[A-Z]+)*\b', text['Text'])
                if len(list) != 0:
                    for items in list:
                        logger.info(list)
                        key_ingredients.append(items)
            response = table.put_item( Item = { 'recipe_name': file, 'key_ingredients': key_ingredients, 'restaurant_id': restaurant_id} )
            response = create_response(True,"Extracted successfully", None)
            
    except Exception as e:
        response = create_response(False, str(e), None)
        raise e
        
    return response