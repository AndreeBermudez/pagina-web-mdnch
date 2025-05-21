
import RegidoresCards from "./RegidoresCards";
import { regidores } from "./regidores";

export default function ConsejoMunicipalSection() {
  return (
    <section className="container mx-auto py-12">
      <RegidoresCards regidores={regidores} />
    </section>
  );
}
