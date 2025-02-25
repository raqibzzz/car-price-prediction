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
- Modern Next.js web interface

## Files in this Project

### Backend (Python)
- `generate_data.py`: Creates a synthetic dataset of car prices with realistic correlations
- `main.py`: Preprocesses data, trains models, and evaluates their performance
- `predict.py`: Interactive tool for making predictions with the trained model
- `data/car_prices.csv`: The dataset used for training
- `car_price_model.pkl`: The saved trained model
- `scaler.pkl`: The saved feature scaler
- `label_encoder.pkl`: The saved label encoder for brand names
- `feature_importance.png`: Visualization of feature importance

### Frontend (Next.js)
- `car-price-frontend/`: Web application directory
- `car-price-frontend/pages/`: Next.js pages including the main interface
- `car-price-frontend/pages/api/`: API endpoints that connect to the Python backend
- `car-price-frontend/styles/`: CSS and styling files

## How to Use

### Backend
1. **Generate Data** (optional, already done):
   ```
   python generate_data.py
   ```

2. **Train the Model** (optional, already done):
   ```
   python main.py
   ```

3. **Command Line Predictions**:
   ```
   python predict.py
   ```
   Follow the prompts to enter car details and get a price prediction.

### Frontend
1. **Navigate to the frontend directory**:
   ```
   cd car-price-frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the development server**:
   ```
   npm run dev
   ```

4. **Open in browser**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to use the web interface.

## Model Performance

The Random Forest model achieves approximately 90% accuracy (R² score) on the test data, which is quite good for this synthetic dataset. The most important features for prediction are:

1. Kilometers
2. Brand
3. Age/Year

## Future Improvements

- Add more features (e.g., car condition, fuel type, transmission type)
- Try more advanced models (e.g., Gradient Boosting, Neural Networks)
- Use real-world data instead of synthetic data
- Enhance the web interface with more visualizations and features
- Deploy to a cloud platform for public access

## Requirements

### Backend:
- Python 3.6+
- pandas
- numpy
- scikit-learn
- matplotlib (for visualizations)
- joblib (for model saving/loading)

### Frontend:
- Node.js 14+
- React
- Next.js
- Tailwind CSS

## Installation

### Backend:
```
pip install pandas numpy scikit-learn matplotlib joblib
```

### Frontend:
```
cd car-price-frontend
npm install
``` 