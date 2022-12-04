import base64
import firebase_admin
from firebase_admin import firestore

def hello_pubsub(event, context):
    db = firestore.client()


    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    print(pubsub_message)
