import firebase_admin
from firebase_admin import db
import json
def hello_world():
  try:
    cred_obj = firebase_admin.credentials.Certificate({
        "type": "service_account",
        "project_id": "halifaxfoodie-group8",
        "private_key_id": "04bf48941e28854ff413819109fd68a61322a685",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/s5UDwYMiStba\nE/Zv/k8wbrlxaxN//ZXridksi3UlM1NMDHkG2OfBUYOtKDzSsraPuFRZ8+mH3bsb\nl8JaCmMflOFTsv6q5+FWnK5iDqp2qlIjtMBNlEqrVFoJDhxoQlX0Q0rbk2Zy8sK8\nfxbZHdCoJRHRGS+go8LizFNk6QsSSL3RShdLNA6uSynwak7DZ1A5I6f07JoNVgYp\nGN4Wvc29/Mn0IObNjrkzV6m6ItD34tRnsvPBm6xI0BYeUkoktsBx9KLcl/qQsrQg\nhJ4VhTt9z8sDKqHaD8jjBHwk3NteqnVA31J7S8fMSfOUn7YOYoynN/QK/owVE8ve\nFOjy16INAgMBAAECggEAKrTPFa8ej50skBiyZfC5o4iHN4UrKvBLXdWv1ASdbFQq\n0l5U9/mKZ77JHuI/6pB1qz7dS8zS0bnL3THJ0lVOD9MS/5p4sYpG4Qy2rJGn2BfJ\nhLrXvHC00cZQ6IOEQJXGoEv9eT01LZZ3W5bUeDn0KgFYHsUFnzvcRrpOOcTQ+plm\n/9iCIXPnx2ii7t39lLN6/hIvePcftTax6/UFd53DbDL0N6J2YQIlPX01gKCUzkg/\nlAXZ53P0SCBrHLNklW51/QS4C9zbajbv1Q1fBPaIZ3TrXkrCMuf81OOfHN/te/wN\ndK55UBlqmRuoCEsjeF2cBi+WNNP7okdmtSDkvovcAQKBgQDtVR81hD2aIuJPJHTO\ncRnwdkpvhCGACJgdmIfJwwXoFSWj9hXMMQSKBBQ2eA0i6eGaK6ofoObZ7493e6HW\n0kCvCqT71xXBZztj7N4YauJJ509WLnQp+mE0yP+c5TAD4o/GfV47QZn+s9tIARwF\nqCwZnBaLySFqXGysChF7KxbKoQKBgQDOx6S+0IkpBOErLrIXfVkFrZOMIQCIwkes\nM02VKFEpzFuzM+6F3DcIVcu+e6FwEtNlOUYqKbivEX1xGNN/FzZS2bor/bUnyMas\nJstXwYtIl8+pYJlIXKCyLM7L4dlEaLgvYc3++6VA/ESRan+yBWeby/GjGE3nZdaF\nBsywa5Ur7QKBgG9uvyeOfqoHZQDJ2jov6oD32X1AqcYGwv1qZ584/WX5v+GbIqLs\nBPiUb7UfavOQoseTZt5Q2vNKwq7UEqndsFc/hTVlyKY1RTJmveTzEmqmu554Uzx+\nffOdyD6vcXrxfpYwuPTTmW14nyXQt4qEaqhfnEpn1lOtL60bURfmpF3hAoGBAMtw\nRDevt6JxuI7hrDnMCy+47HdraLkkW5uiBex/9Appkrammz97v3El6ASKYfR/sRff\n15ZX4ensDTyeLkbVsY6lw7LQM9DmigCJUnoOY1iSc66y6Vv2NevWhca1dysE1GFZ\nmnAJaTace2GOJAAjrSHs7tmFafAFk57hZ7USw3qpAoGBALOCzjxIKAD5s+m0MGeo\nqtYnZF5x6lkEiCvhbK7AUtWBx/uJQpnuY0rEfXtNo2SbO32kBCWzDc7CeZ0owXZg\n54fjr9E3ZkFjhjdybm+miwLhVSx08iAQ1c43pqUkm6eX6jJBrYmrKGdzAfivwXuQ\npLKAvHt9FwEwfG8Ya8VB+Xvo\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-xeoc0@halifaxfoodie-group8.iam.gserviceaccount.com",
        "client_id": "108582859945449275287",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xeoc0%40halifaxfoodie-group8.iam.gserviceaccount.com"
        }
        )
    default_app = firebase_admin.initialize_app(cred_object, {'databaseURL':databaseURL})
    ref = db.reference("/")
    str_json = {"orderId" : "1001", "restaurantId" : "jh76"}
    file_contents = json.loads(str_json)
    ref.set(file_contents)
    ref = db.reference("/Books/Best_Sellers")
    for key, value in file_contents.items():
	    ref.push().set(value)
    return f'Hello World!'
  except Exception as e:
        print(e)
        return f"NOT OK"