import useSWR from "swr"
import https from "https"

const fetcher = (...args) => fetch(...args).then(res => res.json())
const agent = new https.Agent({ rejectUnauthorized: false })

export default function useData(url, options) {
    const { data, error } = useSWR(url, fetcher, { agent, ...options })

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
