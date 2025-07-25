import React from 'react';

interface CRTScreenProps {
  children: React.ReactNode;
}

const CRTScreen: React.FC<CRTScreenProps> = ({ children }) => {
  return (
    <div className="crt-monitor">
      <div className="crt-frame">
        <div className="crt-screen">
          <div className="crt-content">
            {children}
          </div>
          <div className="scanlines"></div>
          <div className="screen-flicker"></div>
        </div>
      </div>
    </div>
  );
};

export default CRTScreen;