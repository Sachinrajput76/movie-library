import axios from "axios";
import SearchAndDisplayMovies from "@/components/SearchAndDisplayMovies";
import { buildSearchUrl } from "@/utils/api";
import { Film } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: { find?: string };
}) {
  const { find } = searchParams || {};
  const searchValue = find?.trim() || "Avengers";


  let data = null;

  try {
    const response = await axios.get(buildSearchUrl(searchValue));
    data = response.data;
  } catch (error: any) {
    console.error("Error fetching initial data:", {
      message: error?.message,
      status: error?.response?.status,
      url: buildSearchUrl(searchValue),
      data: error?.response?.data,
    });

    data = {
      Response: "False",
      Search: [],
      totalResults: "0",
      Error: "Failed to load data. Please try again later.",
    };
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-center">
        <h1 className="flex items-center gap-2 text-xl font-bold mb-4">
          <Film />
          <span>Movies</span>
        </h1>
      </div>

      <SearchAndDisplayMovies
        initialData={data}
        initialSearchValue={searchValue}
      />
    </main>
  );
}
