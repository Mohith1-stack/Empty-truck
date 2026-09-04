import { useState, useEffect } from 'react';
import { dbService, SEED_ORDERS, SEED_CHARITY } from '../lib/db';
import type { AppOrder, AppCharityOrder } from '../lib/db';

const getStoredOrders = (): AppOrder[] => {
  try {
    const val = localStorage.getItem('longride_inbox');
    if (val) {
      const parsed: AppOrder[] = JSON.parse(val);
      const map = new Map<number, AppOrder>();
      SEED_ORDERS.forEach((o) => map.set(o.id, o));
      parsed.forEach((o) => map.set(o.id, o));
      return Array.from(map.values());
    }
  } catch (e) {
    return SEED_ORDERS;
  }
  return SEED_ORDERS;
};

const getStoredCharity = (): AppCharityOrder[] => {
  try {
    const val = localStorage.getItem('longride_charity');
    if (val) {
      const parsed: AppCharityOrder[] = JSON.parse(val);
      const map = new Map<number, AppCharityOrder>();
      SEED_CHARITY.forEach((c) => map.set(c.id, c));
      parsed.forEach((c) => map.set(c.id, c));
      return Array.from(map.values());
    }
  } catch (e) {
    return SEED_CHARITY;
  }
  return SEED_CHARITY;
};

let globalInbox: AppOrder[] = getStoredOrders();
let globalCharityInbox: AppCharityOrder[] = getStoredCharity();

let globalActiveOrder: any = (() => {
  try {
    const val = localStorage.getItem('longride_active_order');
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
})();

type Listener = () => void;
let listeners: Listener[] = [];

function notify() {
  localStorage.setItem('longride_inbox', JSON.stringify(globalInbox));
  localStorage.setItem('longride_charity', JSON.stringify(globalCharityInbox));
  if (globalActiveOrder) {
    localStorage.setItem('longride_active_order', JSON.stringify(globalActiveOrder));
  } else {
    localStorage.removeItem('longride_active_order');
  }
  listeners.forEach((listener) => listener());
}

// Initial fetch from cloud database
let hasInitializedOrders = false;
async function initCloudOrders() {
  if (hasInitializedOrders) return;
  hasInitializedOrders = true;
  try {
    const [cloudOrders, cloudCharity] = await Promise.all([
      dbService.fetchOrders(),
      dbService.fetchCharityOrders()
    ]);
    if (cloudOrders && cloudOrders.length > 0) {
      const map = new Map<number, AppOrder>();
      globalInbox.forEach((o) => map.set(o.id, o));
      cloudOrders.forEach((o) => map.set(o.id, o));
      globalInbox = Array.from(map.values());
    }
    if (cloudCharity && cloudCharity.length > 0) {
      const map = new Map<number, AppCharityOrder>();
      globalCharityInbox.forEach((c) => map.set(c.id, c));
      cloudCharity.forEach((c) => map.set(c.id, c));
      globalCharityInbox = Array.from(map.values());
    }
    notify();
  } catch (err) {
    console.warn('Initial cloud orders fetch failed:', err);
  }
}

// Real-time synchronization
dbService.subscribeToTable('orders', async () => {
  try {
    const orders = await dbService.fetchOrders();
    if (orders) {
      globalInbox = orders;
      notify();
    }
  } catch (e) {
    console.error('Realtime orders sync failed:', e);
  }
});

dbService.subscribeToTable('charity_orders', async () => {
  try {
    const charity = await dbService.fetchCharityOrders();
    if (charity) {
      globalCharityInbox = charity;
      notify();
    }
  } catch (e) {
    console.error('Realtime charity sync failed:', e);
  }
});

initCloudOrders();

export function useOrderStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    initCloudOrders();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'longride_inbox') globalInbox = getStoredOrders();
      if (e.key === 'longride_charity') globalCharityInbox = getStoredCharity();
      if (e.key === 'longride_active_order') {
        const val = localStorage.getItem('longride_active_order');
        globalActiveOrder = val ? JSON.parse(val) : null;
      }
      setTick((t) => t + 1);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    inbox: globalInbox,
    charityInbox: globalCharityInbox,
    activeOrder: globalActiveOrder,

    addOrder: (order: any) => {
      const newOrder: AppOrder = { ...order, id: Date.now(), isCharity: false, status: 'open' };
      globalInbox = [newOrder, ...globalInbox];
      notify();
      dbService.saveOrder(newOrder);
    },

    addCharity: (order: any) => {
      const newCharity: AppCharityOrder = { ...order, id: Date.now(), isCharity: true, status: 'open' };
      globalCharityInbox = [newCharity, ...globalCharityInbox];
      notify();
      dbService.saveCharityOrder(newCharity);
    },

    deleteOrder: (orderId: number) => {
      globalInbox = globalInbox.filter((o) => o.id !== orderId);
      notify();
      dbService.deleteOrder(orderId);
    },

    acceptOrder: (order: any) => {
      if (order.isCharity) {
        globalCharityInbox = globalCharityInbox.filter((o) => o.id !== order.id);
        dbService.deleteCharityOrder(order.id);
      } else {
        globalInbox = globalInbox.filter((o) => o.id !== order.id);
        dbService.deleteOrder(order.id);
      }
      globalActiveOrder = order;
      notify();
    },

    cancelOrder: () => {
      if (globalActiveOrder) {
        if (globalActiveOrder.isCharity) {
          globalCharityInbox = [globalActiveOrder, ...globalCharityInbox];
          dbService.saveCharityOrder(globalActiveOrder);
        } else {
          globalInbox = [globalActiveOrder, ...globalInbox];
          dbService.saveOrder(globalActiveOrder);
        }
        globalActiveOrder = null;
        notify();
      }
    },

    completeOrder: () => {
      globalActiveOrder = null;
      notify();
    }
  };
}
