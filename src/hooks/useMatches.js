import fetcher from "@/lib/fetcher"
import useSWR from "swr"

function useMatches () {
  const { data, error, isLoading } = useSWR(`/api/matches`, fetcher, {
    refreshInterval: 1000
  })
 
  return {
    matches: data,
    isLoading,
    error: error ? error.message : null
  }
}

export default useMatches
