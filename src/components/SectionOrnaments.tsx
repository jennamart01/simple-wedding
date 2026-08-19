import React from 'react';
import { useTheme } from '../context/ThemeContext';

const images = import.meta.glob(
  '../assets/*/{top-center,top-left,top-right,bottom-center,bottom-left,bottom-right}.png',
  { eager: true, import: 'default' },
) as Record<string, string>;

const ORNAMENT_POSITIONS = [
  'top-center',
  'top-left',
  'top-right',
  'bottom-center',
  'bottom-left',
  'bottom-right',
] as const;

const ornamentStyle: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 0,
};

const SectionOrnaments: React.FC = () => {
  const theme = useTheme();
  const hasThemeSet = Boolean(images[`../assets/${theme.slug}/top-center.png`]);
  const folder = hasThemeSet ? theme.slug : 'ornaments';
  const src = (name: string) =>
    images[`../assets/${folder}/${name}.png`] ?? images[`../assets/ornaments/${name}.png`];

  const isClustered = folder !== 'ornaments';

  const centerSize = isClustered ? '110px' : '200px';
  const cornerSize = isClustered ? '72px' : '68px';

  return (
    <>
      {ORNAMENT_POSITIONS.map((pos) => {
        const [vertical, horizontal] = pos.split('-') as ['top' | 'bottom', 'center' | 'left' | 'right'];
        const style: React.CSSProperties = { ...ornamentStyle };
        style[vertical] = '30px';

        if (horizontal === 'center') {
          style.left = '50%';
          style.transform = 'translateX(-50%)';
          style.maxWidth = centerSize;
        } else if (horizontal === 'left') {
          style.left = '12px';
          style.width = cornerSize;
        } else {
          style.right = '12px';
          style.width = cornerSize;
        }

        style.opacity = 1;
        return <img key={pos} src={src(pos)} alt="" style={style} />;
      })}
    </>
  );
};

export default SectionOrnaments;
