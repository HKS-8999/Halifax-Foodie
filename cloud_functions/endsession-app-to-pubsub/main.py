import os
import base64
import json
from google.cloud import pubsub_v1

def hello_world(request):
    publisher = pubsub_v1.PublisherClient()
    try:
        request_json = request.get_json(silent=True)
        print(request_json)
        topic_name = 'projects/b00899473-csci5410-365518/topics/communication_history'.format(
            project_id=os.getenv('GOOGLE_CLOUD_PROJECT'),
            topic='group8-hfxfoodie1',
        )
        message_json = json.dumps(request_json)
        data = message_json.encode("utf-8")
        publish_to_pubsub = publisher.publish(topic_name, data)
        publish_to_pubsub.result()
        return f"OK"
    except Exception as e:
        print(e)
        return f"NOT OK"
        