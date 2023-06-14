import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Jika menggunakan library react-icons

const Spinner = () => {
  return (
    <div className="spinner">
      <FaSpinner className="spin-icon" />
    </div>
  );
};

export default Spinner;
