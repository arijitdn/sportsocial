import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      <Image
        src="/SportSocial.png"
        width={500}
        height={500}
        alt="SportSocial"
      />
      <h1 className="font-bold text-xl">Coming Soon...</h1>
    </main>
  );
}
