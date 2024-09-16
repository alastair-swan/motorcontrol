import Link from "next/link";
import { Motor } from "~/app/MotorUI"
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#5c67ad] to-[#a7a7cc] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Motor Controller
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
            <h3 className="text-2xl font-bold">Motor 0</h3>
            <div className="text-lg">
              <Motor motorNumber={0}/>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Motor 1</h3>
            <div className="text-lg">
              <Motor motorNumber={1}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
