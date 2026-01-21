import ClientView from "./components/ClientView";
import { getDestinations } from "./lib/data";

export const metadata = {
  title: "Lombok Tourist Destination Search",
  description: "Temukan permata tersembunyi Indonesia di Lombok",
};

export default async function Page() {
  const data = await getDestinations();

  return (
    <main>
      <ClientView initialData={data} />
    </main>
  );
}