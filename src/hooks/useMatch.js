import fetcher from "@/lib/fetcher"
import useSWR from "swr"

function useMatch (id) {
  const { data, error, isLoading } = useSWR(`/api/matches/${id}`, fetcher)
 
  return {
    match: data,
    isLoading,
    error: error
  }
}

export default useMatch