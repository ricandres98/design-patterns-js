class Product {
    constructor(
        private id: number,
        private name: string,
        private cost: number
    ) {}

    getName(): string {
        return this.name;
    }

    getCost(): number {
        return this.cost;
    }

    getId(): number {
        return this.id;
    }
}

class ShoppingCar {
    private static instance: ShoppingCar;
    public products: Product[] = [];

    private constructor() {}

    static getInstance() {
        if(!this.instance) {
            this.instance = new ShoppingCar();
        }

        return this.instance;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    deleteById(id: number): void {
        const index = this.products.findIndex((product) => product.getId() === id);
        this.products.splice(index, 1);
    }
}

const car1 = ShoppingCar.getInstance();
const car2 = ShoppingCar.getInstance();

const product1 = new Product(1, "carrito", 20);
const product2 = new Product(2, "juguete", 30);
const product3 = new Product(3, "arepa", 5);

car1.addProduct(product2);
car1.addProduct(product3);
car1.addProduct(product1);

car2.deleteById(2);

console.log(car2.products);