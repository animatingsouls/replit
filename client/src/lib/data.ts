import heroImg from '@assets/stock_images/happy_children_readi_4a109fe1.jpg';
import babyBooks from '@assets/stock_images/baby_board_books_sta_e62b3f80.jpg';
import pictureBooks from '@assets/stock_images/colorful_children_pi_7154bf3f.jpg';
import chapterBooks from '@assets/stock_images/children_chapter_boo_7742ae68.jpg';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: 'Like New' | 'Good' | 'Well Loved';
  ageGroup: '0-3' | '3-6' | '6-8' | '8-12';
  type: string;
  image: string;
}

export const BOOK_TYPES = [
  'all',
  'Board Book',
  'Paperback',
  'Hardcover',
  'Disney Marvel',
  'General Knowledge',
  'Phonics',
  'Activity Book',
  'Collection of Stories',
  'below-50'
];

export const CATEGORIES = [
  {
    id: '0-3',
    title: '0-3 Yrs',
    description: 'Board books and textures for tiny hands',
    image: babyBooks,
    path: '/shop?age=0-3'
  },
  {
    id: '3-6',
    title: '3-6 Yrs',
    description: 'Picture books and early stories',
    image: pictureBooks,
    path: '/shop?age=3-6'
  },
  {
    id: '6-8',
    title: '6-8 Yrs',
    description: 'Early readers and fun stories',
    image: chapterBooks,
    path: '/shop?age=6-8'
  },
  {
    id: '8-12',
    title: '8-12 Yrs',
    description: 'Chapter books and adventures',
    image: chapterBooks,
    path: '/shop?age=8-12'
  }
];

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    price: 250,
    condition: 'Good',
    ageGroup: '0-3',
    type: 'Board Book',
    image: babyBooks
  },
  {
    id: '2',
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    price: 200,
    condition: 'Well Loved',
    ageGroup: '0-3',
    type: 'Board Book',
    image: babyBooks
  },
  {
    id: '3',
    title: 'Gruffalo',
    author: 'Julia Donaldson',
    price: 350,
    condition: 'Like New',
    ageGroup: '3-6',
    type: 'Picture Book',
    image: pictureBooks
  },
  {
    id: '4',
    title: 'The Tiger Who Came to Tea',
    author: 'Judith Kerr',
    price: 300,
    condition: 'Good',
    ageGroup: '3-6',
    type: 'Picture Book',
    image: pictureBooks
  },
  {
    id: '5',
    title: 'Matilda',
    author: 'Roald Dahl',
    price: 280,
    condition: 'Good',
    ageGroup: '6-8',
    type: 'Chapter Book',
    image: chapterBooks
  },
  {
    id: '6',
    title: 'Charlotte\'s Web',
    author: 'E.B. White',
    price: 250,
    condition: 'Well Loved',
    ageGroup: '8-12',
    type: 'Chapter Book',
    image: chapterBooks
  },
  {
    id: '7',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    price: 320,
    condition: 'Like New',
    ageGroup: '3-6',
    type: 'Picture Book',
    image: pictureBooks
  },
  {
    id: '8',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    price: 45,
    condition: 'Good',
    ageGroup: '8-12',
    type: 'Chapter Book',
    image: chapterBooks
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya S.",
    location: "Mumbai",
    text: "The books were in such good condition! My daughter loves the surprise of opening the package."
  },
  {
    id: 2,
    name: "Rahul M.",
    location: "Bangalore",
    text: "Finally an affordable way to keep up with my son's reading appetite. Highly recommend!"
  },
  {
    id: 3,
    name: "Anita K.",
    location: "Delhi",
    text: "Love the sustainability aspect. It feels good to give these books a second home."
  }
];

export { heroImg };
