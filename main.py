import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np
import matplotlib.pyplot as plt

#Load the data
data = pd.read_csv("data/car_prices.csv")

# Basic data exploration
print("Dataset shape:", data.shape)
print("\nFirst few rows:")
print(data.head())
print("\nData information:")
print(data.info())
print("\nStatistical summary:")
print(data.describe())

#Convert categorical 'Brand' to numerical values
label_encoder = LabelEncoder()
data['Brand'] = label_encoder.fit_transform(data['Brand'])

# Feature engineering
# Create a new feature: car age (current year - manufacturing year)
current_year = 2025  # You can update this to the current year
data['Age'] = current_year - data['Year']

# Create a feature for price per kilometer (if it makes sense for your dataset)
# data['Price_per_Kilometer'] = data['Price'] / (data['Kilometers'] + 1)  # Adding 1 to avoid division by zero

#Split data into features (X) and target (y)
X = data[['Brand', 'Year', 'Kilometers', 'Age']]
y = data['Price']

#Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling - important for many ML algorithms
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("Data preprocessed successfully!")

# Compare multiple models
models = {
    "Linear Regression": LinearRegression(),
    "Random Forest": RandomForestRegressor(n_estimators=100, random_state=42)
}

for name, model in models.items():
    print(f"\n--- Training {name} ---")
    model.fit(X_train_scaled, y_train)
    
    # Evaluate on test data
    y_pred = model.predict(X_test_scaled)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Model Evaluation for {name}:")
    print(f"Mean Squared Error: ${mse:.2f}")
    print(f"Root Mean Squared Error: ${rmse:.2f}")
    print(f"R² Score: {r2:.4f}")
    
    # For Random Forest, show feature importance
    if name == "Random Forest":
        feature_importance = pd.DataFrame({
            'Feature': X.columns,
            'Importance': model.feature_importances_
        }).sort_values('Importance', ascending=False)
        
        print("\nFeature Importance:")
        print(feature_importance)
        
        # Visualize feature importance
        plt.figure(figsize=(10, 6))
        plt.barh(feature_importance['Feature'], feature_importance['Importance'])
        plt.xlabel('Importance')
        plt.title('Feature Importance (Random Forest)')
        plt.tight_layout()
        plt.savefig('feature_importance.png')
        print("Feature importance plot saved as 'feature_importance.png'")

# Use the best model (Random Forest) for predictions
best_model = models["Random Forest"]

# Make a sample prediction
sample_car = pd.DataFrame({
    'Brand': [label_encoder.transform(['Toyota'])[0]],
    'Year': [2019],
    'Kilometers': [50000],  # ~30,000 miles converted to km
    'Age': [current_year - 2019]
})

# Scale the sample car data
sample_car_scaled = scaler.transform(sample_car)
predicted_price = best_model.predict(sample_car_scaled)[0]

print(f"\nSample Prediction:")
print(f"Predicted price for a 2019 Toyota with 50,000 kilometers: ${predicted_price:.2f}")

# Save the best model
import joblib
joblib.dump(best_model, 'car_price_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')
print("Models and transformers saved for future use")

