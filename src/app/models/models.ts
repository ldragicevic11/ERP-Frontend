export interface SuggestedProduct {
    banerImage: string;
}

export interface NavigationItem {
    category: string;
}

export interface Product {
    productID: number;
    name: string;
    model: string;
    price: number;
    discount: number;
    description: string;
    onStock: number;
    guarantee: string;
  }

  export interface ProductDTO {
    productId: number;
    name: string;
    model: string;
    price: number;
    discount: number;
    description: string;
    onStock: number;
  }
  

  export interface User {
    userId: number;
    email: string;
    name: string;
    userName: string;
    address: string;
    contact: number;
    password: string;
    city: string;
    userTypeId: number;
  }

  export interface LoggedUser {
    id: number;
    email: string;
    userTypeId: UserType;
  }
  
  export interface UserType {
    id: number;
  }  

  export interface Review {
    id: number;
    comment: string;
    user: User;
    userName: string;
    product: Product;  
  }  


  export interface CartItem {
    id: number;
    product: ProductDTO;
  }
  
  export interface Cart {
    id: number;
    user: User;
    cartItems: CartItem[];
    isActive: boolean;
  }

  export interface Payment {
    PaymentId: number;
    user: User;
    paymentMethod: string;
    totalAmount: number;
    shipingCharges: number;
    amountReduced: number;
    amountPaid: number;
  }

  export interface Order {
    OrderId: number;
    user: User;
    cart: Cart;
    payment: Payment;
  }   