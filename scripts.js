const date = new Date();

const productList = [];

const product = function (id, title, price, description, category, image, rating) {
    /*this.sayHello = () => console.log('hello!');*/

    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = rating;
};


const utils = (() => {

    const log = (msg) => console.log(`${date.toLocaleTimeString()} - ${msg}`)

    const retrieveProducts = async function () {

        fetch('https://fakestoreapi.com/products', {
            method: 'get'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            data.forEach(p => {
                let newProd = new product(p.id, p.title, p.price, p.description, p.category, p.image, p.rating);
                productList.push(newProd);
                utils.log(`Added product ${newProd.title} to list - current products ${productList.length}`);
            });
        });

    }

    const displayProducts = function (prodList) {

    }




    return {
        displayProducts,
        log,
        retrieveProducts
    };
    
})();


utils.retrieveProducts();



const loopTime = 10;

for (let i = 0; i < loopTime; i++) {
    const storeDiv = document.querySelector(".store");
    let newDiv = document.createElement("div");
    let newH3 = document.createElement("h3");
    newH3.innerText = "words";

    newDiv.appendChild(newH3);
    storeDiv.appendChild(newDiv);

}








