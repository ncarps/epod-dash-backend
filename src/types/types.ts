export type VendorFillRate = {
  id: string
  fillrate: number
  vendor: string
}
export type CustomerFillRate = {
  id: string
  fillrate: number
  customer: string
}

export type FillRate = {
  fillrate: number
  vendor: string
  customer: string
}
