import json
import pygsheets
import pandas as pd
import boto3

client = boto3.client('dynamodb')
userTableName = 'userTable'
def lambda_handler(event, context):
    # Try Block
    try:
        
        gc = pygsheets.authorize(service_file='creds.json')
        
        df = pd.DataFrame()
        # Dynamo Db query to get total item count
        total_items = client.describe_table(TableName=userTableName)
        print(total_items['Table']['ItemCount'])
        total_users = total_items['Table']['ItemCount']
        
        # Dynamo Db query to get total item count of active users
        active_response = client.query(KeyConditionExpression=Key('userStatus').eq('active'))
        items = avtive_response['Items']
        total_active = 0
        for item in items:
            total_active = total_active + 1
            print(total_active)
            
        # Dynamo Db query to get total item count of inactive users
        inactive_response = client.query(KeyConditionExpression=Key('userStatus').eq('inactive'))
        items = inactive_response['Items']
        total_inactive = 0
        for item in items:
            total_inactive = total_inactive + 1
            print(total_inactive)
            
            
        df['Total Users'] = [total_users]
        df['Total Offline'] = [total_inactive]
        df['Total Online'] = [total_active]
        sh = gc.open('g8-login-statistics')
        wks = sh[0]
        wks.set_dataframe(df,(1,1))
        
    except Exception as e:
        print(e)
