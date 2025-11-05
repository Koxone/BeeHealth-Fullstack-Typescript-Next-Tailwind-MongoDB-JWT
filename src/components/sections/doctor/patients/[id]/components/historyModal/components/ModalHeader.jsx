'use client';

/* header */
export default function ModalHeader({ title, subtitle, onClose, icons }) {
  const { X, FileText } = icons;

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-6">
      {/* glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      {/* bar */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-sm text-blue-100">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-xl bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30 active:scale-95"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
