import sys
import json
import pickle
import numpy as np

def load_model(model_path):
    with open(model_path, 'rb') as f:
        return pickle.load(f)

def predict(features):
    try:
        # Load the model
        model = load_model('server/ml/model/model.pkl')
        
        # Convert features to numpy array
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict_proba(features_array)[0][1]
        
        result = {
            'probability': float(prediction),
            'confidence': 'High' if prediction > 0.7 else 'Medium' if prediction > 0.4 else 'Low'
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == '__main__':
    # Read features from command line arguments
    features = json.loads(sys.argv[1])
    predict(features)