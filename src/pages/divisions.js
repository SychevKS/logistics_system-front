import https from "https"
import { Divisions } from "@screens"

export default Divisions

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}divisions`, { agent })
    const data = await res.json()

    return { props: { divisions: data } }
}
