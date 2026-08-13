import React from 'react';
import topCenter from '../assets/ornaments/top-center.png';
import topLeft from '../assets/ornaments/top-left.png';
import topRight from '../assets/ornaments/top-right.png';
import bottomCenter from '../assets/ornaments/bottom-center.png';
import bottomLeft from '../assets/ornaments/bottom-left.png';
import bottomRight from '../assets/ornaments/bottom-right.png';

const ornamentStyle: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 0,
};

const SectionOrnaments: React.FC = () => (
  <>
    <img src={topCenter} alt="" style={{ ...ornamentStyle, top: '30px', left: '50%', transform: 'translateX(-50%)', maxWidth: '200px', opacity: 1 }} />
    <img src={bottomCenter} alt="" style={{ ...ornamentStyle, bottom: '30px', left: '50%', transform: 'translateX(-50%)', maxWidth: '200px', opacity: 1 }} />
    <img src={topLeft} alt="" style={{ ...ornamentStyle, top: '12px', left: '12px', width: '68px', opacity: 1 }} />
    <img src={topRight} alt="" style={{ ...ornamentStyle, top: '12px', right: '12px', width: '68px', opacity: 1 }} />
    <img src={bottomLeft} alt="" style={{ ...ornamentStyle, bottom: '12px', left: '12px', width: '68px', opacity: 1 }} />
    <img src={bottomRight} alt="" style={{ ...ornamentStyle, bottom: '12px', right: '12px', width: '68px', opacity: 1 }} />
  </>
);

export default SectionOrnaments;
