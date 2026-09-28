import { Container } from "./Container";

export function StubPage({ title, description }: { title: string; description?: string }) {
  return (
    <Container className="pb-24">
      <h1 className="header-1">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-base text-middle-grey">{description}</p>}
    </Container>
  );
}
