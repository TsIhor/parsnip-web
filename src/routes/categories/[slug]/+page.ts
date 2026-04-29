export function load({ params }: { params: Record<string, string> }) {
  return { slug: params.slug };
}
