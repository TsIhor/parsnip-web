export function load({ params }: { params: Record<string, string> }) {
  return { id: Number(params.id) };
}
