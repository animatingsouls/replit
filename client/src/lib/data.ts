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
    name: "Neethu",
    location: "Kerala",
    text: "The team has a good collection of books. While they are second hand books, the quality and condition is quite good. If there is anything amiss, they are upfront about it. I always believe in gifting books to kids in my family and expect them to pass it on when they outgrow it. This platform is a brilliant way to keep that alive and of course, at a fraction of the original cost of books. I have got whole sets of books, high quality children stories with puzzles, etc. I will continue exploring and buying from them. Thank you and good luck!"
  },
  {
    id: 2,
    name: "Pratima",
    location: "Mumbai",
    text: "My son has fallen in love with reading n books all thanks to lovely age appropriate guidance n preloved books offered by Archana Swaminathan (brainchild behind ‘Animating Souls’ Bangalore based but ships all across India n overseas too). My son is 5 n have read together over 100 books (for his age) which was not possible without the excellent guidance we got from Archana. Hope this helps u as much as it did help us."
  },
  {
    id: 3,
    name: "Maitreyi",
    location: "Bangalore",
    text: "Pristine books. Archana very punctual in posting, disciplined and quite hardworking. She will guide you through what genre your children wants and is interested. Thank you for a smooth and beautiful service."
  },
  {
    id: 4,
    name: "Urvashi",
    location: "",
    text: "Thank you for all the hardwork you do to get the best books for all our kids 🙏🏻♥️ Thank you for sorting out to them.. It becomes easier to select the books as they are age appropriate… Archana you are the best ❤️"
  },
  {
    id: 5,
    name: "Rekha",
    location: "Mumbai, India",
    text: "The posting with detailed video and the prompt response makes me trust Animating souls and place constant order of books for my kid."
  },
  {
    id: 6,
    name: "Debasmita Ghosh",
    location: "Bangalore",
    text: "Animating Souls opens the avenue to know about various different books, forms the habit of acquiring never ending knowledge, builds interest. Preloved books is a great choice to explore wide range of books at an affordable price. Archana has helped multiple times to choose the age appropriate right book."
  },
  {
    id: 7,
    name: "Bargavi",
    location: "Chennai",
    text: "Very very easy and cool shopping experience. All the books I ordered are in perfect condition. I have purchased multiple times and process if payment and delivery is very fast and accurate. My best wishes for your success and great future!!!! Archana is so kind and supportive!!!"
  },
  {
    id: 8,
    name: "Shwetha Shetty",
    location: "Bangalore",
    text: "I’ve been purchasing books from Archana for a while now, and every interaction has been a delight! Their collection is thoughtfully curated, offering a treasure trove of classics, rare finds, and contemporary gems at unbeatable prices. Each book I’ve received has been in excellent condition, and their prompt and friendly service makes the entire experience seamless."
  }
];

export { heroImg };
