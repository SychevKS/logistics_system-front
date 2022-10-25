import https from "https"
import { Workers } from "@screens"

export default Workers

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}workers`, { agent })
    const data = await res.json()

    return { props: { workers: data } }
}
