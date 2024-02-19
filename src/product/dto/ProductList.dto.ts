class ListFeatureProductDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ProductListDTO {
  id: string;
  userId: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  category: string;
  characteristics: ListFeatureProductDTO[];
  image: ListImageProductDTO[];
}
