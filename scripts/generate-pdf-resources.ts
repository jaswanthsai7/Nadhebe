import fs from 'node:fs';
import path from 'node:path';
import { jsPDF } from 'jspdf';

const resourcesDir = path.join(process.cwd(), 'public', 'resources');

function generatePdfFromMarkdown(mdFilePath: string) {
  const mdContent = fs.readFileSync(mdFilePath, 'utf-8');
  const pdfFilePath = mdFilePath.replace(/\.md$/, '.pdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const maxLineWidth = pageWidth - margin * 2;
  let y = margin + 20;

  // Header Banner
  doc.setFillColor(24, 24, 27); // Dark gray / black surface
  doc.rect(0, 0, pageWidth, 50, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NADHEBE TECHNICAL RESOURCE LIBRARY', margin, 32);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('https://nadhebe.com', pageWidth - margin - 100, 32);

  y = 80;

  const lines = mdContent.split('\n');

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Check page space
    if (y > pageHeight - margin - 30) {
      doc.addPage();
      y = margin + 20;
    }

    if (trimmed.startsWith('# ')) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // slate 900
      const titleText = trimmed.replace(/^#\s+/, '');
      const wrapped = doc.splitTextToSize(titleText, maxLineWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 20 + 10;
    } else if (trimmed.startsWith('## ')) {
      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(30, 41, 59);
      const titleText = trimmed.replace(/^##\s+/, '');
      const wrapped = doc.splitTextToSize(titleText, maxLineWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 16 + 6;
    } else if (trimmed.startsWith('### ')) {
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(51, 65, 85);
      const titleText = trimmed.replace(/^###\s+/, '');
      const wrapped = doc.splitTextToSize(titleText, maxLineWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 14 + 4;
    } else if (trimmed.startsWith('---')) {
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(1);
      doc.line(margin, y, pageWidth - margin, y);
      y += 14;
    } else if (trimmed.startsWith('```')) {
      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
    } else if (trimmed.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const wrapped = doc.splitTextToSize(trimmed, maxLineWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 12 + 4;
    } else {
      y += 6;
    }
  });

  const pdfBuffer = doc.output('arraybuffer');
  fs.writeFileSync(pdfFilePath, Buffer.from(pdfBuffer));
  console.log(`Generated PDF: ${pdfFilePath}`);
}

const mdFiles = fs.readdirSync(resourcesDir).filter((f) => f.endsWith('.md'));
mdFiles.forEach((file) => {
  generatePdfFromMarkdown(path.join(resourcesDir, file));
});
