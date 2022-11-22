import pygsheets
import pandas as pd

def lambda_handler(event, context):
    #authorization
    gc = pygsheets.authorize(service_file='creds.json')

    # Create empty dataframe
    df = pd.DataFrame()

    # Create a column
    df['name'] = ['John', 'Steve', 'Sarah']

    df['Age'] = ['10', '12', '15']

    #open the google spreadsheet (where 'PY to Gsheet Test' is the name of my sheet)
    sh = gc.open('csci5410-g8-recipe-visualization')

    #select the first sheet 
    wks = sh[0]

    #update the first sheet with df, starting at cell B2. 
    wks.set_dataframe(df,(1,1))