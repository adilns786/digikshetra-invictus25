import pandas as pd
import pickle
import numpy as np
import re
def predict_fraud(transaction_data):
    """
    Function to predict fraud given transaction data.
    
    Args:
        transaction_data: A pandas DataFrame or single transaction dictionary/Series
                         containing the features needed for prediction.
    
    Returns:
        tuple: (prediction, probability) where:
            - prediction: Boolean, True if fraudulent, False if legitimate
            - probability: Float, the probability of fraud (between 0 and 1)
    """
    # 1. Load the trained model
    model = load_model('real_estate_fraud_model.pkl')
    
    if model is None:
        raise Exception("Error: Could not load the model.")
    
    # 2. Make predictions
    prediction_result = predict(model, transaction_data)
    
    # 3. Extract prediction and probability from the result
    # Assuming predict() returns a tuple of (predictions, probabilities)
    predictions, probabilities = prediction_result
    
    # If we have a single transaction, return a simple tuple
    if len(predictions) == 1:
        is_fraud = bool(predictions[0])
        fraud_probability = float(probabilities[0][1])  # Index 1 for fraud probability
        return (is_fraud, fraud_probability)
    
    # If we have multiple transactions, return lists
    else:
        is_fraud_list = [bool(p) for p in predictions]
        fraud_probability_list = [float(p[1]) for p in probabilities]
        return (is_fraud_list, fraud_probability_list)
        
def load_model(file_path):
    """
    Load the trained model from a pickle file.
    
    Args:
        file_path (str): Path to the model pickle file
        
    Returns:
        The loaded model or None if loading fails
    """
    try:
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
        print(f"Model successfully loaded from {file_path}")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def create_sample_transaction():
    """
    Create a sample transaction for testing the model.
    
    Returns:
        pandas.DataFrame: A DataFrame containing a single transaction
    """
    # Create a dictionary with transaction data
    transaction_data = {
        'transaction_id': ['TR999'],
        'timestamp': ['2024-12-20 10:15:00'],
        'property_id': ['P2050'],
        'seller_id': ['S125'],
        'buyer_id': ['B210'],
        'property_type': ['residential'],
        'area_sqft': [1500],
        'listed_price': [200000],
        'transaction_price': [195000],
        'price_per_sqft': [130],
        'location': ['Downtown'],
        'coordinates': ['40.7128, -74.0060'],
        'title_age_days': [380],
        'amenities': ['pool,gym,parking'],
        'nearby_landmarks': ['park,school,mall'],
        'ownership_changes_count': [2],
        'days_on_market': [30],
        'has_extract7_12': [True],
        'has_mutation_certificate': [True],
        'has_property_tax_receipt': [True],
        'has_sale_deed': [True],
        'legal_compliance_complete': [True],
        'price_change_percent': [-2.5],
        'buyer_seller_relation': ['unrelated'],
        'agent_involved': [True],
        'transaction_speed_days': [25],
        'multiple_transaction_30days': [False],
        'seller_previous_fraud': [False]
        # Note: 'is_fraud' is not included as this is what we want to predict
    }
    
    # Convert to DataFrame
    return pd.DataFrame(transaction_data)

def create_batch_transactions(num_transactions=3):
    """
    Create multiple sample transactions for batch prediction.
    
    Args:
        num_transactions (int): Number of transactions to create
        
    Returns:
        pandas.DataFrame: A DataFrame containing multiple transactions
    """
    # Start with our sample transaction
    sample = create_sample_transaction()
    
    # Create variations for batch processing
    all_transactions = []
    
    for i in range(num_transactions):
        # Create a copy of the sample transaction
        transaction = sample.copy()
        
        # Modify the transaction to create variations
        transaction['transaction_id'] = [f'TR{1000+i}']
        transaction['property_id'] = [f'P{3000+i}']
        
        # Adjust some values to create diversity
        if i == 1:  # Make one transaction look potentially fraudulent
            transaction['transaction_price'] = [sample['listed_price'].values[0] * 0.7]  # Large price difference
            transaction['price_per_sqft'] = [transaction['transaction_price'].values[0] / transaction['area_sqft'].values[0]]
            transaction['has_mutation_certificate'] = [False]
            transaction['has_property_tax_receipt'] = [False]
            transaction['transaction_speed_days'] = [3]  # Very fast transaction
        elif i == 2:  # Another variation
            transaction['transaction_price'] = [sample['listed_price'].values[0] * 1.1]  # Slight premium
            transaction['price_per_sqft'] = [transaction['transaction_price'].values[0] / transaction['area_sqft'].values[0]]
            transaction['days_on_market'] = [90]  # Longer time on market
        
        all_transactions.append(transaction)
    
    # Combine into a single DataFrame
    return pd.concat(all_transactions, ignore_index=True)

def predict(model, data):
    """
    Make predictions using the fraud detection model.
    
    Args:
        model: The trained machine learning model
        data (pandas.DataFrame): Transaction data to predict
        
    Returns:
        tuple: (predictions, probabilities)
    """
    # Clean and prepare the data - replicating the preprocessing from the training code
    data_clean = clean_data(data)
    X = prepare_features(data_clean)
    
    # Make prediction
    predictions = model.predict(X)
    probabilities = model.predict_proba(X)
    
    return predictions, probabilities

def clean_data(df):
    """
    Clean and preprocess the transaction data.
    
    Args:
        df (pandas.DataFrame): Raw transaction data
        
    Returns:
        pandas.DataFrame: Cleaned and preprocessed data
    """
    # Make a copy to avoid modifying the original
    df = df.copy()
    
    # Convert numeric columns
    numeric_cols = ['area_sqft', 'listed_price', 'transaction_price', 'price_per_sqft', 
                   'title_age_days', 'ownership_changes_count', 'days_on_market',
                   'price_change_percent', 'transaction_speed_days']
    
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Convert boolean columns - ensure proper boolean type
    bool_columns = [
        'has_extract7_12', 'has_mutation_certificate', 'has_property_tax_receipt',
        'has_sale_deed', 'legal_compliance_complete', 'agent_involved',
        'multiple_transaction_30days', 'seller_previous_fraud'
    ]
    
    for col in bool_columns:
        if col in df.columns:
            # Handle different formats of boolean values
            if df[col].dtype != bool:
                df[col] = df[col].astype(str).str.lower()
                df[col] = df[col].map({'true': True, 'false': False, 't': True, 'f': False, 
                                      'yes': True, 'no': False, '1': True, '0': False,
                                      'y': True, 'n': False})
    
    # Convert timestamp to datetime
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        
        # Extract time-based features
        if not df['timestamp'].isna().all():
            df['month'] = df['timestamp'].dt.month
            df['day_of_week'] = df['timestamp'].dt.dayofweek
            df['hour'] = df['timestamp'].dt.hour
    
    # Process coordinates
    if 'coordinates' in df.columns:
        def extract_coordinates(coord_str):
            if pd.isna(coord_str):
                return np.nan, np.nan
            
            # Extract numbers from the string using regex
            numbers = re.findall(r'-?\d+\.?\d*', str(coord_str))
            if len(numbers) >= 2:
                return float(numbers[0]), float(numbers[1])
            return np.nan, np.nan
        
        df['latitude'], df['longitude'] = zip(*df['coordinates'].apply(extract_coordinates))
    
    # Process amenities and landmarks
    if 'amenities' in df.columns:
        df['amenities_count'] = df['amenities'].astype(str).apply(
            lambda x: len(re.split(r'[,/|;]', x)) if not pd.isna(x) and x.lower() != 'none' else 0)
    
    if 'nearby_landmarks' in df.columns:
        df['landmarks_count'] = df['nearby_landmarks'].astype(str).apply(
            lambda x: len(re.split(r'[,/|;]', x)) if not pd.isna(x) and x.lower() != 'none' else 0)
    
    # Calculate derived features
    if all(col in df.columns for col in ['listed_price', 'transaction_price']):
        df['price_discrepancy'] = (df['transaction_price'] - df['listed_price']).abs() / df['listed_price'] * 100
        df['price_ratio'] = df['transaction_price'] / df['listed_price']
    
    return df

def prepare_features(df):
    """
    Prepare features for model prediction.
    
    Args:
        df (pandas.DataFrame): Cleaned transaction data
        
    Returns:
        pandas.DataFrame: Features ready for model input
    """
    # Drop columns that shouldn't be used for modeling
    drop_cols = ['transaction_id', 'timestamp', 'property_id', 'seller_id', 'buyer_id', 
                 'coordinates', 'amenities', 'nearby_landmarks']
    
    # Ensure all columns exist before attempting to drop
    drop_cols = [col for col in drop_cols if col in df.columns]
    
    # Also drop target variable if it exists
    if 'is_fraud' in df.columns:
        drop_cols.append('is_fraud')
    
    X = df.drop(drop_cols, axis=1)
    return X

def display_results(transaction, prediction_result):
    """
    Display the prediction results in a readable format.
    
    Args:
        transaction (pandas.DataFrame): The transaction data
        prediction_result (tuple): (predictions, probabilities) from the model
    """
    predictions, probabilities = prediction_result
    
    print("\n--- Fraud Detection Results ---")
    print(f"Transaction ID: {transaction['transaction_id'].values[0]}")
    print(f"Property Type: {transaction['property_type'].values[0]}")
    print(f"Location: {transaction['location'].values[0]}")
    print(f"Listed Price: ${transaction['listed_price'].values[0]:,.2f}")
    print(f"Transaction Price: ${transaction['transaction_price'].values[0]:,.2f}")
    
    # Display prediction
    is_fraud = predictions[0]
    fraud_probability = probabilities[0][1]
    
    print("\nPrediction:")
    print(f"Fraud Detected: {'Yes' if is_fraud else 'No'}")
    print(f"Fraud Probability: {fraud_probability:.4f} ({fraud_probability*100:.2f}%)")
    
    # Risk level
    if fraud_probability < 0.2:
        risk_level = "Low"
    elif fraud_probability < 0.6:
        risk_level = "Medium"
    else:
        risk_level = "High"
    
    print(f"Risk Level: {risk_level}")
    
    # Potential warning flags based on transaction data
    print("\nPotential Warning Flags:")
    flags = []
    
    try:
        # Price discrepancy
        price_diff_pct = abs(transaction['transaction_price'].values[0] - transaction['listed_price'].values[0]) / transaction['listed_price'].values[0] * 100
        if price_diff_pct > 10:
            flags.append(f"Large price discrepancy ({price_diff_pct:.1f}% from listed price)")
        
        # Missing documentation
        for doc in ['has_extract7_12', 'has_mutation_certificate', 'has_property_tax_receipt', 'has_sale_deed']:
            if doc in transaction.columns and not transaction[doc].values[0]:
                flags.append(f"Missing {doc.replace('has_', '').replace('_', ' ')}")
        
        # Fast transaction
        if 'transaction_speed_days' in transaction.columns and transaction['transaction_speed_days'].values[0] < 7:
            flags.append(f"Unusually fast transaction ({transaction['transaction_speed_days'].values[0]} days)")
        
        # Short time on market
        if 'days_on_market' in transaction.columns and transaction['days_on_market'].values[0] < 14:
            flags.append(f"Short time on market ({transaction['days_on_market'].values[0]} days)")
        
        # Previous fraud
        if 'seller_previous_fraud' in transaction.columns and transaction['seller_previous_fraud'].values[0]:
            flags.append("Seller has previous fraud history")
    
    except Exception as e:
        flags.append(f"Error analyzing flags: {e}")
    
    if flags:
        for flag in flags:
            print(f"- {flag}")
    else:
        print("- No significant warning flags detected")

# if __name__ == "__main__":
#     main()