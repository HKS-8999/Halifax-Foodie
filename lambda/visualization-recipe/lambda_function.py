import pygsheets
import pandas as pd

gc = pygsheets.authorize(service_file='creds.json')
df = pd.DataFrame()
df['Total Users'] = ['3']
df['Total Offline'] = ['1']
df['Total Online'] = ['2']
sh = gc.open('g8-login-statistics')
wks = sh[0]
wks.set_dataframe(df,(1,1))