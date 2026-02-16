import { Suspense } from "react";
import CoinsContent from "./Coincontent";


export const dynamic = "force-dynamic";

export default function CoinsPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <CoinsContent />
        </Suspense>
    );
}
