import requests
import os
import pandas as pd
import io

def test_predict_gbr_range() -> None:
    url = 'http://0.0.0.0:3002/predict_gbr_range'
    file_path = './model_files/sample_data.parquet'

    if not os.path.isfile(file_path):
        print(f"File not found: {file_path}")
        return

    try:
        # Read the file as bytes
        with open(file_path, 'rb') as file:
            file_bytes = file.read()

        # Convert bytes to a file-like object
        file_io = io.BytesIO(file_bytes)

        # Attach the file-like object to the POST request
        files = {'file': ('sample_data.parquet', file_io, 'application/octet-stream')}

        response = requests.post(url, files=files)

        if response.status_code == 200:
            prediction = response.json()['prediction']
            print('Prediction:', prediction)
        else:
            print('Error:', response.text)
    except Exception as e:
        print('An error occurred:', str(e))

# Usage example
test_predict_gbr_range()
