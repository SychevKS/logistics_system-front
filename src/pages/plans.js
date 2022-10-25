import https from "https"
import { Plans } from "@screens"

export default Plans

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}sales-plans`, { agent })
    const data = await res.json()

    return { props: { salesPlans: data } }
}
