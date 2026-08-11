// The Lumi mascot. A single component reused everywhere Lumi appears
// (top nav brand mark, onboarding, dashboard hero) so the identity
// stays consistent. Its blue/purple/pink gradient is intentionally
// fixed rather than pulling from --color-accent — the rest of the UI
// is light and blue-leaning, but Lumi keeps her own distinct glow no
// matter what theme or accent the interface uses. Pure CSS animation.
const GLOW_COLOR = "rgba(139, 124, 246, 0.55)";
const SHADOW_COLOR = "rgba(109, 140, 250, 0.45)";
const ORB_GRADIENT =
  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, transparent 32%), " +
  "linear-gradient(135deg, #9b7bfa 0%, #6d8cfa 55%, #5fc7d9 100%)";

export default function LumiOrb({ size = 96, sparkles = true, className = "" }) {
  const eyeWidth = Math.max(size * 0.09, 3);
  const eyeHeight = Math.max(size * 0.22, 6);
  const eyeOffset = size * 0.14;

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Ambient glow behind the orb — kept close with blur-xl rather than
          a larger blur, so the glow stays a halo around Lumi instead of
          visually bleeding into whatever sits nearby (e.g. a speech
          bubble above her in the dashboard hero). */}
      <div
        className="absolute inset-0 rounded-full blur-xl animate-pulseGlow"
        style={{ background: `radial-gradient(circle, ${GLOW_COLOR} 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* The orb itself — gently floats up and down */}
      <div className="absolute inset-0 animate-floatY">
        <div
          className="relative w-full h-full rounded-full"
          style={{
            background: ORB_GRADIENT,
            boxShadow: "0 18px 40px -12px rgba(109, 140, 250, 0.5)",
          }}
        >
          <span
            className="absolute rounded-full bg-white"
            style={{
              width: eyeWidth,
              height: eyeHeight,
              top: "42%",
              left: `calc(50% - ${eyeOffset}px)`,
            }}
          />
          <span
            className="absolute rounded-full bg-white"
            style={{
              width: eyeWidth,
              height: eyeHeight,
              top: "42%",
              left: `calc(50% + ${eyeOffset - eyeWidth}px)`,
            }}
          />
        </div>

        {/* Soft shadow beneath the orb, grounds it visually */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full opacity-50 blur-md"
          style={{
            bottom: -size * 0.12,
            width: size * 0.7,
            height: size * 0.14,
            background: SHADOW_COLOR,
          }}
          aria-hidden="true"
        />
      </div>

      {sparkles && (
        <>
          <span
            className="absolute animate-sparkle"
            style={{
              top: "2%",
              right: "-2%",
              fontSize: size * 0.14,
              color: "#9b7bfa",
              animationDelay: "0.6s",
            }}
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="absolute animate-sparkle"
            style={{
              bottom: "12%",
              left: "-6%",
              fontSize: size * 0.1,
              color: "#6d8cfa",
              animationDelay: "1.6s",
            }}
            aria-hidden="true"
          >
            ✦
          </span>
        </>
      )}
    </div>
  );
}
