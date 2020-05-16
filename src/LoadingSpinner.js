import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

import './LoadingSpinner.css';
const LoadingSpinner = ({ loading, size }) => {
  const style = {
    fontSize: size,
  };

  const containerStyle = {
    opacity: loading ? 1 : 0,
  };
  // since positioning is absolute, we can only set 'display' when we want to hide it
  if (!loading) {
    containerStyle.display = 'none';
  }
  return (
    <div style={containerStyle} className="spinner-container">
      <FiLoader style={style} className="load-spinner" />
      <div className="load-text">Loading</div>
    </div>
  );
};

export default LoadingSpinner;
