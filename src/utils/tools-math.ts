/**
 * Pure math & calculation utilities for Nadhebe Tools.
 * Framework-agnostic and client-side executable with full edge-case handling.
 */

/** Calculate Greatest Common Divisor using Euclid's algorithm */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export interface SimplifiedRatio {
  ratioWidth: number;
  ratioHeight: number;
  ratioStr: string;
  decimalRatio: number;
  orientation: 'Landscape' | 'Portrait' | 'Square';
  matchingStandardRatio?: string;
}

const COMMON_STANDARD_RATIOS: Array<{ name: string; decimal: number; w: number; h: number }> = [
  { name: '1:1', decimal: 1.0, w: 1, h: 1 },
  { name: '16:9', decimal: 16 / 9, w: 16, h: 9 },
  { name: '9:16', decimal: 9 / 16, w: 9, h: 16 },
  { name: '4:3', decimal: 4 / 3, w: 4, h: 3 },
  { name: '3:4', decimal: 3 / 4, w: 3, h: 4 },
  { name: '3:2', decimal: 3 / 2, w: 3, h: 2 },
  { name: '2:3', decimal: 2 / 3, w: 2, h: 3 },
  { name: '21:9', decimal: 21 / 9, w: 21, h: 9 },
  { name: '5:4', decimal: 5 / 4, w: 5, h: 4 },
  { name: '4:5', decimal: 4 / 5, w: 4, h: 5 },
];

/** Simplify aspect ratio from width and height */
export function simplifyRatio(width: number, height: number): SimplifiedRatio {
  if (!width || !height || width <= 0 || height <= 0 || !isFinite(width) || !isFinite(height)) {
    return {
      ratioWidth: 0,
      ratioHeight: 0,
      ratioStr: 'N/A',
      decimalRatio: 0,
      orientation: 'Square',
    };
  }

  // Handle float / decimal dimensions cleanly
  let w = width;
  let h = height;
  let precision = 1;

  while (w % 1 !== 0 || h % 1 !== 0) {
    if (precision > 10000) break;
    w *= 10;
    h *= 10;
    precision *= 10;
  }

  const divisor = gcd(Math.round(w), Math.round(h));
  const ratioWidth = Math.round(w) / divisor;
  const ratioHeight = Math.round(h) / divisor;

  const decimalRatio = Number((width / height).toFixed(4));
  let orientation: 'Landscape' | 'Portrait' | 'Square' = 'Landscape';
  if (width < height) orientation = 'Portrait';
  else if (width === height) orientation = 'Square';

  const std = COMMON_STANDARD_RATIOS.find((r) => Math.abs(r.decimal - decimalRatio) < 0.01);

  return {
    ratioWidth,
    ratioHeight,
    ratioStr: `${ratioWidth}:${ratioHeight}`,
    decimalRatio,
    orientation,
    matchingStandardRatio: std?.name,
  };
}

/** Compute missing dimension when scaling while preserving ratio */
export function calculateMissingDimension(
  origW: number,
  origH: number,
  newW?: number,
  newH?: number
): { calculatedW: number; calculatedH: number } {
  if (!origW || !origH || origW <= 0 || origH <= 0) {
    return { calculatedW: newW || 0, calculatedH: newH || 0 };
  }

  if (newW && newW > 0) {
    const calculatedH = Math.round((newW * origH) / origW);
    return { calculatedW: Math.round(newW), calculatedH };
  }

  if (newH && newH > 0) {
    const calculatedW = Math.round((newH * origW) / origH);
    return { calculatedW, calculatedH: Math.round(newH) };
  }

  return { calculatedW: origW, calculatedH: origH };
}

export interface EquivalentDimension {
  width: number;
  height: number;
  label?: string;
  totalPixels: number;
  megapixels: number;
}

/** Get common equivalent resolutions for an aspect ratio */
export function getCommonEquivalentResolutions(origW: number, origH: number): EquivalentDimension[] {
  if (!origW || !origH || origW <= 0 || origH <= 0) return [];
  const { ratioWidth, ratioHeight } = simplifyRatio(origW, origH);
  if (!ratioWidth || !ratioHeight) return [];

  // Check standard resolution multipliers
  const standardHeights = [360, 480, 720, 1080, 1440, 2160, 4320];
  const results: EquivalentDimension[] = [];

  if (ratioWidth === 16 && ratioHeight === 9) {
    return [
      { width: 640, height: 360, label: '360p (nHD)', totalPixels: 230400, megapixels: 0.23 },
      { width: 854, height: 480, label: '480p (FWVGA)', totalPixels: 409920, megapixels: 0.41 },
      { width: 1280, height: 720, label: '720p (HD)', totalPixels: 921600, megapixels: 0.92 },
      { width: 1920, height: 1080, label: '1080p (Full HD)', totalPixels: 2073600, megapixels: 2.07 },
      { width: 2560, height: 1440, label: '1440p (2K QHD)', totalPixels: 3686400, megapixels: 3.69 },
      { width: 3840, height: 2160, label: '2160p (4K UHD)', totalPixels: 8294400, megapixels: 8.29 },
      { width: 7680, height: 4320, label: '4320p (8K UHD)', totalPixels: 33177600, megapixels: 33.18 },
    ];
  }

  if (ratioWidth === 9 && ratioHeight === 16) {
    return [
      { width: 360, height: 640, label: '360p Vertical', totalPixels: 230400, megapixels: 0.23 },
      { width: 480, height: 854, label: '480p Vertical', totalPixels: 409920, megapixels: 0.41 },
      { width: 720, height: 1280, label: '720p Vertical (HD)', totalPixels: 921600, megapixels: 0.92 },
      { width: 1080, height: 1920, label: '1080p Vertical (Full HD)', totalPixels: 2073600, megapixels: 2.07 },
      { width: 1440, height: 2560, label: '1440p Vertical (2K)', totalPixels: 3686400, megapixels: 3.69 },
      { width: 2160, height: 3840, label: '2160p Vertical (4K)', totalPixels: 8294400, megapixels: 8.29 },
    ];
  }

  // Generic fallback for custom ratios
  standardHeights.forEach((targetH) => {
    const targetW = Math.round((targetH * ratioWidth) / ratioHeight);
    const totalPixels = targetW * targetH;
    const megapixels = Number((totalPixels / 1000000).toFixed(2));
    results.push({
      width: targetW,
      height: targetH,
      label: `${targetH}p equivalent`,
      totalPixels,
      megapixels,
    });
  });

  return results;
}

/** Pixels to Megapixels calculation */
export function pixelsToMegapixels(width?: number, height?: number, rawTotalPixels?: number) {
  let totalPixels = 0;

  if (rawTotalPixels && rawTotalPixels > 0) {
    totalPixels = rawTotalPixels;
  } else if (width && height && width > 0 && height > 0) {
    totalPixels = width * height;
  }

  const megapixels = Number((totalPixels / 1000000).toFixed(4));
  return {
    totalPixels,
    megapixels,
    formattedPixels: totalPixels.toLocaleString('en-US'),
  };
}

/** Megapixels to Resolution calculation */
export function megapixelsToResolution(
  mp: number,
  ratioW: number,
  ratioH: number
): { width: number; height: number; actualMP: number; isApproximate: boolean } {
  if (!mp || mp <= 0 || !ratioW || !ratioH || ratioW <= 0 || ratioH <= 0) {
    return { width: 0, height: 0, actualMP: 0, isApproximate: false };
  }

  const totalPixelsTarget = mp * 1000000;
  // width / height = ratioW / ratioH => width = height * (ratioW / ratioH)
  // width * height = totalPixelsTarget => height^2 * (ratioW / ratioH) = totalPixelsTarget
  const height = Math.round(Math.sqrt((totalPixelsTarget * ratioH) / ratioW));
  const width = Math.round((height * ratioW) / ratioH);
  const actualPixels = width * height;
  const actualMP = Number((actualPixels / 1000000).toFixed(2));
  const isApproximate = Math.abs(actualMP - mp) > 0.05;

  return { width, height, actualMP, isApproximate };
}

/** PPI (Pixels Per Inch) calculation */
export function calculatePPI(
  widthPx: number,
  heightPx: number,
  diagonalInches: number
): { ppi: number; totalPixels: number; megapixels: number; ppiCategory: string } {
  if (!widthPx || !heightPx || !diagonalInches || widthPx <= 0 || heightPx <= 0 || diagonalInches <= 0) {
    return { ppi: 0, totalPixels: 0, megapixels: 0, ppiCategory: 'Invalid' };
  }

  const diagonalPixels = Math.sqrt(widthPx * widthPx + heightPx * heightPx);
  const ppi = Math.round(diagonalPixels / diagonalInches);
  const totalPixels = widthPx * heightPx;
  const megapixels = Number((totalPixels / 1000000).toFixed(2));

  let ppiCategory = 'Standard Display';
  if (ppi >= 400) ppiCategory = 'Ultra-High Density (Retina / Mobile Flagship)';
  else if (ppi >= 300) ppiCategory = 'High Density (Retina / Laptop / Tablet)';
  else if (ppi >= 200) ppiCategory = 'Medium-High Density (4K Desktop Monitor)';
  else if (ppi >= 100) ppiCategory = 'Standard Desktop Monitor (Full HD / 1440p)';
  else ppiCategory = 'Low Density / Large TV';

  return { ppi, totalPixels, megapixels, ppiCategory };
}

/** DPI and Print Size calculation */
export function calculateDPIPrint(
  widthPx?: number,
  heightPx?: number,
  printWidth?: number,
  printHeight?: number,
  dpi: number = 300,
  unit: 'in' | 'cm' | 'mm' = 'in'
) {
  if (!dpi || dpi <= 0) dpi = 300;

  let unitMultiplierToInches = 1;
  if (unit === 'cm') unitMultiplierToInches = 1 / 2.54;
  if (unit === 'mm') unitMultiplierToInches = 1 / 25.4;

  let computedWidthPx = widthPx || 0;
  let computedHeightPx = heightPx || 0;
  let computedPrintWInches = 0;
  let computedPrintHInches = 0;

  if (widthPx && heightPx && widthPx > 0 && heightPx > 0) {
    computedPrintWInches = widthPx / dpi;
    computedPrintHInches = heightPx / dpi;
  } else if (printWidth && printHeight && printWidth > 0 && printHeight > 0) {
    computedPrintWInches = printWidth * unitMultiplierToInches;
    computedPrintHInches = printHeight * unitMultiplierToInches;
    computedWidthPx = Math.round(computedPrintWInches * dpi);
    computedHeightPx = Math.round(computedPrintHInches * dpi);
  }

  const displayPrintW = Number((computedPrintWInches / unitMultiplierToInches).toFixed(2));
  const displayPrintH = Number((computedPrintHInches / unitMultiplierToInches).toFixed(2));

  return {
    widthPx: computedWidthPx,
    heightPx: computedHeightPx,
    printWidthInches: Number(computedPrintWInches.toFixed(2)),
    printHeightInches: Number(computedPrintHInches.toFixed(2)),
    displayPrintW,
    displayPrintH,
    unit,
    dpi,
  };
}
