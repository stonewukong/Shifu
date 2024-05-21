"use client";

import Navbar from "../../components/space/Navbar";

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-end">
        {children}
        <Navbar />
      </div>
    </>
  );
}
