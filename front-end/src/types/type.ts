export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
export type DealPriority = "low" | "medium" | "high"

export interface Deal {
  _id: string
  title: string
  company: string
  contactName: string
  email?: string
  phone?: string
  value: number
  stage: DealStage
  priority: DealPriority
  probability: number
  expectedCloseDate?: string
  assignedTo: string
  notes?: string
  createdAt: string
}

export interface Stage {
  id: DealStage
  label: string
  color: string
}
