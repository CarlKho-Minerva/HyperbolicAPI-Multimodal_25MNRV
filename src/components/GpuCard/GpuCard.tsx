import React from 'react';
import './GpuCard.css';

interface GpuData {
  model: string;
  price: number;
  brand: string;
  description?: string;
  imageUrl?: string;
  availability?: string;
}

const GpuCard: React.FC<{ gpu: GpuData }> = ({ gpu }) => {
  return (
    <div className="gpu-card">
      {gpu.imageUrl && (
        <div className="gpu-image">
          <img src={gpu.imageUrl} alt={gpu.model} />
        </div>
      )}
      <div className="gpu-info">
        <h4>{gpu.brand} {gpu.model}</h4>
        <p className="gpu-price">${gpu.price.toLocaleString()}</p>
        {gpu.description && <p className="gpu-description">{gpu.description}</p>}
        {gpu.availability && (
          <p className="gpu-availability">Status: {gpu.availability}</p>
        )}
      </div>
    </div>
  );
};

export default GpuCard;
