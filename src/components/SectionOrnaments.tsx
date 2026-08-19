import React, { useMemo } from 'react';
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

type StarSpec = {
  left: number;
  top: number;
  size: number;
  delay: number;
  dur: number;
};

const STAR_COUNT = 16;

const buildStars = (): StarSpec[] =>
  Array.from({ length: STAR_COUNT }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3.5,
    delay: Math.random() * 3,
    dur: 2.5 + Math.random() * 3,
  }));

const SectionOrnaments: React.FC = () => {
  const theme = useTheme();
  const hasThemeSet = Boolean(images[`../assets/${theme.slug}/top-center.png`]);
  const folder = hasThemeSet ? theme.slug : 'ornaments';
  const src = (name: string) =>
    images[`../assets/${folder}/${name}.png`] ?? images[`../assets/ornaments/${name}.png`];

  const isClustered = folder !== 'ornaments';
  const isMidnight = theme.slug === 'midnight';
  const isRomantic = theme.slug === 'romantic';
  const stars = useMemo<StarSpec[]>(
    () => (isMidnight ? buildStars() : []),
    [isMidnight],
  );

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
        const animClass =
          isMidnight ? 'orn-shimmer'
          : isRomantic && horizontal !== 'center' ? 'orn-sway'
          : undefined;
        return (
          <img
            key={pos}
            src={src(pos)}
            alt=""
            className={animClass}
            style={style}
          />
        );
      })}

      {isMidnight && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {stars.map((s, i) => (
            <span
              key={i}
              className="midnight-star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                ['--star-dur' as `--${string}`]: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SectionOrnaments;
