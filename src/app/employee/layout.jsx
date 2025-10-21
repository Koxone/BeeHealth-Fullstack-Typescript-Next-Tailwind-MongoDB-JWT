'use client';

import Header from '../sections/global/Header';
import Sidebar from '../sections/global/Sidebar';

export default function EmployeeLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header role="employee" />
      <div className="flex">
        <Sidebar role="employee" />
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
