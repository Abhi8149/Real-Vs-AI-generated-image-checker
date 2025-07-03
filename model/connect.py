from flask import Flask, request, jsonify
from predictImage import predict_image 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    result = predict_image(file)
    label = int(result > 0.5)
    return jsonify({'result': label})

if __name__ == '__main__':
    app.run(debug=True)