import axios from "axios";
import MovieSearchClient from "@/components/MovieSearchClient";
import { buildSearchUrl } from "@/utils/api";

export default async function Home() {
  const defaultTerm = "Avengers"; // Show some default movies (not empty string)
  let data = null;

  try {
    const response = await axios.get(buildSearchUrl(defaultTerm));
    data = response.data;
  } catch (error) {
    console.error("Error fetching initial data:", error);
    data = {};
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Library</h1>
      <MovieSearchClient initialData={data} initialTerm={defaultTerm} />
    </main>
  );
}
