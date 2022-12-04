import pygsheets
import pandas as pd
import boto3
import json

client = boto3.client('dynamodb')
recipeTableName = 'recipeTable'
def lambda_handler(event, context):
    gc = pygsheets.authorize(service_file='creds.json')
    df = pd.DataFrame()
    
    df['recipeId'] = []
    df['recipeName'] = []
    df['recipePrice'] = []
    df['recipeType'] = []
    
    table = client.Table(recipeTableName)
    data = table.scan()
    
    
    while 'Item' in data:
        df['recipeId'].append(data['Item']['recipeId']['S'])
        df['recipeName'].append(data['Item']['recipeName']['S'])
        df['recipePrice'].append(data['Item']['recipePrice']['N'])
        df['recipeType'].append(data['Item']['recipeType']['S'])
    
    sh = gc.open('csci5410-g8-recipe-visualization')
    wks = sh[0]
    wks.set_dataframe(df,(1,1))