// ZMIENNE: formularz
const inputProducts = document.getElementById("products");
const inputOrders = document.getElementById("orders");
const select = document.getElementById("package");
const selectInput = select.querySelector(".select__input");
const selectList = document.querySelector(".select__dropdown").children;
const firstCheckbox = document.getElementById("accounting");
const secondCheckbox = document.getElementById("terminal");

// ZMIENNE: kalkulator
const listOfProducts = document.querySelectorAll(".list__item");
const total = document.getElementById("total-price");
const totalPrice = total.querySelector(".total__price");
const summary = document.querySelectorAll(".item__price");

//FUNKCJA: dodanie klasy open--calc
function dataID(dataID) {
    listOfProducts.forEach(function (element) {
        if (dataID == element.dataset.id) {
            element.classList.add("open--calc");
        }
    });
    total.classList.add("open--calc");
}

//FUNKCJA: dot. products i orders
function reactProductsAndOrders(numberOfProducts, index, price) {
    listOfProducts[index].querySelector(".item__calc").innerText = numberOfProducts + " * $" + price;
    listOfProducts[index].querySelector(".item__price").innerText = "$" + (numberOfProducts * price);

    //Walidacja pola
    if (numberOfProducts <= 0 || numberOfProducts.includes(".")) {
        listOfProducts[index].classList.remove("open--calc");
    };
}

//FUNKCJA: dot. checkbox + toggle klasy open-calc
function reactCheckbox(dataID, price) {
    listOfProducts.forEach(function (element) {
        if (dataID == element.dataset.id) {
            element.classList.toggle("open--calc");
            if ([...element.classList].includes('open--calc')) {
                element.querySelector(".item__price").innerText = "$" + price;
            } else {
                element.querySelector(".item__price").innerText = "$" + 0;
            }
        }
    });
    total.classList.add("open--calc");
}

//FUNKCJA: zliczanie cen w totalprice
summary.forEach(function (element) {
    element.textContent = 0;
});

function resultPrice() {
    let number = 0;
    let result = 0;
    summary.forEach(function (element) {
        number = parseFloat((element.textContent).slice(1, (element.textContent).length));
        if (Number.isNaN(number)) {
            number = 0;
        }
        result = result + number;
    });
    totalPrice.innerText = "$" + result;

    //usuwanie klasy open-calc w zależności od totalprice
    if (selectInput.innerText == "Basic") {
        total.classList.add("open--calc");
    } else if (result == 0) {
        total.classList.remove("open--calc");
    }
};

//FUNKCJA: zbierająca funkcje do nasłuchiwania przez procduts i orders
function eventListenerProductsAndOrders(dataID2, numberOfProducts, index, price) {
    dataID(dataID2);
    reactProductsAndOrders(numberOfProducts, index, price);
    resultPrice();
}

// NASŁUCHIWANIE: products
inputProducts.addEventListener("keyup", function () {
    eventListenerProductsAndOrders("products", inputProducts.value, 0, 0.5);
});
inputProducts.addEventListener("change", function () {
    eventListenerProductsAndOrders("products", inputProducts.value, 0, 0.5);
});

// NASŁUCHIWANIE: orders
inputOrders.addEventListener("keyup", function () {
    eventListenerProductsAndOrders("orders", inputOrders.value, 1, 0.25);
});
inputOrders.addEventListener("change", function () {
    eventListenerProductsAndOrders("orders", inputOrders.value, 1, 0.25);
});

// NASŁUCHIWANIE: select - wysunięcie listy
select.addEventListener("click", function () {
    select.classList.toggle("open--calc");
});

// NASŁUCHIWANIE i FUNKCJA: select - wybranie opcji
for (let i = 0; i < selectList.length; i++) {
    selectList[i].addEventListener("click", function () {
        selectInput.innerText = selectList[i].innerText;
        dataID("package");

        listOfProducts[2].querySelector(".item__calc").innerText = selectInput.innerText;
        if (selectInput.innerText == "Basic") {
            listOfProducts[2].querySelector(".item__price").innerText = "$" + 0;
        } else
        if (selectInput.innerText == "Professional") {
            listOfProducts[2].querySelector(".item__price").innerText = "$" + 25;
        } else {
            listOfProducts[2].querySelector(".item__price").innerText = "$" + 50;
        }
        resultPrice();
    });
};

// NASŁUCHIWANIE: checkboxy
firstCheckbox.addEventListener("click", function () {
    reactCheckbox("accounting", 35);
    resultPrice();
});
secondCheckbox.addEventListener("click", function () {
    reactCheckbox("terminal", 5);
    resultPrice();
});