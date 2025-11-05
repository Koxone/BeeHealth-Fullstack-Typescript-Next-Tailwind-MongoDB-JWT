'use client';

/* overlay */
export default function ModalOverlay({ onClick }) {
  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 h-screen bg-black/60 backdrop-blur-sm"
      onClick={onClick}
    />
  );
}
