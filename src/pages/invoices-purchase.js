import https from "https"
import { PurchaseInvoices } from "@screens"

export default PurchaseInvoices

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}purchase-invoices`, { agent })
    const data = await res.json()

    return { props: { invoices: data } }
}
