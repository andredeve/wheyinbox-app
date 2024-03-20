import React from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator({ value }) {
  return (
    <div>
      <QRCode value={value} />
    </div>
  );
}

export default QRCodeGenerator;
