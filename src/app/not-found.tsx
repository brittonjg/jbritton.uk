import TextLink from "@/components/ui/TextLink";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-display text-display text-text-primary">404</h1>
        <p className="mt-4 text-body-large text-text-secondary">
          Page not found.
        </p>
        <TextLink href="/" arrow="back" className="mt-6">
          Back home
        </TextLink>
      </section>
    </Container>
  );
}
