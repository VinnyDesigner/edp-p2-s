import React from 'react';
import { motion } from 'framer-motion';

interface StationNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: 'gold' | 'cyan';
}

interface AbuDhabiMapVisualProps {
  stations?: StationNode[];
  compact?: boolean;
  onSelectStation?: (station: StationNode) => void;
}

const DEFAULT_STATIONS: StationNode[] = [
  { id: 'sila', label: 'Al Sila Coast', x: 14, y: 42, color: 'cyan' },
  { id: 'ruwais', label: 'Al Dhafra', x: 27, y: 38, color: 'gold' },
  { id: 'butinah', label: 'Bu Tinah Biosphere', x: 41, y: 30, color: 'cyan' },
  { id: 'liwa', label: 'Liwa Oasis', x: 46, y: 63, color: 'gold' },
  { id: 'abudhabi', label: 'Abu Dhabi Island', x: 59, y: 29, color: 'gold' },
  { id: 'wathba', label: 'Al Wathba', x: 65, y: 38, color: 'cyan' },
  { id: 'alain', label: 'Al Ain Oasis', x: 84, y: 43, color: 'gold' },
];

export const AbuDhabiMapVisual: React.FC<AbuDhabiMapVisualProps> = ({
  stations = DEFAULT_STATIONS,
  compact = false,
  onSelectStation,
}) => {
  if (!compact) {
    return (
      <div className="relative w-full flex items-center justify-center select-none py-1">
        {/* Ambient holographic cyan & golden floor luminescence beneath map */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-2 -translate-x-1/2 w-[92%] h-[68px] rounded-[100%] blur-[18px] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 217, 232, 0.42) 0%, rgba(255, 199, 94, 0.24) 48%, transparent 78%)',
          }}
        />

        {/* Seamlessly Masked 3D Isometric Holographic Abu Dhabi Map Artwork */}
        <div
          className="relative w-full max-w-[410px] aspect-[16/10] flex items-center justify-center cursor-pointer group"
          onClick={() => onSelectStation?.(stations[4] ?? stations[0])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectStation?.(stations[4] ?? stations[0]);
            }
          }}
          aria-label="Explore interactive Abu Dhabi environmental dataset map"
        >
          <img
            src="/images/abu-dhabi-holo-map.png"
            alt="Illuminated 3D holographic Abu Dhabi Emirate geographical map"
            loading="lazy"
            className="w-full h-full object-contain scale-[1.12] drop-shadow-[0_0_22px_rgba(0,217,232,0.28)] transition-transform duration-700 group-hover:scale-[1.16]"
          />

          {/* Subtle interactive glowing telemetry pulses over key Abu Dhabi vertices */}
          {[
            { id: 'holo-west', x: '29%', y: '56%', gold: false, label: 'Al Dhafra Coast' },
            { id: 'holo-liwa', x: '48%', y: '60%', gold: true, label: 'Liwa Corridor' },
            { id: 'holo-ad', x: '61%', y: '47%', gold: true, label: 'Abu Dhabi Coastline' },
            { id: 'holo-east', x: '77%', y: '41%', gold: false, label: 'Al Ain Oasis' },
          ].map((node, idx) => (
            <span
              key={node.id}
              title={node.label}
              aria-hidden="true"
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <motion.span
                className={`block w-3 h-3 rounded-full border ${
                  node.gold ? 'border-[#FFC75E]/70' : 'border-[#80F5F5]/70'
                }`}
                animate={{ scale: [0.7, 1.45, 0.7], opacity: [0.75, 0.12, 0.75] }}
                transition={{ duration: 2.8, delay: idx * 0.45, repeat: Infinity }}
              />
              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                  node.gold
                    ? 'bg-[#FFE599] shadow-[0_0_6px_#FFC75E]'
                    : 'bg-[#C4FFFF] shadow-[0_0_6px_#00D9E8]'
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Concentric Circular Holographic Platform beneath the map */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[100%] border border-[#00D9E8]/55 shadow-[0_0_32px_rgba(0,217,232,0.38)] ${
          compact ? 'bottom-1 w-[82%] h-[28px]' : 'bottom-1 sm:bottom-2 w-[88%] h-[58px]'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 217, 232, 0.25) 0%, rgba(255, 199, 94, 0.14) 52%, transparent 78%)',
        }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[100%] border border-[#FFC75E]/40 ${
          compact ? 'bottom-2 w-[66%] h-[20px]' : 'bottom-3 sm:bottom-4 w-[72%] h-[40px]'
        }`}
      />

      {/* Geographically Accurate Abu Dhabi Emirate SVG Silhouette */}
      <svg
        viewBox="0 0 360 210"
        className="relative z-10 w-full h-auto max-h-[250px] overflow-visible"
        role="img"
        aria-label="Illuminated Abu Dhabi Emirate geographical map"
      >
        <defs>
          <linearGradient id="adMapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9E8" stopOpacity="0.48" />
            <stop offset="48%" stopColor="#27C9D0" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#004C59" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id="adMapStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#80F5F5" />
            <stop offset="50%" stopColor="#00D9E8" />
            <stop offset="100%" stopColor="#FFC75E" />
          </linearGradient>
          <pattern id="adHexDots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.85" fill="#80F5F5" fillOpacity="0.48" />
          </pattern>
          <filter id="adGlow">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle Drop Reflection Glow */}
        <ellipse cx="180" cy="176" rx="126" ry="18" fill="rgba(0, 217, 232, 0.2)" filter="url(#adGlow)" />

        {/* Rising Holographic Skyline & Digital Telemetry Bars behind Map (showcase mode) */}
        {!compact && (
          <g aria-hidden="true" opacity="0.88">
            {/* Soft cyan spire glow bars */}
            {[
              { x: 64, y1: 112, y2: 68, gold: false },
              { x: 74, y1: 116, y2: 52, gold: true },
              { x: 84, y1: 114, y2: 76, gold: false },
              { x: 96, y1: 118, y2: 44, gold: false },
              { x: 108, y1: 112, y2: 64, gold: false },
              { x: 122, y1: 116, y2: 56, gold: true },
              { x: 136, y1: 114, y2: 74, gold: false },
              { x: 204, y1: 118, y2: 66, gold: true },
              { x: 222, y1: 114, y2: 78, gold: false },
            ].map((bar, i) => (
              <g key={i}>
                <line
                  x1={bar.x}
                  y1={bar.y1}
                  x2={bar.x}
                  y2={bar.y2}
                  stroke={bar.gold ? '#FFC75E' : '#80F5F5'}
                  strokeWidth="1.4"
                  strokeOpacity="0.65"
                />
                <circle
                  cx={bar.x}
                  cy={bar.y2}
                  r="1.3"
                  fill={bar.gold ? '#FFE599' : '#B6FFFF'}
                />
              </g>
            ))}
          </g>
        )}

        {/* Accurate Abu Dhabi Mainland Boundary Silhouette */}
        <path
          d="M 28 84
             C 34 78, 42 74, 52 76
             C 62 79, 68 88, 79 86
             C 89 84, 96 72, 108 72
             C 122 72, 130 82, 146 79
             C 162 76, 174 68, 190 64
             C 202 61, 212 52, 226 48
             C 238 44, 248 34, 260 32
             L 273 48
             L 286 58
             C 295 66, 312 68, 322 76
             C 328 84, 322 98, 316 108
             C 308 118, 294 128, 286 144
             C 278 158, 276 168, 264 166
             C 246 162, 218 152, 184 148
             C 148 144, 114 142, 86 138
             C 62 135, 42 124, 30 110
             C 22 99, 22 90, 28 84 Z"
          fill="url(#adMapFill)"
          stroke="url(#adMapStroke)"
          strokeWidth="1.9"
          filter="url(#adGlow)"
        />

        {/* Digital dot matrix overlay inside Abu Dhabi Emirate */}
        <path
          d="M 28 84 C 34 78, 42 74, 52 76 C 62 79, 68 88, 79 86 C 89 84, 96 72, 108 72 C 122 72, 130 82, 146 79 C 162 76, 174 68, 190 64 C 202 61, 212 52, 226 48 C 238 44, 248 34, 260 32 L 273 48 L 286 58 C 295 66, 312 68, 322 76 C 328 84, 322 98, 316 108 C 308 118, 294 128, 286 144 C 278 158, 276 168, 264 166 C 246 162, 218 152, 184 148 C 148 144, 114 142, 86 138 C 62 135, 42 124, 30 110 C 22 99, 22 90, 28 84 Z"
          fill="url(#adHexDots)"
        />

        {/* Key Abu Dhabi Offshore Islands (Dalma, Sir Bani Yas, Marawah, Abu Dhabi / Yas) */}
        <g fill="rgba(0, 217, 232, 0.55)" stroke="#80F5F5" strokeWidth="1.1">
          <ellipse cx="78" cy="64" rx="5.5" ry="3.2" />
          <ellipse cx="96" cy="59" rx="4.2" ry="2.6" />
          <ellipse cx="144" cy="61" rx="7" ry="2.8" />
          <ellipse cx="164" cy="57" rx="5" ry="2.5" />
          <path d="M 210 50 Q 220 44 228 49 Q 220 55 210 50 Z" />
          <path d="M 232 41 Q 241 35 247 41 Q 238 46 232 41 Z" />
        </g>

        {/* Internal regional network lines */}
        <g stroke="#80F5F5" strokeOpacity="0.28" strokeWidth="0.8" strokeDasharray="2 3">
          <path d="M 96 98 L 214 62 L 304 92" />
          <path d="M 164 126 L 214 62 L 238 118" />
          <path d="M 60 96 L 164 126 L 266 146" />
        </g>

        {/* Glowing Environmental Monitoring Locations & Vertical Data Beams */}
        {stations.map((st, idx) => {
          const cx = (st.x / 100) * 360;
          const cy = (st.y / 100) * 210;
          const isGold = st.color === 'gold';
          return (
            <g
              key={st.id}
              onClick={() => onSelectStation?.(st)}
              className={onSelectStation ? 'cursor-pointer' : ''}
            >
              <title>{st.label}</title>
              {/* Vertical holographic beam */}
              <line
                x1={cx}
                y1={cy}
                x2={cx}
                y2={cy - (compact ? 14 : 22)}
                stroke={isGold ? '#FFC75E' : '#00D9E8'}
                strokeWidth="1.2"
                strokeOpacity="0.7"
              />
              {/* Pulsing ring */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={compact ? 5.5 : 7}
                fill="none"
                stroke={isGold ? '#FFC75E' : '#00D9E8'}
                strokeWidth="1"
                initial={{ opacity: 0.8, scale: 0.7 }}
                animate={{ opacity: [0.85, 0.2, 0.85], scale: [0.85, 1.35, 0.85] }}
                transition={{ duration: 2.8, delay: idx * 0.35, repeat: Infinity }}
              />
              {/* Bright Core Node */}
              <circle
                cx={cx}
                cy={cy}
                r={compact ? 2.6 : 3.2}
                fill={isGold ? '#FFE08A' : '#80F5F5'}
                filter="url(#adGlow)"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

