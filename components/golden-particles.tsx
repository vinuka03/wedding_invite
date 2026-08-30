const particles = [
  // Small particles
  { left: "3%", top: "15%", size: 4, delay: "-2s", duration: "13s", type: "particle" },
  { left: "8%", top: "68%", size: 3, delay: "-8s", duration: "16s", type: "particle" },
  { left: "13%", top: "42%", size: 5, delay: "-5s", duration: "12s", type: "particle" },
  { left: "18%", top: "88%", size: 3, delay: "-11s", duration: "15s", type: "particle" },
  { left: "23%", top: "22%", size: 4, delay: "-7s", duration: "14s", type: "particle" },
  { left: "28%", top: "57%", size: 3, delay: "-3s", duration: "11s", type: "particle" },
  { left: "34%", top: "10%", size: 5, delay: "-9s", duration: "15s", type: "particle" },
  { left: "39%", top: "76%", size: 4, delay: "-4s", duration: "13s", type: "particle" },
  { left: "45%", top: "36%", size: 3, delay: "-12s", duration: "16s", type: "particle" },
  { left: "51%", top: "82%", size: 5, delay: "-6s", duration: "12s", type: "particle" },
  { left: "56%", top: "14%", size: 3, delay: "-10s", duration: "14s", type: "particle" },
  { left: "61%", top: "63%", size: 4, delay: "-1s", duration: "15s", type: "particle" },
  { left: "67%", top: "30%", size: 5, delay: "-8s", duration: "13s", type: "particle" },
  { left: "72%", top: "91%", size: 3, delay: "-5s", duration: "16s", type: "particle" },
  { left: "77%", top: "51%", size: 4, delay: "-13s", duration: "12s", type: "particle" },
  { left: "83%", top: "18%", size: 3, delay: "-4s", duration: "15s", type: "particle" },
  { left: "88%", top: "73%", size: 5, delay: "-9s", duration: "14s", type: "particle" },
  { left: "94%", top: "38%", size: 4, delay: "-2s", duration: "13s", type: "particle" },

  // Bubbles
  { left: "6%", top: "92%", size: 18, delay: "-4s", duration: "19s", type: "bubble" },
  { left: "17%", top: "78%", size: 10, delay: "-12s", duration: "23s", type: "bubble" },
  { left: "29%", top: "96%", size: 24, delay: "-8s", duration: "26s", type: "bubble" },
  { left: "42%", top: "89%", size: 14, delay: "-17s", duration: "21s", type: "bubble" },
  { left: "54%", top: "97%", size: 20, delay: "-6s", duration: "25s", type: "bubble" },
  { left: "64%", top: "84%", size: 11, delay: "-14s", duration: "20s", type: "bubble" },
  { left: "74%", top: "95%", size: 26, delay: "-10s", duration: "28s", type: "bubble" },
  { left: "86%", top: "87%", size: 16, delay: "-19s", duration: "22s", type: "bubble" },
  { left: "96%", top: "94%", size: 12, delay: "-3s", duration: "24s", type: "bubble" },
] as const;

export function GoldenParticles() {
  return (
      <div
          className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
          aria-hidden="true"
      >
        {particles.map((particle, index) => (
            <span
                key={index}
                className={
                  particle.type === "bubble"
                      ? "gold-bubble"
                      : "gold-particle"
                }
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