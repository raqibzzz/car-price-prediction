import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carBrands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Lexus', 'Audi'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');

    try {
      const response = await axios.post('/api/predict', {
        brand,
        year: parseInt(year),
        kilometers: parseInt(kilometers)
      });
      
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Error getting prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Car Price Prediction</title>
        <meta name="description" content="Predict car prices using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
            Car Price Prediction
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Car Brand
                </label>
                <select
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select a brand</option>
                  {carBrands.map((carBrand) => (
                    <option key={carBrand} value={carBrand}>
                      {carBrand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="kilometers" className="block text-sm font-medium text-gray-700">
                  Kilometers
                </label>
                <input
                  type="number"
                  id="kilometers"
                  value={kilometers}
                  onChange={(e) => setKilometers(e.target.value)}
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="e.g. 50000"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Calculating...' : 'Predict Price'}
              </button>
            </form>

            {error && (
              <div className="mt-6 text-red-600 text-center font-medium">
                {error}
              </div>
            )}

            {prediction && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Price Prediction</h2>
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="text-center">
                    <span className="text-lg font-medium">Estimated Price: </span>
                    <span className="text-2xl font-bold text-blue-700">
                      CA${prediction.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-10 py-6">
        <div className="max-w-3xl mx-auto text-center text-gray-500">
          <p>Car Price Prediction App | Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
} 