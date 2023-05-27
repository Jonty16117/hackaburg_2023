# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 21:40:41 2020

@author: win10
"""

# 1. Library imports
import uvicorn
from fastapi import FastAPI
from fastapi import HTTPException
from GBR_DTO import GBR_DTO
from RFR_DTO import RFR_DTO
import numpy as np
import pickle
import pandas as pd
import joblib

# 2. Create the app object
app = FastAPI()

# gradient boosting regressor
gbr_model_load = joblib.load('./model_files/gbr_model_noisy.joblib')

# random forest regressor
rfr_model_load = joblib.load('./model_files/rfr_model_noisy.joblib')


# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get('/{name}')
def get_name(name: str):
    return {'Welcome ': f'{name}'}

# 3. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted Bank Note with the confidence
@app.post('/temp_rfr')
def predict_rfr(data: dict):
    try:
        features = [data.get('feature_c'), data.get('feature_ct'), data.get('feature_motorspeed'), data.get('ambient_temp'), data.get('car_speed'), data.get('soc')]
        features = pd.DataFrame([features], columns=['feature_c', 'feature_ct', 'feature_motorspeed', 'ambient_temp', 'car_speed', 'soc'])
        print(features)
        new_pred = str(np.round(rfr_model_load.predict(features)[0], 2))
        return {
            'prediction': new_pred
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/temp_gbr')
def predict_rfr(data: dict):
    try:
        features = [data.get('feature_c'), data.get('feature_ct'), data.get('feature_motorspeed'), data.get('ambient_temp'), data.get('car_speed'), data.get('soc')]
        features = pd.DataFrame([features], columns=['feature_c', 'feature_ct', 'feature_motorspeed', 'ambient_temp', 'car_speed', 'soc'])
        print(features)
        new_pred = str(np.round(gbr_model_load.predict(features)[0], 2))
        return {
            'prediction': new_pred
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=3002)
    
# uvicorn app:app --host 0.0.0.0 --port 3002