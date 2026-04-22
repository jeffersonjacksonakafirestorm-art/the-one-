import { cookies } from 'next/headers';
import { getUserBySession } from './db';
import crypto from 'crypto';

const COOKIE_NAME = 'actionable_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function setSessionCookie(token) {
  const store = cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function clearSessionCookie() {
  const store = cookies();
  store.delete(COOKIE_NAME);
}

export function getSessionToken() {
  const store = cookies();
  return store.get(COOKIE_NAME)?.value || null;
}

export async function getCurrentUser() {
  const token = getSessionToken();
  if (!token) return null;
  return getUserBySession(token);
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return null;
  return user;
}

export async function requireSubscriber() {
  const user = await getCurrentUser();
  if (!user) return null;
  if (!['basic', 'pro'].includes(user.plan) || user.subscription_status !== 'active') return null;
  return user;
}
