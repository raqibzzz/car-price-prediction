import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

#Load the data
data = pd.read_csv("data/car_prices.csv")

#Convert categorical 'Brand' to numerical values
label_encoder = LabelEncoder()
data['Brand'] = label_encoder.fit_transform(data['Brand'])

#Split data into features (X) and target (y)
X = data[['Brand', 'Year', 'Mileage']]
y = data['Price']

#Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Data preprocessed successfully!")

