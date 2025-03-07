import pandas as pd
import pickle
import json
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

# Load the trained model
def load_model(model_path):
    """
    Load the trained model from a pickle file.

    Args:
        model_path (str): Path to the saved model file.

    Returns:
        model: The loaded machine learning model.
    """
    try:
        with open(model_path, 'rb') as file:
            model = pickle.load(file)
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

# Predict function
def predict(model, data):
    """
    Make predictions using the trained model.

    Args:
        model: The trained machine learning model.
        data (pd.DataFrame): The input data for prediction.

    Returns:
        tuple: A tuple containing the prediction and probabilities.
    """
    try:
        prediction = model.predict(data)
        probabilities = model.predict_proba(data)
        return prediction, probabilities
    except Exception as e:
        print(f"Error making prediction: {e}")
        return None, None

# Main predict_fraud function
def predict_fraud(request_data):
    """
    Predicts whether a property is fraudulent based on the provided data.
    Handles null values, errors, and provides default values if necessary.

    Args:
        request_data (dict or bytes): The property data received from the POST request.

    Returns:
        list: A list containing the fraud prediction (True/False) and probability (float).
              Example: [False, 0.64]
    """
    try:
        # If request_data is bytes, decode it to a dictionary
        if isinstance(request_data, bytes):
            try:
                request_data = json.loads(request_data.decode('utf-8'))
            except json.JSONDecodeError as e:
                return {"error": f"Invalid JSON data: {str(e)}", "status": "failed"}, 400
        
        # Ensure request_data is a dictionary
        if not isinstance(request_data, dict):
            return {"error": "Input data must be a dictionary.", "status": "failed"}, 400
        
        # Load the trained model
        model = load_model('real_estate_fraud_model.pkl')
        
        if model is None:
            return {"error": "Failed to load the model."}, 500
        
        # Define default values for missing or invalid fields
        default_values = {
            'property_type': 'residential',  # Common property type
            'area_sqft': 1500,  # Average size
            'location': 'Suburban',  # Neutral location
            'amenities': 'parking',  # Basic amenities
            'nearby_landmarks': 'school,park',  # Common landmarks
            'has_extract7_12': True,  # Document available
            'has_mutation_certificate': True,  # Document available
            'has_property_tax_receipt': True,  # Document available
            'has_sale_deed': True,  # Document available
            'legal_compliance_complete': True,  # Legal compliance confirmed
            'price': 200000,  # Reasonable price
            'price_change_percent': 0,  # No price change
            'transaction_speed_days': 30,  # Average transaction speed
            'multiple_transaction_30days': False,  # No suspicious activity
            'seller_previous_fraud': False,  # No history of fraud
            # Additional features
            'transaction_price': 200000,  # Matches listed price
            'listed_price': 200000,  # Reasonable listed price
            'price_ratio': 1.0,  # No price discrepancy
            'amenities_count': 1,  # Basic amenities
            'title_age_days': 365,  # Property title is 1 year old
            'buyer_seller_relation': 'unrelated',  # No suspicious relationship
            'agent_involved': True,  # Agent involved (reduces fraud risk)
            'landmarks_count': 2,  # Common landmarks
            'days_on_market': 60,  # Average days on market
            'latitude': 40.7128,  # Neutral location (e.g., New York)
            'longitude': -74.0060,  # Neutral location (e.g., New York)
            'ownership_changes_count': 1,  # Minimal ownership changes
            'price_discrepancy': 0.0,  # No price discrepancy
            'price_per_sqft': 133.33  # Reasonable price per sqft
        }
        
        # Prepare the data for prediction
        sample_data = {}
        for key in default_values:
            # Use the value from request_data if it exists and is valid, otherwise use the default
            sample_data[key] = request_data.get(key, default_values[key])
            
            # Handle null or invalid values
            if sample_data[key] is None or (isinstance(sample_data[key], (int, float)) and pd.isna(sample_data[key])):
                sample_data[key] = default_values[key]
        
        # Convert the sample data into a DataFrame
        sample_df = pd.DataFrame([sample_data])
        
        # Make a prediction
        prediction, probabilities = predict(model, sample_df)
        
        if prediction is None or probabilities is None:
            return {"error": "Failed to make a prediction."}, 500
        
        # Prepare the response in the required format
        response = [bool(prediction[0]), float(probabilities[0][1])]
        
        return response
    
    except Exception as e:
        # Handle any unexpected errors
        return {"error": f"An error occurred: {str(e)}", "status": "failed"}, 500

# Example usage