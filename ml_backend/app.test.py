import requests
import json

url = "http://localhost:3002/temp_gbr"
data = {
  "feature_c": 1.23,
  "feature_ct": 4.56,
  "feature_motorspeed": 7.89,
  "ambient_temp": 10.11,
  "car_speed": 12.13,
  "soc": 14.15
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(data), headers=headers)
print(response.json())
