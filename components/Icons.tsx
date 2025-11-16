
import React from 'react';

// A magical swirling reset symbol, clean and evocative.
export const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.95 19.95A9 9 0 014.05 4.05m0 15.9A9 9 0 0119.95 4.05" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-5V5m-11 4H0v5h5" />
  </svg>
);

// A classic D6 die icon, more solid than the original wireframe.
export const DiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-19.5v19.5" />
  </svg>
);

// Unused in UI, but updated for theme consistency. Reverted to original for better recognition.
export const LifeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

// A glowing mana crystal icon.
export const ManaThresholdIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L4.5 8.25l7.5 13.5 7.5-13.5L12 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25h15M12 21.75V8.25" />
    </svg>
);

// A more stylized skull icon.
export const SkullIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5A9.75 9.75 0 004.137 12c0 3.93 2.343 7.261 5.663 8.712a1.5 1.5 0 001.2-.124 1.5 1.5 0 00.8-1.288V18a.75.75 0 01.75-.75h.9a.75.75 0 01.75.75v1.3c0 .659.351 1.23.88 1.464 3.32.951 5.92-2.19 5.92-5.764A9.75 9.75 0 0012 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm4.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

// A magical feather quill for editing.
export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

// Icon for swapping layout
export const SwapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
);

// An icon for the Sorcery Codex rule lookup feature.
export const CodexIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

// The following elemental icons use the classic alchemical symbols for a timeless, magical feel.
export const EarthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="16" {...props}>
    <polygon points="25,25 225,25 125,225" strokeLinejoin="round" />
    <line x1="25" y1="90" x2="225" y2="90" strokeLinecap="round"/>
  </svg>
);

export const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="16" {...props}>
    <polygon points="125,25 225,225 25,225" strokeLinejoin="round" />
  </svg>
);

export const WaterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="16" {...props}>
    <polygon points="25,25 225,25 125,225" strokeLinejoin="round" />
  </svg>
);

export const AirIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="16" {...props}>
    <polygon points="125,25 225,225 25,225" strokeLinejoin="round" />
    <line x1="25" y1="160" x2="225" y2="160" strokeLinecap="round"/>
  </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);