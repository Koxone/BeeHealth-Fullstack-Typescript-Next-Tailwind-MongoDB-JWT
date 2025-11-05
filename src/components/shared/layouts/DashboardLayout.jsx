import React from 'react';

export default function DashboardLayout({ children }) {
  return <div className="h-full space-y-4 overflow-y-auto md:space-y-6">{children}</div>;
}
