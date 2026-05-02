import { useEffect, useState } from "react";

// type UseFetchResponse<T> = {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// };

function useFetch(url: string) {
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        console.error(err.message || "Erro inesperado");
      }
    }

    fetchData();
  }, [url]);

  // Retorn um objeto com os dados
  return { data };
}

export default useFetch;

// const [data, setData] = useState<T | null>(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//   async function fetchData() {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`Erro: ${response.status}`);
//       }

//       const json = await response.json();
//       setData(json);
//     } catch (err: any) {
//       setError(err.message || "Erro inesperado");
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchData();
// }, [url]);

// return { data, loading, error };
// }
