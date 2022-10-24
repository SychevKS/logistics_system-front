import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useData(url) {
    const { data, error } = useSWR(url, fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
