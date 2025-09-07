interface CartItemDto {
  id?: number;
  userId: string;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;

}