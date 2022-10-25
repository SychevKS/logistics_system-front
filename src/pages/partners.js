import https from "https"
import { Partners } from "@screens"

export default Partners

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}partners`, { agent })
    const data = await res.json()

    return { props: { partners: data } }
}
