export interface Context {
  session: { userId: string; organizationId: string } | null
}
