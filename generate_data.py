import pandas as pd
import numpy as np

# Car brands
brands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Lexus", "Audi", "Chevrolet"]

# Generate random data
np.random.seed(42)
data = {
    "Brand": np.random.choice(brands, 50),
    "Year": np.random.randint(2005, 2023, 50),
    "Mileage": np.random.randint(5000, 250000, 50),
    "Price": np.random.randint(5000, 80000, 50),
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("data/car_prices.csv", index=False)

print("Dataset saved to data/car_prices.csv")