"use client";
import { useState } from "react";
import Image from "next/image";

export default function BedkomContent() {
  const [page, setPage] = useState<"om" | "kontakt">("om");

  return (
    <div className="align-start">
      {page === "om" && (
        <div className="flex flex-col items-center gap-2">
          <Image src="/icons/folder.png" width={48} height={48} alt="" unoptimized />
          <p className="text-sm text-center">Bedriftskomiteen jobber med bedriftskontakt.</p>
        </div>
      )}
      {page === "kontakt" && <p className="text-sm">bedkom@node.no</p>}

      {/* <div className="flex gap-1 mt-2">
        <button onClick={() => setPage("om")}>Om</button>
        <button onClick={() => setPage("kontakt")}>Kontakt</button>
      </div> */}
    </div>
  );
}