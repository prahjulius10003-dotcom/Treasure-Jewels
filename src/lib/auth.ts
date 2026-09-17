import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET || 'treasure-jewels-secret-key-123';
const key = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: number;
  username: string;
  role: 'admin' | 'staff' | 'customer';
  expires: Date;
}

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function createSession(payload: Omit<SessionPayload, 'expires'>) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const sessionPayload: SessionPayload = { ...payload, expires };
  
  const session = await encrypt(sessionPayload);
  
  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    path: '/',
  });
}

export async function destroySession() {
  (await cookies()).set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  });
}
