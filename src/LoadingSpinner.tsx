import React from 'react';
import { FiLoader } from 'react-icons/fi';

import './LoadingSpinner.css';

interface AppProps {
  loading: Boolean;
  size: Number;
}
const LoadingSpinner = ({ loading, size }: AppProps) => {
  if (!loading) {
    return null;
  }
  const style = {
    fontSize: size,
  } as React.CSSProperties;

  const containerStyle = {
    opacity: loading ? 1 : 0,
  };
  return (
    <div style={containerStyle} className="spinner-container">
      <FiLoader style={style} className="load-spinner" />
      <div className="load-text">Loading</div>
    </div>
  );
};

export default LoadingSpinner;
