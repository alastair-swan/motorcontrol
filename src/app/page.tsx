"use client"

import Motor from "./MotorUI";

export default function HomePage() {
    //<main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#5c67ad] to-[#a7a7cc] text-white">
    return (
        <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#000000] to-[#000000] text-white">
            <Motor motorNumber={0} />
        </main>
    );
}
