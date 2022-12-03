import pygsheets
import pandas as pd

def lambda_handler(event, context):
    gc = pygsheets.authorize(service_file='creds.json')
    df = pd.DataFrame()
    df['name'] = ['John', 'Steve', 'Sarah']
    df['Age'] = ['10', '12', '15']
    sh = gc.open('csci5410-g8-recipe-visualization')
    wks = sh[0]
    wks.set_dataframe(df,(1,1))