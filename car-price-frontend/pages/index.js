import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/ui/theme-toggle';
import CustomSelect from '../components/ui/custom-select';

export default function Home() {
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Car brand options
  const brandOptions = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes', label: 'Mercedes' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Audi', label: 'Audi' }
  ];

  // Only show the UI after mounting to prevent hydration issues with Radix UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brand, year, kilometers }),
      });

      const data = await res.json();

      if (res.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-center">Car Price Prediction</CardTitle>
              <CardDescription className="text-center">
                Loading...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <Head>
        <title>Car Price Prediction</title>
        <meta name="description" content="Predict the price of your car based on its brand, year, and kilometers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="w-full max-w-md">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">Car Price Prediction</CardTitle>
            <CardDescription className="text-center">
              Enter your car details to get an estimated price
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Car Brand</Label>
                <CustomSelect 
                  options={brandOptions}
                  value={brand}
                  onChange={setBrand}
                  placeholder="Select a brand"
                  required={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  min="1990"
                  max="2023"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Enter year (1990-2023)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometers">Kilometers</Label>
                <Input
                  id="kilometers"
                  type="number"
                  min="0"
                  value={kilometers}
                  onChange={(e) => setKilometers(e.target.value)}
                  placeholder="Enter kilometers driven"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Calculating...' : 'Predict Price'}
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {prediction && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-center font-medium">Estimated Price</p>
                <p className="text-center text-2xl font-bold text-green-700 dark:text-green-400">
                  ${parseInt(prediction).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 