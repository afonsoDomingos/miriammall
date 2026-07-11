'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Space,
  Store,
  Restaurant,
  MallEvent,
  Promotion,
  RentalRequest,
  Banner,
  BlogPost
} from '../utils/mockData';

interface DatabaseContextType {
  spaces: Space[];
  stores: Store[];
  restaurants: Restaurant[];
  events: MallEvent[];
  promotions: Promotion[];
  rentalRequests: RentalRequest[];
  banners: Banner[];
  blogPosts: BlogPost[];
  isLoaded: boolean;
  
  // Banners CRUD
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<void>;
  updateBanner: (banner: Banner) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  setActiveBanner: (id: string) => Promise<void>;
  
  // Spaces CRUD
  addSpace: (space: Omit<Space, 'id'>) => Promise<void>;
  updateSpace: (space: Space) => Promise<void>;
  deleteSpace: (id: string) => Promise<void>;
  
  // Stores CRUD
  addStore: (store: Omit<Store, 'id'>) => Promise<void>;
  updateStore: (store: Store) => Promise<void>;
  deleteStore: (id: string) => Promise<void>;
  
  // Restaurants CRUD
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => Promise<void>;
  updateRestaurant: (restaurant: Restaurant) => Promise<void>;
  deleteRestaurant: (id: string) => Promise<void>;
  
  // Events CRUD
  addEvent: (event: Omit<MallEvent, 'id'>) => Promise<void>;
  updateEvent: (event: MallEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  
  // Promotions CRUD
  addPromotion: (promotion: Omit<Promotion, 'id'>) => Promise<void>;
  updatePromotion: (promotion: Promotion) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
  
  // Rental Requests CRUD
  addRentalRequest: (req: Omit<RentalRequest, 'id' | 'date' | 'status'>) => Promise<void>;
  updateRentalRequestStatus: (id: string, status: RentalRequest['status']) => Promise<void>;
  deleteRentalRequest: (id: string) => Promise<void>;

  // Blog CRUD
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [events, setEvents] = useState<MallEvent[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initAndFetchData() {
      try {
        // 1. Initialize DB (seeds mock data if MongoDB is empty)
        await fetch('/api/init-db');
        
        // 2. Fetch all collections
        const res = await fetch('/api/all-data');
        const payload = await res.json();
        
        if (payload.success && payload.data) {
          const { spaces, stores, restaurants, events, promotions, rentalRequests, banners, blogPosts } = payload.data;
          setSpaces(spaces || []);
          setStores(stores || []);
          setRestaurants(restaurants || []);
          setEvents(events || []);
          setPromotions(promotions || []);
          setRentalRequests(rentalRequests || []);
          setBanners(banners || []);
          setBlogPosts(blogPosts || []);
        }
      } catch (e) {
        console.error('Failed to load data from API', e);
      } finally {
        setIsLoaded(true);
      }
    }

    initAndFetchData();
  }, []);

  // Banners CRUD
  const addBanner = async (banner: Omit<Banner, 'id'>) => {
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setBanners(prev => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add banner', e);
    }
  };

  const updateBanner = async (updatedBanner: Banner) => {
    try {
      const res = await fetch(`/api/banners/${updatedBanner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBanner),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setBanners(prev => prev.map(b => b.id === updatedBanner.id ? data.data : b));
      }
    } catch (e) {
      console.error('Failed to update banner', e);
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setBanners(prev => prev.filter(b => b.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete banner', e);
    }
  };

  const setActiveBanner = async (id: string) => {
    try {
      const updatePromises = banners.map(b => {
        const updatedStatus = { ...b, isActive: b.id === id };
        return fetch(`/api/banners/${b.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedStatus),
        });
      });
      await Promise.all(updatePromises);
      setBanners(prev => prev.map(b => ({ ...b, isActive: b.id === id })));
    } catch (e) {
      console.error('Failed to set active banner', e);
    }
  };

  // Spaces CRUD
  const addSpace = async (space: Omit<Space, 'id'>) => {
    try {
      const res = await fetch('/api/spaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(space),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSpaces(prev => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add space', e);
    }
  };

  const updateSpace = async (updatedSpace: Space) => {
    try {
      const res = await fetch(`/api/spaces/${updatedSpace.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSpace),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSpaces(prev => prev.map(s => s.id === updatedSpace.id ? data.data : s));
      }
    } catch (e) {
      console.error('Failed to update space', e);
    }
  };

  const deleteSpace = async (id: string) => {
    try {
      const res = await fetch(`/api/spaces/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setSpaces(prev => prev.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete space', e);
    }
  };

  // Stores CRUD
  const addStore = async (store: Omit<Store, 'id'>) => {
    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setStores(prev => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add store', e);
    }
  };

  const updateStore = async (updatedStore: Store) => {
    try {
      const res = await fetch(`/api/stores/${updatedStore.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStore),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setStores(prev => prev.map(s => s.id === updatedStore.id ? data.data : s));
      }
    } catch (e) {
      console.error('Failed to update store', e);
    }
  };

  const deleteStore = async (id: string) => {
    try {
      const res = await fetch(`/api/stores/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setStores(prev => prev.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete store', e);
    }
  };

  // Restaurants CRUD
  const addRestaurant = async (restaurant: Omit<Restaurant, 'id'>) => {
    try {
      const res = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRestaurants(prev => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add restaurant', e);
    }
  };

  const updateRestaurant = async (updatedRestaurant: Restaurant) => {
    try {
      const res = await fetch(`/api/restaurants/${updatedRestaurant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRestaurant),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRestaurants(prev => prev.map(r => r.id === updatedRestaurant.id ? data.data : r));
      }
    } catch (e) {
      console.error('Failed to update restaurant', e);
    }
  };

  const deleteRestaurant = async (id: string) => {
    try {
      const res = await fetch(`/api/restaurants/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setRestaurants(prev => prev.filter(r => r.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete restaurant', e);
    }
  };

  // Events CRUD
  const addEvent = async (event: Omit<MallEvent, 'id'>) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEvents(prev => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add event', e);
    }
  };

  const updateEvent = async (updatedEvent: MallEvent) => {
    try {
      const res = await fetch(`/api/events/${updatedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? data.data : e));
      }
    } catch (e) {
      console.error('Failed to update event', e);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setEvents(prev => prev.filter(e => e.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete event', e);
    }
  };

  // Promotions CRUD
  const addPromotion = async (promotion: Omit<Promotion, 'id'>) => {
    try {
      const res = await fetch('/api/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promotion),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPromotions(prev => [...prev, data.data]);
      }
    } catch (e) {
      console.error('Failed to add promotion', e);
    }
  };

  const updatePromotion = async (updatedPromotion: Promotion) => {
    try {
      const res = await fetch(`/api/promotions/${updatedPromotion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPromotion),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPromotions(prev => prev.map(p => p.id === updatedPromotion.id ? data.data : p));
      }
    } catch (e) {
      console.error('Failed to update promotion', e);
    }
  };

  const deletePromotion = async (id: string) => {
    try {
      const res = await fetch(`/api/promotions/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setPromotions(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete promotion', e);
    }
  };

  // Rental Requests CRUD
  const addRentalRequest = async (req: Omit<RentalRequest, 'id' | 'date' | 'status'>) => {
    try {
      const res = await fetch('/api/rental-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRentalRequests(prev => [data.data, ...prev]);
      }
    } catch (e) {
      console.error('Failed to add rental request', e);
    }
  };

  const updateRentalRequestStatus = async (id: string, status: RentalRequest['status']) => {
    try {
      // Find the request first to send the complete payload (or we can just send the status update)
      const reqToUpdate = rentalRequests.find(r => r.id === id);
      if (!reqToUpdate) return;
      
      const res = await fetch(`/api/rental-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reqToUpdate, status }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRentalRequests(prev => prev.map(r => r.id === id ? data.data : r));
      }
    } catch (e) {
      console.error('Failed to update rental request status', e);
    }
  };

  const deleteRentalRequest = async (id: string) => {
    try {
      const res = await fetch(`/api/rental-requests/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setRentalRequests(prev => prev.filter(r => r.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete rental request', e);
    }
  };

  // Blog CRUD Implementation
  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setBlogPosts(prev => [data.data, ...prev]);
      }
    } catch (e) {
      console.error('Failed to add blog post', e);
    }
  };

  const updateBlogPost = async (updatedPost: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${updatedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? data.data : p));
      }
    } catch (e) {
      console.error('Failed to update blog post', e);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setBlogPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete blog post', e);
    }
  };

  return (
    <DatabaseContext.Provider value={{
      spaces,
      stores,
      restaurants,
      events,
      promotions,
      rentalRequests,
      banners,
      isLoaded,
      blogPosts,
      addBanner,
      updateBanner,
      deleteBanner,
      setActiveBanner,
      addSpace,
      updateSpace,
      deleteSpace,
      addStore,
      updateStore,
      deleteStore,
      addRestaurant,
      updateRestaurant,
      deleteRestaurant,
      addEvent,
      updateEvent,
      deleteEvent,
      addPromotion,
      updatePromotion,
      deletePromotion,
      addRentalRequest,
      updateRentalRequestStatus,
      deleteRentalRequest,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
