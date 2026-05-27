import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#05060a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            marginTop: -350,
            marginLeft: -350,
            display: 'flex',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: 120,
            height: 120,
            background: '#05060a',
            border: '2px solid rgba(34,211,238,0.3)',
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 44,
            boxShadow: '0 0 60px rgba(59,130,246,0.2)',
          }}
        >
          <span
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: '#22d3ee',
              fontFamily: 'monospace',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            K
          </span>
        </div>

        {/* KETA.COMP */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: -2,
            marginBottom: 24,
            fontFamily: 'monospace',
          }}
        >
          <span style={{ color: '#f8fafc', display: 'flex' }}>KETA</span>
          <span style={{ color: '#22d3ee', display: 'flex' }}>.</span>
          <span style={{ color: '#f8fafc', display: 'flex' }}>COMP</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: '#475569',
            letterSpacing: 7,
            textTransform: 'uppercase',
            display: 'flex',
            fontFamily: 'sans-serif',
          }}
        >
          Engineering Tomorrow
        </div>
      </div>
    ),
    { ...size },
  );
}
