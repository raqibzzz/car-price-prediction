import { useState } from 'react';
import Head from 'next/head';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Car Price Prediction</title>
        <meta name="description" content="Predict the price of your car based on its brand, year, and kilometers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md">
        <Card>
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
                <Select value={brand} onValueChange={setBrand} required>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Honda">Honda</SelectItem>
                    <SelectItem value="Ford">Ford</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Mercedes">Mercedes</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}

            {prediction && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-center font-medium">Estimated Price</p>
                <p className="text-center text-2xl font-bold text-green-700">
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