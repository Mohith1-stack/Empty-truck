import { useState, useEffect } from 'react';
import { dbService, SEED_USERS } from '../lib/db';
import type { AppUser } from '../lib/db';

const getStoredUsers = (): AppUser[] => {
  const usersStr = localStorage.getItem('longride_users');
  if (usersStr) {
    try {
      const parsed: AppUser[] = JSON.parse(usersStr);
      // Merge with SEED_USERS so default demo accounts and user account are always present
      const mergedMap = new Map<string, AppUser>();
      SEED_USERS.forEach((u) => mergedMap.set(`${u.email}_${u.role}`, u));
      parsed.forEach((u) => mergedMap.set(`${u.email}_${u.role}`, u));
      return Array.from(mergedMap.values());
    } catch (e) {
      return SEED_USERS;
    }
  }
  return SEED_USERS;
};

const getStoredCurrentUser = (): AppUser | null => {
  const userStr = localStorage.getItem('longride_current_user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Global state
let globalUsers: AppUser[] = getStoredUsers();
let globalCurrentUser: AppUser | null = getStoredCurrentUser();

type Listener = () => void;
let listeners: Listener[] = [];

function notify() {
  localStorage.setItem('longride_users', JSON.stringify(globalUsers));
  if (globalCurrentUser) {
    localStorage.setItem('longride_current_user', JSON.stringify(globalCurrentUser));
  } else {
    localStorage.removeItem('longride_current_user');
  }
  listeners.forEach((listener) => listener());
}

// Initial async fetch from cloud DB
let hasInitialized = false;
async function initCloudUsers() {
  if (hasInitialized) return;
  hasInitialized = true;
  try {
    const cloudUsers = await dbService.fetchUsers();
    if (cloudUsers && cloudUsers.length > 0) {
      const mergedMap = new Map<string, AppUser>();
      globalUsers.forEach((u) => mergedMap.set(`${u.email}_${u.role}`, u));
      cloudUsers.forEach((u) => mergedMap.set(`${u.email}_${u.role}`, u));
      globalUsers = Array.from(mergedMap.values());

      if (globalCurrentUser) {
        const matchingCurrent = globalUsers.find((u) => u.id === globalCurrentUser?.id);
        if (matchingCurrent) {
          globalCurrentUser = matchingCurrent;
        }
      }
      notify();
    }
  } catch (err) {
    console.warn('Initial cloud users fetch failed:', err);
  }
}

// Subscribe to real-time changes
dbService.subscribeToTable('users', async () => {
  try {
    const cloudUsers = await dbService.fetchUsers();
    if (cloudUsers && cloudUsers.length > 0) {
      globalUsers = cloudUsers;
      if (globalCurrentUser) {
        const matchingCurrent = globalUsers.find((u) => u.id === globalCurrentUser?.id);
        if (matchingCurrent) {
          globalCurrentUser = matchingCurrent;
        }
      }
      notify();
    }
  } catch (e) {
    console.error('Realtime users sync error:', e);
  }
});

// Trigger initial fetch
initCloudUsers();

export function useAuthStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    initCloudUsers();
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    currentUser: globalCurrentUser,
    users: globalUsers,

    register: async (userData: any) => {
      // Check if user already exists for this role
      const exists = globalUsers.find((u) => u.email === userData.email && u.role === userData.role);
      if (exists) {
        throw new Error('Email already registered for this role');
      }

      const newUser: AppUser = {
        ...userData,
        id: Date.now().toString(),
        isOpenToWork: true,
        isEmpty: true,
        capacityStr: userData.capacityStr || '10 Tons',
        loadDetails: 'Completely Empty',
        status: 'Empty',
        timeToEmptyMins: 0,
        location: 'Online',
        lat: userData.lat || null,
        lng: userData.lng || null
      };

      globalUsers = [...globalUsers, newUser];
      globalCurrentUser = newUser;
      notify();

      // Persist to Cloud Database
      try {
        await dbService.saveUser(newUser);
      } catch (e) {
        console.error('Failed to save user to cloud DB:', e);
      }

      return newUser;
    },

    login: async (email: string, password: string, role: string) => {
      // First check local/seeded users
      let user = globalUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role);

      // If not found, try refreshing from cloud DB in case account was created on another device
      if (!user) {
        try {
          const freshUsers = await dbService.fetchUsers();
          if (freshUsers && freshUsers.length > 0) {
            globalUsers = freshUsers;
            user = globalUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
          }
        } catch (e) {
          console.warn('Could not refresh users from cloud DB during login:', e);
        }
      }

      if (!user) {
        // Check if email exists under another role
        const userWrongRole = globalUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (userWrongRole) {
          throw new Error(`Account exists under ${userWrongRole.role.toUpperCase()} portal, not ${role.toUpperCase()}`);
        }
        throw new Error('Account not found');
      }

      if (user.password !== password) {
        throw new Error('Incorrect password');
      }

      globalCurrentUser = user;
      notify();
      return user;
    },

    logout: () => {
      if (globalCurrentUser?.role === 'driver') {
        const userIndex = globalUsers.findIndex((u) => u.id === globalCurrentUser?.id);
        if (userIndex !== -1) {
          globalUsers[userIndex] = {
            ...globalUsers[userIndex],
            isOpenToWork: false,
            lat: null,
            lng: null,
            location: 'Offline'
          };
          dbService.updateUserOperational(globalCurrentUser.id, {
            isOpenToWork: false,
            lat: null,
            lng: null,
            location: 'Offline'
          });
        }
      }
      globalCurrentUser = null;
      notify();
    },

    updateUserOperationalData: (userId: string, data: any) => {
      const userIndex = globalUsers.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        globalUsers[userIndex] = { ...globalUsers[userIndex], ...data };
        if (globalCurrentUser?.id === userId) {
          globalCurrentUser = globalUsers[userIndex];
        }
        notify();
        // Sync to cloud database
        dbService.updateUserOperational(userId, data);
      }
    }
  };
}
