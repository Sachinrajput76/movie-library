import axios from "axios";
import MovieSearchClient from "@/components/MovieSearchClient";
import { buildSearchUrl } from "@/utils/api";
import { Film } from "lucide-react";

export default async function Home() {
  const defaultTerm = "Avengers";
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
      <div className="flex justify-center">
        <h1 className="flex items-center gap-2 text-xl font-bold mb-4">
          <Film />
          <span>Movies</span>
        </h1>
      </div>

      <MovieSearchClient initialData={data} initialTerm={defaultTerm} />
    </main>

  );
}
