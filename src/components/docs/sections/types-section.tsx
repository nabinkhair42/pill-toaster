import { TypesDemo } from "@/components/docs/types-demo";

export function TypesSection() {
  return (
    <section>
      <h2 id="types">Types</h2>
      <p>
        Customize the type of toast you want to render, and pass an options
        object as the second argument. Action and promise flows live here too.
      </p>
      <TypesDemo />
    </section>
  );
}
