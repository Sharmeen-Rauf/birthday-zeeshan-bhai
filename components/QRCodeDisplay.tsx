'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Get current URL
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Scan to Share
      </h3>
      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-lg qr-code">
          <QRCodeSVG
            value={url}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#1a202c"
            bgColor="#ffffff"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-4 text-center">
        Print this QR code on a card or sticky note
      </p>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            const svg = document.querySelector('.qr-code svg') as SVGElement;
            if (svg) {
              const svgData = new XMLSerializer().serializeToString(svg);
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = 'birthday-qr-code.png';
                downloadLink.href = pngFile;
                downloadLink.click();
              };
              img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
            }
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}
