import https from "https"
import { TransferInvoices } from "@screens"

export default TransferInvoices

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}transfer-invoices`, { agent })
    const data = await res.json()

    return { props: { invoices: data } }
}
