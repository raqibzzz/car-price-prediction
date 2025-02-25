import pandas as pd
import numpy as np

# Car brands with their average price factors (higher = more expensive)
brands = {
    "Toyota": 1.0,
    "Honda": 1.1,
    "Ford": 0.9,
    "Chevrolet": 0.85,
    "BMW": 1.8,
    "Mercedes": 2.0,
    "Lexus": 1.6,
    "Audi": 1.7
}

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples
n_samples = 100

# Generate data
data = []
current_year = 2023

for _ in range(n_samples):
    # Select a random brand
    brand = np.random.choice(list(brands.keys()))
    brand_factor = brands[brand]
    
    # Generate year (newer cars are more expensive)
    year = np.random.randint(2000, current_year + 1)
    age = current_year - year
    age_factor = np.exp(-0.1 * age)  # Exponential depreciation with age
    
    # Generate kilometers (correlated with age, with some randomness)
    avg_annual_kilometers = 20000  # ~12,000 miles converted to km
    kilometers = int(age * avg_annual_kilometers * (0.7 + 0.6 * np.random.random()))
    kilometers_factor = np.exp(-0.05 * (kilometers / 16000))  # Higher kilometers reduces price
    
    # Base price for a new car of the cheapest brand
    base_price = 25000
    
    # Calculate price with some randomness
    price = base_price * brand_factor * age_factor * kilometers_factor
    
    # Add some noise (±15%)
    noise = 0.85 + 0.3 * np.random.random()
    price = int(price * noise)
    
    data.append({
        "Brand": brand,
        "Year": year,
        "Kilometers": kilometers,
        "Price": price
    })

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("data/car_prices.csv", index=False)

print(f"Dataset with {n_samples} samples saved to data/car_prices.csv")
print("\nData preview:")
print(df.head())

# Show correlations (excluding Brand which is categorical)
print("\nCorrelations with Price:")
numeric_df = df[['Year', 'Kilometers', 'Price']]
print(numeric_df.corr()["Price"].sort_values(ascending=False))