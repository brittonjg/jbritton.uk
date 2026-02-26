import Link from "next/link";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-display text-6xl text-text-primary">404</h1>
        <p className="mt-4 text-lg text-text-secondary">
          Page not found.
        </p>
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-accent hover:text-accent-hover"
        >
          &larr; Back home
        </Link>
      </section>
    </Container>
  );
}
