import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from './data';

interface CartItem extends Book {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  generateWhatsAppMessage: () => string;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (book) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === book.id);
          if (existingItem) return state;
          return { items: [...state.items, { ...book, quantity: 1 }] };
        });
      },
      removeItem: (bookId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== bookId),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.length,
      totalPrice: () => get().items.reduce((total, item) => total + item.price, 0),
      generateWhatsAppMessage: () => {
        const { items, totalPrice } = get();
        if (items.length === 0) return '';
        
        let message = `Hi! I'm interested in buying these books from Little Readers:\n\n`;
        items.forEach((item, index) => {
          message += `${index + 1}. *${item.title}* - ₹${item.price}\n`;
        });
        message += `\n*Total Order:* ₹${totalPrice()}\n\nPlease let me know how to proceed with payment!`;
        return encodeURIComponent(message);
      },
    }),
    {
      name: 'little-readers-cart',
    }
  )
);
