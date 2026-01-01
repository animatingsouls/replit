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
  ageGroup: '0-3' | '3-6' | '6-10';
  image: string;
}

export const CATEGORIES = [
  {
    id: '0-3',
    title: '0-3 Years',
    description: 'Board books and textures for tiny hands',
    image: babyBooks,
    path: '/shop?age=0-3'
  },
  {
    id: '3-6',
    title: '3-6 Years',
    description: 'Picture books and early stories',
    image: pictureBooks,
    path: '/shop?age=3-6'
  },
  {
    id: '6-10',
    title: '6-10 Years',
    description: 'Chapter books and adventures',
    image: chapterBooks,
    path: '/shop?age=6-10'
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
    image: babyBooks // Using category image as placeholder for now
  },
  {
    id: '2',
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    price: 200,
    condition: 'Well Loved',
    ageGroup: '0-3',
    image: babyBooks
  },
  {
    id: '3',
    title: 'Gruffalo',
    author: 'Julia Donaldson',
    price: 350,
    condition: 'Like New',
    ageGroup: '3-6',
    image: pictureBooks
  },
  {
    id: '4',
    title: 'The Tiger Who Came to Tea',
    author: 'Judith Kerr',
    price: 300,
    condition: 'Good',
    ageGroup: '3-6',
    image: pictureBooks
  },
  {
    id: '5',
    title: 'Matilda',
    author: 'Roald Dahl',
    price: 280,
    condition: 'Good',
    ageGroup: '6-10',
    image: chapterBooks
  },
  {
    id: '6',
    title: 'Charlotte\'s Web',
    author: 'E.B. White',
    price: 250,
    condition: 'Well Loved',
    ageGroup: '6-10',
    image: chapterBooks
  },
  {
    id: '7',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    price: 320,
    condition: 'Like New',
    ageGroup: '3-6',
    image: pictureBooks
  },
  {
    id: '8',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    price: 450,
    condition: 'Good',
    ageGroup: '6-10',
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
