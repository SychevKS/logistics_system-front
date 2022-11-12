import useSWR from "swr"
import https from "https"

const agent = new https.Agent({ rejectUnauthorized: false })

const fetcher = (url, token) =>
    fetch(url, { headers: { Authorization: "Bearer " + token } }).then(res => res.json())

export default function useData(url) {
    const { data, error } = useSWR([url, sessionStorage.getItem("token")], fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
