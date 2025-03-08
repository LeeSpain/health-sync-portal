
import React, { useRef, useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';

interface ResponsiveChartContainerProps {
  children: React.ReactNode;
  height?: number;
  aspect?: number;
}

const ResponsiveChartContainer: React.FC<ResponsiveChartContainerProps> = ({ 
  children,
  height = 300,
  aspect = 2 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState(height);

  useEffect(() => {
    if (containerRef.current) {
      // Set minimum height to ensure charts render properly
      setMinHeight(height);
    }
  }, [height]);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: `${minHeight}px` }}>
      <ResponsiveContainer width="100%" height={minHeight} aspect={aspect}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ResponsiveChartContainer;
