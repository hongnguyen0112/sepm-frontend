from flask import Flask, request, redirect, url_for, flash, jsonify,render_template
import numpy as np
import pandas as pd
import pickle
import requests
import json

app = Flask(__name__)
model = pickle.load(open('AI_model.pkl','rb'))
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET'])
def predict():
    lat = request.args['lat']
    lon = request.args['lon']
    api_key = "2bf14f2db250719b59f4c8cc5eb9eb9c"
    api_base = "https://api.openweathermap.org/data/2.5/"
    new_res = requests.get(f"{api_base}onecall?lat={lat}&lon={lon}&exclude=minutely,daily,alerts&units=metric&appid={api_key}")
    new_dic = new_res.json()    
    test_hourly_df = pd.DataFrame(new_dic["hourly"])
    test_hourly_df.to_csv('test_hourly.csv', index=False, sep=",")    # Index is numbering from 0 for each row
    testData = pd.read_csv('test_hourly.csv', sep=',', header=0)

    if 'rain' in testData:  # API sends with missing column 'rain' if there are no rain within 48 hours.
        testData.rain = pd.Categorical(testData.rain) # Convert Category rain value to integer
        testData['rain'] = testData.rain.cat.codes
    else:
        testData['rain'] = -1
    if 'snow' in testData:  # API sends with missing column 'snow' if there are no snow within 48 hours.
        testData.snow = pd.Categorical(testData.snow) # Convert Category snow value to integer
        testData['snow'] = testData.snow.cat.codes
    else:
        testData['snow'] = -1

    testData.weather = pd.Categorical(testData.weather) # Convert Category weather value to integer
    testData['weather'] = testData.weather.cat.codes

    testData.drop('dt', axis='columns', inplace=True) # Drop irrelevant values

    new_X_test = testData.values[:, 0:15]
    y_hat = model.predict(new_X_test)
    return render_template('index.html', prediction_text='Outfit: {}'.format(y_hat))
 
if __name__ == '__main__':
    
    app.run(debug=True)