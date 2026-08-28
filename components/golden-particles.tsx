const particles = [
  { left: "5%", top: "12%", size: 5, delay: "-1s", duration: "12s" },
  { left: "15%", top: "72%", size: 3, delay: "-6s", duration: "15s" },
  { left: "27%", top: "34%", size: 4, delay: "-9s", duration: "11s" },
  { left: "38%", top: "86%", size: 3, delay: "-3s", duration: "14s" },
  { left: "48%", top: "18%", size: 4, delay: "-7s", duration: "13s" },
  { left: "58%", top: "58%", size: 3, delay: "-11s", duration: "16s" },
  { left: "67%", top: "27%", size: 5, delay: "-4s", duration: "12s" },
  { left: "78%", top: "78%", size: 4, delay: "-8s", duration: "15s" },
  { left: "89%", top: "42%", size: 3, delay: "-2s", duration: "13s" },
  { left: "94%", top: "91%", size: 4, delay: "-10s", duration: "14s" },
] as const;

export function GoldenParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="gold-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}
