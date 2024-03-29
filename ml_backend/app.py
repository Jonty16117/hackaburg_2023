# -*- coding: utf-8 -*-

# 1. Library imports
import uvicorn
from fastapi import File, FastAPI, UploadFile, HTTPException
import numpy as np
import pickle
import pandas as pd
import joblib
import os
from fastapi.responses import FileResponse


# 2. Create the app object
app = FastAPI()

# gradient boosting regressor
gbr_model_load = pickle.load(open('./model_files/gbr_model_noisy.pkl', 'rb'))

# random forest regressor
rfr_model_load = joblib.load('./model_files/rfr_model_noisy.joblib')


@app.get('/')
def index():
    return {'message': 'Hello, World'}

@app.post('/predict_rfr')
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

# @app.post('/predict_gbr')
# def predict_gbr(data: dict):
#     try:
#         features = [data.get('feature_c'), data.get('feature_ct'), data.get('feature_motorspeed'), data.get('ambient_temp'), data.get('car_speed'), data.get('soc')]
#         # features = pd.DataFrame([features], columns=['feature_c', 'feature_ct', 'feature_motorspeed', 'ambient_temp', 'car_speed', 'soc'])
#         features = pd.DataFrame([features])
#         print(features)
#         # new_pred = str(np.round(gbr_model_load.predict(features)[0], 2))
#         new_pred = gbr_model_load.predict(features)
#         print(new_pred)

#         return {
#             'prediction': 123
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post('/predict_rfr_range')
async def predict_rfr_range(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Save the file to disk
        fileName = file.filename
        with open(fileName, "wb") as f:
            f.write(contents)
        
        df = pd.read_parquet(fileName)
        new_pred = rfr_model_load.predict(df)
        df = pd.DataFrame({'prediction': new_pred})
        df.to_csv('temp.csv', index=False)

        # return FileResponse(fileName, filename="prediction.csv")
        return 123
    except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))


# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=3002)
    
# uvicorn app:app --host 0.0.0.0 --port 3002
