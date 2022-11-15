import useSWR from "swr"

const fetcher = (url, token) =>
    fetch(url, { headers: { Authorization: "Bearer " + token } }).then(res => res.json())

export default function useData(url) {
    const { data, error } = useSWR(
        url != null ? [url, sessionStorage.getItem("token")] : null,
        fetcher
    )

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
