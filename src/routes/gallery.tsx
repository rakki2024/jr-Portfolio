import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/Gallery";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <a
          href="/"
          className="mb-10 inline-flex items-center rounded-full border border-border px-5 py-2 transition hover:border-accent hover:text-accent"
        >
          ← Back to Portfolio
        </a>

        <Gallery />
      </div>
    </main>
  );
}
