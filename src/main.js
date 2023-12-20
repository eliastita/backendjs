const fs = {
    fs: require('node:fs'),
    // Add your other functions and variables here
};

class ProductManager {
    constructor() {
        this.products = [];
        this.path="./products.json"
    }

    async addProduct2(product) {
        let productJSON = JSON.stringify(product, null, 0)

        await fs.fs.writeFile(this.path, productJSON)
            .then(() => console.log("producto agregado al archivo JSON"))
            .catch(error => console.log("algo ha ocurrido, se cancelo la operacion." + error))
            .finally(console.log(this.getProducts()))

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

            // Agregar el produccto al archivo JSON
            this.addProduct2(this.getProducts())
        }else throw new Error("los campos deben estar completos")
    }

    async getProducts2() {
        await fs.fs.readFile(this.path)
           .then(data => console.log(JSON.parse(data)))
           .catch(err => console.log(err))
           .finally(console.log("servicio finalizado."))

        //const products = await fs.readFile('./products.json', 'utf-8')
        //    .then(data => JSON.parse(data));
        //console.log(products);
    }

    async getProductById2(id) {
        const products = await fs.fs.readFile(this.path, 'utf-8');
        const vector = JSON.parse(products)
        try {
            console.log("==============")
            const band = vector.find((prod)=> prod.id===id)

            if (band)console.log(band)
            else console.log("no encontrado")
        } catch (error){
            console.log("error:  ´" + error)
        }

    }



    async updateProduct2(id, product ) {
        //crear vector
        let productos = this.transformar()


        //saber indice
        const indice = productos.findIndex((product)=> product.id === id)

        // Si el producto no existe, lanzamos un error
        if (indice ===-1) {
            throw new Error(`No se encontró el producto con el id ${id}`)
        }


        productos[indice].title =product.title
        productos[indice].thumbnail =product.thumbnail
        productos[indice].stock =product.stock
        productos[indice].code =product.code
        productos[indice].description =product.description
        productos[indice].price =product.price

        // Volvemos a escribir el archivo JSON con el producto actualizado
        await fs.fs.writeFileSync(this.path, JSON.stringify(productos))



        console.log(this.transformar())
    }



    deleteProduct = (id) => {
        try{
            const data = this.transformar()
            console.log(data[0].id)
            const productoId = data.findIndex(prod => prod.id===id)
            console.log(productoId)
            if (productoId!=-1){
                data.splice(productoId,1)
                fs.fs.writeFileSync(this.path,JSON.stringify(data,null,2),"utf-8")
                return console.log("Elemento borrado exitosamente")
            } else {
                return console.log("Id not found")
            }

        } catch (err) {
            console.log(err)
        }
    }

    getProducts() {
        return this.products;
    }

    transformar = () => {
        const dataJson = fs.fs.readFileSync(this.path, "utf-8")

        const vector = JSON.parse(dataJson)
        return vector
    }


    getProductById(id) {
        for (const product of this.products) {
            if (product.id === id) {
                return product;
            }
        }

        throw new Error("No se encontró el producto con el id especificado");

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

//entidad en java
const product1=new Product("pc","Producto electronico",600000,"x",100,1)
const product2=new Product("celular","Producto electronico",400000,"x",101,2)

const productPrueba=new Product("prueba","prueba electronico",4200,"z",111,8)


//servicio en java
const pm = new ProductManager()



