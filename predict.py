import joblib
import pandas as pd
import numpy as np

def load_models():
    """Load the trained model and preprocessors"""
    model = joblib.load('car_price_model.pkl')
    scaler = joblib.load('scaler.pkl')
    label_encoder = joblib.load('label_encoder.pkl')
    return model, scaler, label_encoder

def predict_price(brand, year, kilometers):
    """Predict the price of a car based on its features"""
    # Load models
    model, scaler, label_encoder = load_models()
    
    # Current year for age calculation
    current_year = 2023
    
    try:
        # Transform brand to numerical value
        brand_encoded = label_encoder.transform([brand])[0]
    except ValueError:
        print(f"Error: Brand '{brand}' not recognized. Available brands:")
        print(", ".join(label_encoder.classes_))
        return None
    
    # Create a DataFrame with the input features
    car_data = pd.DataFrame({
        'Brand': [brand_encoded],
        'Year': [year],
        'Kilometers': [kilometers],
        'Age': [current_year - year]
    })
    
    # Scale the features
    car_data_scaled = scaler.transform(car_data)
    
    # Make prediction
    predicted_price = model.predict(car_data_scaled)[0]
    
    return predicted_price

def main():
    print("Car Price Prediction Tool")
    print("=========================")
    
    # Get available brands
    _, _, label_encoder = load_models()
    available_brands = label_encoder.classes_
    
    print("\nAvailable car brands:")
    print(", ".join(available_brands))
    
    # Get user input
    while True:
        try:
            brand = input("\nEnter car brand: ")
            if brand not in available_brands:
                print(f"Error: Brand '{brand}' not recognized. Please choose from the available brands.")
                continue
                
            year = int(input("Enter car year (e.g., 2019): "))
            if year < 1900 or year > 2023:
                print("Error: Year must be between 1900 and 2023.")
                continue
                
            kilometers = int(input("Enter car kilometers: "))
            if kilometers < 0:
                print("Error: Kilometers cannot be negative.")
                continue
                
            break
        except ValueError:
            print("Error: Please enter valid numeric values for year and kilometers.")
    
    # Predict price
    predicted_price = predict_price(brand, year, kilometers)
    
    if predicted_price is not None:
        print(f"\nPredicted Price: CA${predicted_price:.2f}")
    
    # Ask if user wants to make another prediction
    another = input("\nWould you like to predict another car price? (y/n): ")
    if another.lower() == 'y':
        main()

if __name__ == "__main__":
    main() 