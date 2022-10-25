import https from "https"
import { Units } from "@screens"

export default Units

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}units`, { agent })
    const data = await res.json()

    return { props: { units: data } }
}
