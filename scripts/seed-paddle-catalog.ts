/**
 * Paddle Sandbox Product Catalog Seeder for Perch Pro
 * 
 * Creates:
 * 1. Product: "Perch Pro" (tax_category: "standard" for desktop software)
 * 2. Regular Price (One-time): USD 14.99 with overrides for GBP 12.99, EUR 13.99, AUD 22.99
 * 3. Launch Offer Price (One-time): USD 9.99 with overrides for GBP 8.99, EUR 9.49, AUD 14.99
 */

const PADDLE_SANDBOX_API_URL = 'https://sandbox-api.paddle.com';

interface PaddleResponse<T> {
  data: T;
  error?: {
    type: string;
    code: string;
    detail: string;
    errors?: Array<{ field: string; message: string }>;
  };
}

interface Product {
  id: string;
  name: string;
  tax_category: string;
  description: string | null;
  status: string;
}

interface Price {
  id: string;
  product_id: string;
  description: string;
  name: string | null;
  unit_price: {
    amount: string;
    currency_code: string;
  };
  unit_price_overrides: Array<{
    country_codes: string[];
    unit_price: {
      amount: string;
      currency_code: string;
    };
  }>;
  status: string;
}

async function callPaddleApi<T>(endpoint: string, apiKey: string, body?: any): Promise<T> {
  const url = `${PADDLE_SANDBOX_API_URL}${endpoint}`;
  const response = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await response.json() as PaddleResponse<T>;

  if (!response.ok) {
    const errorDetail = json.error
      ? `${json.error.code}: ${json.error.detail} ${JSON.stringify(json.error.errors || '')}`
      : `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Paddle API Error [${endpoint}]: ${errorDetail}`);
  }

  return json.data;
}

export async function seedCatalog(apiKey: string) {
  console.log('--- Connecting to Paddle Sandbox ---');

  // 1. Create Product
  console.log('\nCreating Product: Perch Pro...');
  const product = await callPaddleApi<Product>('/products', apiKey, {
    name: 'Perch Pro',
    tax_category: 'standard',
    description: 'Perch Pro - Floating Windows clipboard panel & shelf. Lifetime access, all features included, free future updates.',
  });
  console.log(`✓ Product created successfully!`);
  console.log(`  ID: ${product.id}`);
  console.log(`  Name: ${product.name}`);
  console.log(`  Tax Category: ${product.tax_category}`);

  // 2. Create Regular Price
  console.log('\nCreating Regular Price ($14.99 USD with regional overrides)...');
  const regularPrice = await callPaddleApi<Price>('/prices', apiKey, {
    product_id: product.id,
    description: 'Perch Pro - Lifetime License (Regular Price)',
    name: 'Lifetime License',
    unit_price: {
      amount: '1499',
      currency_code: 'USD',
    },
    unit_price_overrides: [
      {
        country_codes: ['GB'],
        unit_price: { amount: '1299', currency_code: 'GBP' },
      },
      {
        country_codes: ['IE'],
        unit_price: { amount: '1399', currency_code: 'EUR' },
      },
      {
        country_codes: ['AU'],
        unit_price: { amount: '2299', currency_code: 'AUD' },
      },
    ],
  });
  console.log(`✓ Regular Price created successfully!`);
  console.log(`  ID: ${regularPrice.id}`);
  console.log(`  Base Amount: $14.99 USD (1499)`);
  console.log(`  Overrides: GB £12.99 (1299), IE €13.99 (1399), AU $22.99 AUD (2299)`);

  // 3. Create Launch Offer Price
  console.log('\nCreating Launch Offer Price ($9.99 USD with regional overrides)...');
  const launchPrice = await callPaddleApi<Price>('/prices', apiKey, {
    product_id: product.id,
    description: 'Perch Pro - Lifetime License (Launch Offer)',
    name: 'Launch Offer',
    unit_price: {
      amount: '999',
      currency_code: 'USD',
    },
    unit_price_overrides: [
      {
        country_codes: ['GB'],
        unit_price: { amount: '899', currency_code: 'GBP' },
      },
      {
        country_codes: ['IE'],
        unit_price: { amount: '949', currency_code: 'EUR' },
      },
      {
        country_codes: ['AU'],
        unit_price: { amount: '1499', currency_code: 'AUD' },
      },
    ],
  });
  console.log(`✓ Launch Offer Price created successfully!`);
  console.log(`  ID: ${launchPrice.id}`);
  console.log(`  Base Amount: $9.99 USD (999)`);
  console.log(`  Overrides: GB £8.99 (899), IE €9.49 (949), AU $14.99 AUD (1499)`);

  // 4. Summary Output
  const summary = {
    product: {
      id: product.id,
      name: product.name,
      tax_category: product.tax_category,
      status: product.status,
    },
    prices: [
      {
        id: regularPrice.id,
        purpose: 'Regular Price (Lifetime)',
        name: regularPrice.name,
        currency: 'USD',
        amount: regularPrice.unit_price.amount,
        formatted_amount: '$14.99 USD',
        overrides: [
          { country: 'United Kingdom (GB)', currency: 'GBP', amount: '1299', formatted: '£12.99 GBP' },
          { country: 'Ireland (IE)', currency: 'EUR', amount: '1399', formatted: '€13.99 EUR' },
          { country: 'Australia (AU)', currency: 'AUD', amount: '2299', formatted: '$22.99 AUD' },
        ],
      },
      {
        id: launchPrice.id,
        purpose: 'Launch Offer (Lifetime)',
        name: launchPrice.name,
        currency: 'USD',
        amount: launchPrice.unit_price.amount,
        formatted_amount: '$9.99 USD',
        overrides: [
          { country: 'United Kingdom (GB)', currency: 'GBP', amount: '899', formatted: '£8.99 GBP' },
          { country: 'Ireland (IE)', currency: 'EUR', amount: '949', formatted: '€9.49 EUR' },
          { country: 'Australia (AU)', currency: 'AUD', amount: '1499', formatted: '$14.99 AUD' },
        ],
      },
    ],
  };

  console.log('\n=== CATALOG SEED SUMMARY ===');
  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

// Direct CLI invocation
const apiKey = process.env.PADDLE_SANDBOX_API_KEY || process.env.PADDLE_API_KEY || process.argv[2];

if (!apiKey) {
  console.error('\n[Error] Missing Paddle Sandbox API key.');
  console.error('Usage:');
  console.error('  npx tsx scripts/seed-paddle-catalog.ts <YOUR_PADDLE_SANDBOX_API_KEY>');
  console.error('  or set PADDLE_SANDBOX_API_KEY in your environment.\n');
  process.exit(1);
}

seedCatalog(apiKey).catch((err) => {
  console.error('\nSeed failed:', err.message);
  process.exit(1);
});
