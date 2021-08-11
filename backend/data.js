import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Tharushi",
      email: "tharushi@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Hasindu",
      email: "hasindu@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      
      name: "Samsung Refrigerator",
      category: "Electronic",
      image: "/images/p1.jpg",
      price: 80000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "Samsung Smart TV",
      category: "Electronic",
      image: "/images/p2.jpg",
      price: 280000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "Panasonic Iron",
      category: "Electronic",
      image: "/images/p3.jpeg",
      price: 8000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "Sony Home Theatre System",
      category: "Electronic",
      image: "/images/p4.jpg",
      price: 49000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "MacBook Pro M1 Chip",
      category: "Electronic",
      image: "/images/p5.jpg",
      price: 385000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "Panasonic Radio",
      category: "Electronic",
      image: "/images/p6.jpg",
      price: 7500,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "IPhone 12 pro max",
      category: "Electronic",
      image: "/images/p7.jpg",
      price: 315000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "Samsung A72",
      category: "Electronic",
      image: "/images/p8.jpg",
      price: 80000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "KDK Table fan",
      category: "Electronic",
      image: "/images/p9.jpg",
      price: 8000,
      countInStock: 10,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
    {
      
      name: "KDK Ceiling Fan",
      category: "Electronic",
      image: "/images/p10.jpg",
      price: 13000,
      countInStock: 0,
      brand: "Samsung",
      rating: "4.5",
      numReviews: "10",
      description: "high quality product",
    },
  ],
};

export default data;
