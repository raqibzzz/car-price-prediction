# Car Price Prediction

A simple machine learning project that predicts car prices in Canadian dollars (CAD) based on brand, year, and kilometers.

## Project Overview

This project demonstrates how to build a basic machine learning model to predict car prices. It's designed as a learning tool for understanding the fundamentals of machine learning and regression models.

## Features

- Data generation with realistic correlations
- Data preprocessing (label encoding, feature scaling)
- Model training (Linear Regression and Random Forest)
- Model evaluation
- Interactive prediction tool

## Files in this Project

- `generate_data.py`: Creates a synthetic dataset of car prices with realistic correlations
- `main.py`: Preprocesses data, trains models, and evaluates their performance
- `predict.py`: Interactive tool for making predictions with the trained model
- `data/car_prices.csv`: The dataset used for training
- `car_price_model.pkl`: The saved trained model
- `scaler.pkl`: The saved feature scaler
- `label_encoder.pkl`: The saved label encoder for brand names
- `feature_importance.png`: Visualization of feature importance

## How to Use

1. **Generate Data** (optional, already done):
   ```
   python generate_data.py
   ```

2. **Train the Model** (optional, already done):
   ```
   python main.py
   ```

3. **Make Predictions**:
   ```
   python predict.py
   ```
   Follow the prompts to enter car details and get a price prediction.

## Model Performance

The Random Forest model achieves approximately 90% accuracy (R² score) on the test data, which is quite good for this synthetic dataset. The most important features for prediction are:

1. Kilometers
2. Brand
3. Age/Year

## Future Improvements

- Add more features (e.g., car condition, fuel type, transmission type)
- Try more advanced models (e.g., Gradient Boosting, Neural Networks)
- Use real-world data instead of synthetic data
- Create a web interface for predictions

## Requirements

- Python 3.6+
- pandas
- numpy
- scikit-learn
- matplotlib (for visualizations)
- joblib (for model saving/loading)

## Installation

```
pip install pandas numpy scikit-learn matplotlib joblib
``` 