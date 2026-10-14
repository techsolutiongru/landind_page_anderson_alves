import { NextResponse } from "next/server";

/**
 * Rota reservada para a futura integração com IA.
 * Implemente aqui a chamada ao provedor (usando process.env.AI_API_KEY),
 * valide o tamanho do prompt e aplique limite de requisições.
 */
export async function POST() {
  return NextResponse.json(
    { error: "Integração com IA ainda não configurada." },
    { status: 501 }
  );
}
