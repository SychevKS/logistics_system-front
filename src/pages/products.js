import https from "https"
import { Products } from "@screens"

export default Products

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}products`, { agent })
    const data = await res.json()

    return { props: { products: data } }
}
