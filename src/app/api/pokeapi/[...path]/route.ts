import { NextResponse } from 'next/server';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEAPI_REVALIDATE_SECONDS = 60 * 60 * 24;
const PATH_SEGMENT_PATTERN = /^[a-zA-Z0-9_-]+$/;

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { path } = await params;
  if (
    path.length === 0 ||
    path.some(
      (segment) =>
        !PATH_SEGMENT_PATTERN.test(segment) ||
        segment === '.' ||
        segment === '..'
    )
  ) {
    return NextResponse.json(
      { error: 'Ruta de PokéAPI no válida' },
      { status: 400 }
    );
  }

  const upstreamUrl = `${POKEAPI_BASE_URL}/${path
    .map(encodeURIComponent)
    .join('/')}${new URL(request.url).search}`;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'PokedexApp-NextJS-ReactQuery (Educational Project)',
      },
      next: { revalidate: POKEAPI_REVALIDATE_SECONDS },
    });

    const headers = new Headers({
      'Content-Type':
        upstreamResponse.headers.get('content-type') ?? 'application/json',
    });
    if (upstreamResponse.ok) {
      headers.set(
        'Cache-Control',
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600'
      );
    } else {
      headers.set('Cache-Control', 'no-store');
    }

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch (error) {
    console.error('No se pudo conectar con PokéAPI:', error);
    return NextResponse.json(
      { error: 'No se pudo conectar con PokéAPI' },
      { status: 502 }
    );
  }
}
