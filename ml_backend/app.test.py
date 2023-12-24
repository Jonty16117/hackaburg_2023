import requests
import os
import pandas as pd
import io
import joblib

def test_predict_rfr_range() -> None:
    fileName = "test_data.parquet"
    rfr_model_load = joblib.load('./model_files/rfr_model_noisy.joblib')

    # gbr_model_load = pickle.load(open('./model_files/gbr_model_noisy.pkl', 'rb'))

    df = pd.read_parquet(fileName)
    # df.reset_index(drop=True, inplace=True)

    # df.columns = range(df.shape[1])
    # print(df.head())

    # # Assuming the DataFrame is already defined as df
    # df = df.iloc[1:].reset_index(drop=True)

    # # Update column names
    # df.columns = range(df.shape[1])
    # print(df.head())
    # print(df.head())

    new_pred = rfr_model_load.predict(df)
    print(new_pred)
    df = pd.DataFrame({'prediction': new_pred})

    df.to_csv('new_pred.csv', index=False)

# Usage example
test_predict_rfr_range()
