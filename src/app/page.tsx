import { listFish } from "@/lib/db";
import Aquarium from "@/components/Aquarium";

export default function Page() {
  const fish = listFish();
  return (
    <main>
      <Aquarium fish={fish} />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 20,
          fontSize: 14,
          opacity: 0.75,
          letterSpacing: 0.4,
        }}
      >
        vibe aquarium · {fish.length} fish
      </div>
    </main>
  );
}
