export default async (_request: Request, context: { geo?: { country?: { code?: string } } }) => {
  return Response.json(
    { country: context.geo?.country?.code ?? null },
    { headers: { "Cache-Control": "no-store" } },
  );
};

export const config = { path: "/api/locale" };
