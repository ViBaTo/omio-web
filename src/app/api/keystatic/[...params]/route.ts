import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

const handlers = makeRouteHandler({ config });

// La API local de Keystatic lee y escribe el filesystem SIN autenticación:
// solo tiene sentido en desarrollo. En producción el panel trabaja contra
// Keystatic Cloud y esta ruta no debe existir.
const enabled = process.env.NODE_ENV === 'development';
const notFound = () => new Response('Not Found', { status: 404 });

export const GET = enabled ? handlers.GET : notFound;
export const POST = enabled ? handlers.POST : notFound;
