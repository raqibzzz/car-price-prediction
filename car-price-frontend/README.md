# Car Price Prediction Frontend

A modern web interface for the car price prediction AI, built with Next.js.

## Features

- Clean, responsive UI built with React and Tailwind CSS
- Interactive form for entering car details
- Real-time predictions using the Python ML model
- Mobile-friendly design

## Tech Stack

- Next.js - React framework
- Tailwind CSS - Utility-first CSS framework
- Axios - HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js 14+ installed
- Python backend (../predict.py) must be properly set up

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/pages` - Next.js pages
- `/pages/api` - API routes (connects to Python backend)
- `/styles` - Global CSS and Tailwind config
- `/components` - Reusable React components

## How It Works

1. The user inputs car details (brand, year, kilometers) in the web form
2. When submitted, the form sends a request to the `/api/predict` endpoint
3. The API connects to the Python script (predict.py) to generate a prediction
4. The result is displayed to the user with proper formatting

## Deployment

To build for production:

```
npm run build
npm start
```

## Future Improvements

- Add authentication for user accounts
- Save prediction history
- Implement comparison features
- Add more detailed information about predictions
- Add graphs and visualizations for better understanding 