"use client";

import { useState } from "react";
import { EnvelopeIntro } from "@/components/envelope-intro";
import { InvitationPage } from "@/components/invitation-page";

export default function HomePage() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [fading, setFading] = useState(false);

  const handleDone = () => {
    setFading(true);
    setTimeout(() => {
      setShowInvitation(true);
      setFading(false);
    }, 700);
  };

  return (
    <>
      <style>{`
        @keyframes page-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes page-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .intro-fade-out {
          animation: page-fade-out 0.7s ease-out forwards;
        }
        .invitation-fade-in {
          animation: page-fade-in 0.9s ease-out forwards;
        }
      `}</style>

      {!showInvitation && (
        <div className={fading ? "intro-fade-out" : ""}>
          <EnvelopeIntro onDone={handleDone} />
        </div>
      )}

      {showInvitation && (
        <div className="invitation-fade-in">
          <InvitationPage locale="en" />
        </div>
      )}
    </>
  );
}
