from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load the trained model and vectorizer
rf_model = joblib.load('random_forest_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get text from request
        text = request.form['text_input']
        
        if not text:
            return jsonify({'error': 'No text provided'})
        
        # Preprocess the input text (if necessary)
        # Ensure preprocessing matches the training process
        text = text.lower()  # Example preprocessing
        
        # Vectorize the input text
        text_vectorized = vectorizer.transform([text])
        
        # Predict using the model
        prediction = rf_model.predict(text_vectorized)[0]
        
        # Return the prediction
        return jsonify({'result': 'Real' if prediction == 'Real' else 'Fake'})
        
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
