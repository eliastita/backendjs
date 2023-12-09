class ProductManager {
    constructor() {
        this.products = [];
    }



    addProduct(product) {
        // Validar que todos los campos sean obligatorios

        if (product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock){
            // Validar que no se repita el campo "code"
            for (const existingProduct of this.products) {
                if (existingProduct.code === product.code) {
                    throw new Error("El código del producto ya existe");
                }
            }

            // Crear el producto con un id autoincrementable
            product.id =  this.products.length + 1;

            // Agregar el producto al arreglo
            this.products.push(product);
        }else throw new Error("los campos deben estar completos")
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        for (const product of this.products) {
            if (product.id === id) {
                return product;
            }
        }

        console.log("No se encontró el producto con el id especificado");

    }
}

class Product {
    constructor(title,description,price,thumbnail,code,stock){
        this.title=title
        this.thumbnail=thumbnail
        this.price=price
        this.stock=stock
        this.code=code
        this.description=description
    }
}
