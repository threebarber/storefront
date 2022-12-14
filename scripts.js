const date = new Date();
const productList = [];
const storeDiv = document.querySelector(".store");

const product = function (id, title, price, description, category, image, rating) {
    /*this.sayHello = () => console.log('hello!');*/

    this.id = id;
    this.title = title;
    this.price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }).format(price);
      
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = Math.round(rating);
};


const utils = (() => {

    const log = (msg) => console.log(`${date.toLocaleTimeString()} - ${msg}`)

    const retrieveProducts = async function () {

        fetch('https://fakestoreapi.com/products', {
            method: 'get',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            }

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            data.forEach(p => {
                let newProd = new product(p.id, p.title, p.price, p.description, p.category, p.image, p["rating"]["rate"]);
                productList.push(newProd);
                utils.log(`Added product ${newProd.title} to list - current products ${productList.length}`);
            })
        }).then(function () {
            utils.displayProducts(productList);
        });

    }

    const displayProducts = function (prodList) {

        storeDiv.innerHTML = "";

        prodList.forEach(prod => {

            utils.log(`Displaying ${prod.title}`);

            var prodDiv = document.createElement("div");
            prodDiv.classList.add("productDiv");
            prodDiv.setAttribute("id", prod.id);


            var prodOverlay = document.createElement("div");
            prodOverlay.classList.add("productOverlay");

            var prodImgDiv = document.createElement("div");
            prodImgDiv.classList.add("productImageDiv");
            prodImgDiv.style.backgroundImage = `url('${prod.image}')`


            var prodTitleElem = document.createElement("h4");
            prodTitleElem.innerText = prod.title;



            var prodPriceElem = document.createElement("p");
            prodPriceElem.innerText = `${prod.price}`


            prodOverlay.appendChild(prodTitleElem);


            var prodRatingDiv = document.createElement("div");
            prodRatingDiv.classList.add("productRatingDiv")

            let i = 0;

            while (i <= prod.rating) {
                prodRatingDiv.innerHTML += (`<span class="fa fa-star"></span>`)
                i++;
            }


            prodOverlay.appendChild(prodRatingDiv);

            prodOverlay.appendChild(prodPriceElem);

            prodOverlay.onclick = function () {
                utils.showModal(prod.id);

            }


            prodImgDiv.appendChild(prodOverlay);


            /*prodImgDiv.appendChild(prodImgElement);*/

            prodDiv.appendChild(prodImgDiv);

            storeDiv.appendChild(prodDiv)


        });
    }

    const showModal = function (prodId) {

        const prod = productList.find(x => x.id == prodId);

        utils.log(`Displaying modal for product ${prod.title} ID: ${prod.id}`);

        var modal = document.querySelector(".modal");

        var modalDiv = document.querySelector(".modalContentDiv");

        var prodImgDiv = document.createElement("div");
        prodImgDiv.classList.add("modalImageDiv");
        prodImgDiv.style.backgroundImage = `url('${prod.image}')`



        var modalTextDiv = document.createElement("div");
        modalTextDiv.classList.add("modalTextDiv");

        var modalTextTitle = document.createElement("h2");
        modalTextTitle.innerText = prod.title;

        var modaltextPrice = document.createElement("h4");
        modaltextPrice.innerText = `${prod.price}`


        var prodRatingDiv = document.createElement("div");
        prodRatingDiv.classList.add("productRatingDiv")

        let i = 0;

        while (i <= prod.rating) {
            prodRatingDiv.innerHTML += (`<span class="fa fa-star"></span>`)
            i++;
        }


        var modalTextDescription = document.createElement("h3");
        modalTextDescription.innerText = prod.description;


        var modalCloseElement = document.createElement("span")
        modalCloseElement.classList.add("close");
        modalCloseElement.innerText = "X";


        modalCloseElement.onclick = function () {
            modal.style.display = "none";
            modalDiv.innerHTML = '';

        }


        var modalAtcButton = document.createElement("button");
        modalAtcButton.classList.add("btn");
        
        modalAtcButton.innerHTML = `<i style="padding-right:10px;" class="fas fa-shopping-cart"></i>ADD TO CART `;

        modalTextDiv.appendChild(modalCloseElement);
        modalTextDiv.appendChild(modalTextTitle);
        modalTextDiv.appendChild(modaltextPrice);
        modalTextDiv.appendChild(prodRatingDiv);
        modalTextDiv.appendChild(modalTextDescription);
        modalTextDiv.appendChild(modalAtcButton);


        modalDiv.appendChild(prodImgDiv);
        modalDiv.appendChild(modalTextDiv);


        /*modalDiv.appendChild(modalCloseElement);*/


        modal.style.display = "flex";
    }


    const addCategoryListeners = function () {

        document.querySelectorAll('input').forEach(item => {
            item.addEventListener('click', event => {
                utils.log(`Clicked radio value: ${event.currentTarget.value}`)
                document.querySelector("#clearButton").style.display = "block";
                utils.displayFilteredProducts(event.currentTarget.value);
            })
        })


        document.querySelector("#clearButton").addEventListener('click', event => {          
            utils.log("Clearing categories");
            clearFilters();
        })
    }


    const clearFilters = function(){

        document.querySelector("#clearButton").style.display = "none";

        document.querySelectorAll('input').forEach(item => {
            item.checked = false;
        })

        displayProducts(productList);

    }

    const filterProducts = function (category){
        
        var filteredProducts = productList.filter(function (prod) {
            return prod.category == category;
          });

        return filteredProducts;
    }

    const displayFilteredProducts = function(category){
        
        var filteredProducts = utils.filterProducts(category);

        utils.log(`${filteredProducts.length} matched filter for category: ${category}`);


        displayProducts(filteredProducts);

    }

    return {
        clearFilters,
        displayFilteredProducts,
        filterProducts,
        addCategoryListeners,
        showModal,
        displayProducts,
        log,
        retrieveProducts
    };

})();



utils.retrieveProducts();
utils.addCategoryListeners();

/*const loopTime = 10;

for (let i = 0; i < loopTime; i++) {
    const storeDiv = document.querySelector(".store");
    let newDiv = document.createElement("div");
    let newH3 = document.createElement("h3");
    newH3.innerText = "words";

    newDiv.appendChild(newH3);
    storeDiv.appendChild(newDiv);

}

*/






