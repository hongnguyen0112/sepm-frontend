from flask import Flask, request, redirect, url_for, flash, jsonify,render_template
import numpy as np
import pickle
import json

app = Flask(__name__)
model = pickle.load(open('AI_model.pkl','rb'))
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    y_hat = model.predict(final_features)
    output = y_hat
    return render_template('index.html', prediction_text='Outfit: {}'.format(output))
 
if __name__ == '__main__':
    
    app.run(debug=True)