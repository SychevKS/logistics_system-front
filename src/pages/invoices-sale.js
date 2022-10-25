import https from "https"
import { SaleInvoices } from "@screens"

export default SaleInvoices

export async function getServerSideProps() {
    const agent = new https.Agent({ rejectUnauthorized: false })
    const res = await fetch(`${process.env.API_URL}sales-invoices`, { agent })
    const data = await res.json()

    return { props: { invoices: data } }
}
