// Utilizando Programacion Orientada a Objetos
// Clase de Producto
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// Clase de Interfaz
// Interactuara con el HTML
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        // Crear un elemento y agregarlo al anterior
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-3">
            <div class="card-body">
                <stron>Product</stron>: ${product.name}
                <stron>Product Price</stron>: ${product.price}
                <stron>Year</stron>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);
        // Llama al metodo creado abajo, utilizamos this ya que forma
        // parte de la misma clase
        this.resetForm();
    }
    // Limpiar la interfaz despues de agregar un producto
    resetForm() {
        document.getElementById('product-form').reset();
    }
    // Eliminar un producto
    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Succesfully', 'info')
        }
    }
    // Mostrar mensaje de producto agregado
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 7500);
    }
}

// Captura Eventos DOM
// submit
document.getElementById('product-form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    // Nueva instancia de UI, y nos da un nuevo objeto
    const ui = new UI();

    // En caso exista un campo vacio
    if (name === '' || price === '' || year === '') {
        ui.showMessage('Complete Fields Please', 'danger');
    } else {
        // Le mandamos el producto que hemos creado, esto permite mostrarlo en la interfaz
        ui.addProduct(product);
        ui.showMessage('Product Added Succefully', 'success');
    }

    e.preventDefault();
});
// click
document.getElementById('product-list').addEventListener('click', function (e) {
    // Una nueva instancia de UI
    const ui = new UI();
    // Llama al metodo eleminar producto, como parametro le pasamos e.target
    // que verificara que sea delete
    ui.deleteProduct(e.target);
});