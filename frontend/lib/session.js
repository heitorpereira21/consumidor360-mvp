export const USER_STORAGE_KEY = "consumidor360_user";
const CASES_STORAGE_KEY = "consumidor360_cases_by_user";

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(USER_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function saveStoredUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(USER_STORAGE_KEY);
}

function readCasesMap() {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = localStorage.getItem(CASES_STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeCasesMap(map) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(map));
}

export function saveCaseForUser(userEmail, caso) {
  if (typeof window === "undefined" || !userEmail) {
    return;
  }

  const normalizedEmail = String(userEmail).trim().toLowerCase();
  const map = readCasesMap();
  const currentCases = Array.isArray(map[normalizedEmail]) ? map[normalizedEmail] : [];

  map[normalizedEmail] = [caso, ...currentCases];
  writeCasesMap(map);

  // compatibilidade com chave antiga usada no dashboard
  localStorage.setItem("casos", JSON.stringify(map[normalizedEmail]));
}

export function getCasesForUser(userEmail) {
  if (typeof window === "undefined" || !userEmail) {
    return [];
  }

  const normalizedEmail = String(userEmail).trim().toLowerCase();
  const map = readCasesMap();
  return Array.isArray(map[normalizedEmail]) ? map[normalizedEmail] : [];
}
