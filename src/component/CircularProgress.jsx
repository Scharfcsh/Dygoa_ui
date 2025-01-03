
import React from 'react';

const CircularProgress = ({
    percentage,
    size = 160,
    strokeWidth = 20,
    primaryColor = 'chartreuse',
    secondaryColor = 'darkgreen',
    backgroundColor = 'palegreen',
    textColor = 'black',
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <div
        className="relative mx-4 z-50"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from={circumference}
              to={offset}
              dur="1s"
              fill="freeze"
            />
          </circle>
        </svg>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold bg-green-400/20 w-10 h-10 rounded-full "
          style={{
            fontSize: `${size / 5}px`,
            color: textColor,
          }}
        >
        
        </div>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute top-0 left-0 transform -rotate-90 pointer-events-none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  };

  export default CircularProgress;