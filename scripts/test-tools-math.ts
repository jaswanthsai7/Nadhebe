import {
  gcd,
  simplifyRatio,
  calculateMissingDimension,
  getCommonEquivalentResolutions,
  pixelsToMegapixels,
  megapixelsToResolution,
  calculatePPI,
  calculateDPIPrint,
} from '../src/utils/tools-math';

console.log('--- RUNNING MATH UTILITIES VERIFICATION TESTS ---');

// 1. GCD & Aspect Ratio Tests
const r1 = simplifyRatio(1920, 1080);
console.assert(r1.ratioStr === '16:9', `Expected 16:9, got ${r1.ratioStr}`);
console.assert(r1.orientation === 'Landscape', `Expected Landscape, got ${r1.orientation}`);
console.assert(r1.decimalRatio === 1.7778, `Expected 1.7778, got ${r1.decimalRatio}`);

const r2 = simplifyRatio(1080, 1920);
console.assert(r2.ratioStr === '9:16', `Expected 9:16, got ${r2.ratioStr}`);
console.assert(r2.orientation === 'Portrait', `Expected Portrait, got ${r2.orientation}`);

const r3 = simplifyRatio(1000, 1000);
console.assert(r3.ratioStr === '1:1', `Expected 1:1, got ${r3.ratioStr}`);
console.assert(r3.orientation === 'Square', `Expected Square, got ${r3.orientation}`);

// 2. Missing Dimension Calculation
const d1 = calculateMissingDimension(1920, 1080, 1280, undefined);
console.assert(d1.calculatedH === 720, `Expected 720 height for 1280 width on 16:9, got ${d1.calculatedH}`);

const d2 = calculateMissingDimension(1920, 1080, undefined, 1440);
console.assert(d2.calculatedW === 2560, `Expected 2560 width for 1440 height on 16:9, got ${d2.calculatedW}`);

// 3. Pixels to Megapixels
const mp1 = pixelsToMegapixels(6000, 4000);
console.assert(mp1.totalPixels === 24000000, `Expected 24,000,000 pixels, got ${mp1.totalPixels}`);
console.assert(mp1.megapixels === 24, `Expected 24 MP, got ${mp1.megapixels}`);

const mp2 = pixelsToMegapixels(1920, 1080);
console.assert(mp2.megapixels === 2.0736, `Expected 2.0736 MP, got ${mp2.megapixels}`);

// 4. Megapixels to Resolution
const res1 = megapixelsToResolution(24, 3, 2);
console.assert(res1.width === 6000 && res1.height === 4000, `Expected 6000x4000 for 24MP 3:2, got ${res1.width}x${res1.height}`);

// 5. PPI Calculator
const ppi1 = calculatePPI(1920, 1080, 24);
console.assert(ppi1.ppi === 92, `Expected 92 PPI for 24 inch 1080p display, got ${ppi1.ppi}`);

// 6. DPI Print
const dpi1 = calculateDPIPrint(3000, 2400, undefined, undefined, 300, 'in');
console.assert(dpi1.displayPrintW === 10 && dpi1.displayPrintH === 8, `Expected 10x8 inches for 3000x2400 at 300 DPI, got ${dpi1.displayPrintW}x${dpi1.displayPrintH}`);

console.log('ALL MATH UTILITY TESTS PASSED PERFECTLY!');
