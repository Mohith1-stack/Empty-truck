// Environment variables from Vite / Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

const getHeaders = () => ({
  'apikey': supabaseAnonKey,
  'Authorization': `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json'
});

export interface AppUser {
  id: string;
  email: string;
  password: string;
  role: 'driver' | 'dealer' | 'emergency';
  name?: string;
  phone?: string;
  vehicle?: string;
  vehicleNumber?: string;
  orgName?: string;
  isOpenToWork?: boolean;
  isEmpty?: boolean;
  capacityStr?: string;
  loadDetails?: string;
  status?: string;
  timeToEmptyMins?: number;
  location?: string;
  lat?: number | null;
  lng?: number | null;
}

export interface AppOrder {
  id: number;
  targetDriver?: string;
  dealer: string;
  dealerPhone?: string;
  load: string;
  from: string;
  to: string;
  payment: string;
  profit?: string;
  fuelEfficiency?: string;
  duration?: string;
  isCharity?: boolean;
  status?: string;
}

export interface AppCharityOrder {
  id: number;
  dealer: string;
  load: string;
  from: string;
  to: string;
  payment?: string;
  isCharity: boolean;
  status?: string;
}

// Built-in Default & Demo Accounts
// Guarantees immediate access across all browsers and devices without "Account not found"
export const SEED_USERS: AppUser[] = [
  // User's requested account pre-seeded for seamless login on any portal
  {
    id: 'user_mohith_dealer',
    email: 'mohithdande3@gmail.com',
    password: 'password',
    role: 'dealer',
    name: 'Mohith Dande',
    phone: '+91 98765 43210',
    orgName: 'Dande Logistics & Trading'
  },
  {
    id: 'user_mohith_driver',
    email: 'mohithdande3@gmail.com',
    password: 'password',
    role: 'driver',
    name: 'Mohith Dande (Driver)',
    phone: '+91 98765 43210',
    vehicleNumber: 'AP-07-XX-9988',
    vehicle: '12-Wheel Heavy Hauler',
    isOpenToWork: true,
    isEmpty: true,
    capacityStr: '14 Tons',
    loadDetails: 'Completely Empty',
    status: 'Empty',
    timeToEmptyMins: 0,
    location: 'Kochi Port, Kerala',
    lat: 9.9312,
    lng: 76.2673
  },
  {
    id: 'user_mohith_ngo',
    email: 'mohithdande3@gmail.com',
    password: 'password',
    role: 'emergency',
    name: 'Mohith Dande (Relief)',
    phone: '+91 98765 43210',
    orgName: 'Dande Disaster Response Foundation'
  },

  // Ready-to-use Demo Accounts for Instant One-Click Testing
  {
    id: 'demo_driver_1',
    email: 'driver@optimal-truck.com',
    password: 'password',
    role: 'driver',
    name: 'Rajesh Kumar',
    phone: '+91 98470 54321',
    vehicleNumber: 'KL-07-BZ-4412',
    vehicle: '10-Wheel Container',
    isOpenToWork: true,
    isEmpty: true,
    capacityStr: '10 Tons',
    loadDetails: 'Completely Empty',
    status: 'Empty',
    timeToEmptyMins: 0,
    location: 'Willingdon Island, Kochi',
    lat: 9.9548,
    lng: 76.2730
  },
  {
    id: 'demo_driver_1_legacy',
    email: 'driver@longride.com',
    password: 'password',
    role: 'driver',
    name: 'Rajesh Kumar',
    phone: '+91 98470 54321',
    vehicleNumber: 'KL-07-BZ-4412',
    vehicle: '10-Wheel Container',
    isOpenToWork: true,
    isEmpty: true,
    capacityStr: '10 Tons',
    loadDetails: 'Completely Empty',
    status: 'Empty',
    timeToEmptyMins: 0,
    location: 'Willingdon Island, Kochi',
    lat: 9.9548,
    lng: 76.2730
  },
  {
    id: 'demo_driver_2',
    email: 'driver2@optimal-truck.com',
    password: 'password',
    role: 'driver',
    name: 'Anil Varma',
    phone: '+91 97451 22334',
    vehicleNumber: 'KL-04-R-8819',
    vehicle: '6-Wheel Eicher Pro',
    isOpenToWork: true,
    isEmpty: false,
    capacityStr: '4 Tons',
    loadDetails: 'Partial Load (4 Tons available)',
    status: 'In Transit',
    timeToEmptyMins: 45,
    location: 'Aluva Flyover, Ernakulam',
    lat: 10.1076,
    lng: 76.3516
  },
  {
    id: 'demo_dealer_1',
    email: 'dealer@optimal-truck.com',
    password: 'password',
    role: 'dealer',
    name: 'Vikram Nair',
    phone: '+91 94470 11223',
    orgName: 'Cochin Maritime & Spice Traders'
  },
  {
    id: 'demo_dealer_1_legacy',
    email: 'dealer@longride.com',
    password: 'password',
    role: 'dealer',
    name: 'Vikram Nair',
    phone: '+91 94470 11223',
    orgName: 'Cochin Maritime & Spice Traders'
  },
  {
    id: 'demo_emergency_1',
    email: 'ngo@optimal-truck.com',
    password: 'password',
    role: 'emergency',
    name: 'Sister Mary Teresa',
    phone: '+91 94471 99887',
    orgName: 'Kerala Flood & Disaster Relief Foundation'
  },
  {
    id: 'demo_emergency_1_legacy',
    email: 'ngo@longride.com',
    password: 'password',
    role: 'emergency',
    name: 'Sister Mary Teresa',
    phone: '+91 94471 99887',
    orgName: 'Kerala Flood & Disaster Relief Foundation'
  }
];

export const SEED_ORDERS: AppOrder[] = [
  {
    id: 1718000001,
    dealer: 'Cochin Maritime & Spice Traders',
    dealerPhone: '+91 94470 11223',
    load: '2.5 Tons Spices & Dry Fish',
    from: 'Mattancherry, Kochi',
    to: 'Kollam Main Market',
    payment: '₹14,500',
    profit: '+₹3,400',
    fuelEfficiency: '8.4 km/L',
    duration: '3.5 hrs',
    isCharity: false,
    status: 'open'
  },
  {
    id: 1718000002,
    dealer: 'Apex Heavy Hardware Ltd',
    dealerPhone: '+91 98460 77889',
    load: '5 Tons Steel Rods & Machinery',
    from: 'Aluva Industrial Estate',
    to: 'Coimbatore Junction',
    payment: '₹22,000',
    profit: '+₹5,800',
    fuelEfficiency: '7.6 km/L',
    duration: '5 hrs',
    isCharity: false,
    status: 'open'
  },
  {
    id: 1718000003,
    dealer: 'Malabar Tile & Sanitaryware',
    dealerPhone: '+91 94950 33445',
    load: '3 Tons Ceramic Tiles',
    from: 'Kalamassery, Ernakulam',
    to: 'Thrissur Ring Road',
    payment: '₹9,500',
    profit: '+₹2,200',
    fuelEfficiency: '9.0 km/L',
    duration: '2 hrs',
    isCharity: false,
    status: 'open'
  }
];

export const SEED_CHARITY: AppCharityOrder[] = [
  {
    id: 1718000010,
    dealer: 'Kerala Flood & Disaster Relief Foundation',
    load: 'Urgent Baby Formula & Medical Kits',
    from: 'Ernakulam General Hospital',
    to: 'Required by 20:00 (Wayanad Transit)',
    payment: 'Charity (Urgent)',
    isCharity: true,
    status: 'open'
  },
  {
    id: 1718000011,
    dealer: 'Red Cross Relief Chapter',
    load: 'Drinking Water & Emergency Dry Rations',
    from: 'Aluva Depot',
    to: 'Required by 22:30 (Idukki Camp)',
    payment: 'Charity (Urgent)',
    isCharity: true,
    status: 'open'
  }
];

function rowToUser(row: any): AppUser {
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    role: row.role,
    name: row.name,
    phone: row.phone,
    vehicle: row.vehicle,
    vehicleNumber: row.vehicle_number || row.vehicleNumber,
    orgName: row.org_name || row.orgName,
    isOpenToWork: row.is_open_to_work ?? row.isOpenToWork ?? true,
    isEmpty: row.is_empty ?? row.isEmpty ?? true,
    capacityStr: row.capacity_str || row.capacityStr || '10 Tons',
    loadDetails: row.load_details || row.loadDetails,
    status: row.status || 'Empty',
    timeToEmptyMins: row.time_to_empty_mins ?? row.timeToEmptyMins ?? 0,
    location: row.location || 'Offline',
    lat: row.lat,
    lng: row.lng
  };
}

function userToRow(u: AppUser): any {
  return {
    id: u.id,
    email: u.email,
    password: u.password,
    role: u.role,
    name: u.name || null,
    phone: u.phone || null,
    vehicle: u.vehicle || null,
    vehicle_number: u.vehicleNumber || null,
    org_name: u.orgName || null,
    is_open_to_work: u.isOpenToWork ?? true,
    is_empty: u.isEmpty ?? true,
    capacity_str: u.capacityStr || '10 Tons',
    load_details: u.loadDetails || 'Completely Empty',
    status: u.status || 'Empty',
    time_to_empty_mins: u.timeToEmptyMins || 0,
    location: u.location || 'Offline',
    lat: u.lat ?? null,
    lng: u.lng ?? null
  };
}

function rowToOrder(row: any): AppOrder {
  return {
    id: Number(row.id),
    targetDriver: row.target_driver || row.targetDriver,
    dealer: row.dealer,
    dealerPhone: row.dealer_phone || row.dealerPhone,
    load: row.load,
    from: row.from_location || row.from,
    to: row.to_location || row.to,
    payment: row.payment,
    profit: row.profit,
    fuelEfficiency: row.fuel_efficiency || row.fuelEfficiency,
    duration: row.duration,
    isCharity: row.is_charity ?? row.isCharity ?? false,
    status: row.status || 'open'
  };
}

function orderToRow(o: AppOrder): any {
  return {
    id: o.id,
    target_driver: o.targetDriver || null,
    dealer: o.dealer,
    dealer_phone: o.dealerPhone || null,
    load: o.load,
    from_location: o.from,
    to_location: o.to,
    payment: o.payment,
    profit: o.profit || null,
    fuel_efficiency: o.fuelEfficiency || null,
    duration: o.duration || null,
    is_charity: o.isCharity || false,
    status: o.status || 'open'
  };
}

function rowToCharity(row: any): AppCharityOrder {
  return {
    id: Number(row.id),
    dealer: row.dealer,
    load: row.load,
    from: row.from_location || row.from,
    to: row.to_location || row.to,
    payment: row.payment || 'Charity (Urgent)',
    isCharity: true,
    status: row.status || 'open'
  };
}

function charityToRow(c: AppCharityOrder): any {
  return {
    id: c.id,
    dealer: c.dealer,
    load: c.load,
    from_location: c.from,
    to_location: c.to,
    payment: c.payment || 'Charity (Urgent)',
    is_charity: true,
    status: c.status || 'open'
  };
}

export const dbService = {
  // -------------------------------------------------------------
  // USERS
  // -------------------------------------------------------------
  async fetchUsers(): Promise<AppUser[]> {
    if (isSupabaseConfigured) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/users?select=*`, {
          headers: getHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            return data.map(rowToUser);
          }
          if (data && data.length === 0) {
            // Auto seed Supabase table with initial default accounts
            await fetch(`${supabaseUrl}/rest/v1/users`, {
              method: 'POST',
              headers: { ...getHeaders(), 'Prefer': 'return=representation' },
              body: JSON.stringify(SEED_USERS.map(userToRow))
            });
            return SEED_USERS;
          }
        }
      } catch (err) {
        console.warn('Supabase fetchUsers error, using seed accounts:', err);
      }
    }
    return SEED_USERS;
  },

  async saveUser(user: AppUser): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/users`, {
          method: 'POST',
          headers: { ...getHeaders(), 'Prefer': 'resolution=merge-duplicates' },
          body: JSON.stringify(userToRow(user))
        });
      } catch (err) {
        console.error('Supabase saveUser error:', err);
      }
    }
  },

  async updateUserOperational(userId: string, partial: Partial<AppUser>): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        const rowUpdates: any = {};
        if (partial.isOpenToWork !== undefined) rowUpdates.is_open_to_work = partial.isOpenToWork;
        if (partial.isEmpty !== undefined) rowUpdates.is_empty = partial.isEmpty;
        if (partial.capacityStr !== undefined) rowUpdates.capacity_str = partial.capacityStr;
        if (partial.loadDetails !== undefined) rowUpdates.load_details = partial.loadDetails;
        if (partial.status !== undefined) rowUpdates.status = partial.status;
        if (partial.timeToEmptyMins !== undefined) rowUpdates.time_to_empty_mins = partial.timeToEmptyMins;
        if (partial.location !== undefined) rowUpdates.location = partial.location;
        if (partial.lat !== undefined) rowUpdates.lat = partial.lat;
        if (partial.lng !== undefined) rowUpdates.lng = partial.lng;

        await fetch(`${supabaseUrl}/rest/v1/users?id=eq.${encodeURIComponent(userId)}`, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify(rowUpdates)
        });
      } catch (err) {
        console.error('Supabase updateUserOperational error:', err);
      }
    }
  },

  // -------------------------------------------------------------
  // DEALER FREIGHT ORDERS
  // -------------------------------------------------------------
  async fetchOrders(): Promise<AppOrder[]> {
    if (isSupabaseConfigured) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/orders?select=*&order=id.desc`, {
          headers: getHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            return data.map(rowToOrder);
          }
          if (data && data.length === 0) {
            await fetch(`${supabaseUrl}/rest/v1/orders`, {
              method: 'POST',
              headers: { ...getHeaders(), 'Prefer': 'return=representation' },
              body: JSON.stringify(SEED_ORDERS.map(orderToRow))
            });
            return SEED_ORDERS;
          }
        }
      } catch (err) {
        console.warn('Supabase fetchOrders error:', err);
      }
    }
    return SEED_ORDERS;
  },

  async saveOrder(order: AppOrder): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/orders`, {
          method: 'POST',
          headers: { ...getHeaders(), 'Prefer': 'return=minimal' },
          body: JSON.stringify(orderToRow(order))
        });
      } catch (err) {
        console.error('Supabase saveOrder error:', err);
      }
    }
  },

  async deleteOrder(orderId: number): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
      } catch (err) {
        console.error('Supabase deleteOrder error:', err);
      }
    }
  },

  // -------------------------------------------------------------
  // EMERGENCY CHARITY ORDERS
  // -------------------------------------------------------------
  async fetchCharityOrders(): Promise<AppCharityOrder[]> {
    if (isSupabaseConfigured) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/charity_orders?select=*&order=id.desc`, {
          headers: getHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            return data.map(rowToCharity);
          }
          if (data && data.length === 0) {
            await fetch(`${supabaseUrl}/rest/v1/charity_orders`, {
              method: 'POST',
              headers: { ...getHeaders(), 'Prefer': 'return=representation' },
              body: JSON.stringify(SEED_CHARITY.map(charityToRow))
            });
            return SEED_CHARITY;
          }
        }
      } catch (err) {
        console.warn('Supabase fetchCharityOrders error:', err);
      }
    }
    return SEED_CHARITY;
  },

  async saveCharityOrder(charity: AppCharityOrder): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/charity_orders`, {
          method: 'POST',
          headers: { ...getHeaders(), 'Prefer': 'return=minimal' },
          body: JSON.stringify(charityToRow(charity))
        });
      } catch (err) {
        console.error('Supabase saveCharityOrder error:', err);
      }
    }
  },

  async deleteCharityOrder(orderId: number): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/charity_orders?id=eq.${orderId}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
      } catch (err) {
        console.error('Supabase deleteCharityOrder error:', err);
      }
    }
  },

  // -------------------------------------------------------------
  // PERIODIC & WINDOW FOCUS CLOUD SYNC
  // -------------------------------------------------------------
  subscribeToTable(_table: 'users' | 'orders' | 'charity_orders', onUpdate: () => void) {
    if (!isSupabaseConfigured) return () => {};

    // Poll every 5 seconds when tab is active
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        onUpdate();
      }
    }, 5000);

    const handleFocus = () => onUpdate();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }
};
