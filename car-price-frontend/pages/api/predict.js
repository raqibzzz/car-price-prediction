import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brand, year, kilometers } = req.body;

    // Validate inputs
    if (!brand || !year || kilometers === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get the parent directory path (where the Python script is located)
    const parentDir = path.resolve(process.cwd(), '..');
    
    // For development purposes, we can fake a prediction
    // In a real scenario, we'd connect to the Python backend
    
    // This is a simplified prediction algorithm mimicking the backend
    const basePriceCAD = 25000;
    const brandFactors = {
      'Toyota': 1.0,
      'Honda': 1.1,
      'Ford': 0.9,
      'Chevrolet': 0.85,
      'BMW': 1.8,
      'Mercedes': 2.0,
      'Lexus': 1.6,
      'Audi': 1.7
    };
    
    const currentYear = 2025;
    const age = currentYear - year;
    const ageDiscount = Math.exp(-0.1 * age);
    const kilometerDiscount = Math.exp(-0.05 * (kilometers / 16000));
    
    // Calculate price with brand factor, age discount, and kilometer discount
    const price = basePriceCAD * brandFactors[brand] * ageDiscount * kilometerDiscount;
    
    // Add some random variation (±10%)
    const variation = 0.9 + (Math.random() * 0.2);
    const finalPrice = Math.round(price * variation);
    
    // Return the prediction
    return res.status(200).json({ prediction: finalPrice });
    
    /* 
    // Uncomment this section and comment out the above code to use the actual Python backend
    // Prepare command to run Python script
    const command = `cd ${parentDir} && python -c "
import sys
sys.path.append('.')
from predict import predict_price
price = predict_price('${brand}', ${year}, ${kilometers})
print(price)
"`;

    // Execute the Python script
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error('Python script error:', stderr);
      return res.status(500).json({ error: 'Error running prediction script' });
    }

    // Parse the output (predicted price)
    const prediction = parseFloat(stdout.trim());

    // Return the prediction
    return res.status(200).json({ prediction });
    */
  } catch (error) {
    console.error('Prediction API error:', error);
    return res.status(500).json({ error: 'Failed to get prediction' });
  }
} 