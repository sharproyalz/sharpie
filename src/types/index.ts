interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}

interface Rating {
  rate: number;
  count: number;
}
