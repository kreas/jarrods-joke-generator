import { JokeGenerator } from "@/components/joke-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <JokeGenerator />
    </main>
  );
}
