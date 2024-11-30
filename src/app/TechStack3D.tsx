'use client';

import Spline from '@splinetool/react-spline';

export default function TechStack3D() {
  return (
    <div className="w-full h-full">
      <Spline
        scene="https://prod.spline.design/HgwResLpHaqiVIHR/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
