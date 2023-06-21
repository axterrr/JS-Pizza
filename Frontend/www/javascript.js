const pizza_list = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:true

    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:17,
        icon:'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id:43,
        icon:'assets/images/pizza_6.jpg',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id:90,
        icon:'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size:{
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id:6,
        icon:'assets/images/pizza_4.jpg',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        }
    }
];

window.addEventListener('load', function (){
    const storedData = localStorage.getItem('orderList');
    let orderList = [];
    if (storedData) orderList = JSON.parse(storedData);
    else localStorage.setItem('orderList', JSON.stringify([]));
    orderList.forEach(card => addOrderCard(card.pizza, card.big_size, card.number));

    pizza_list.forEach(pizza => addPizzaCard(pizza));
    refreshPizzaListCounter();
    refreshOrderListCounter();
    refreshGeneralSum();

    document.getElementsByClassName('order-clean-button')[0].addEventListener('click', clearOrder);
    for(let button of document.getElementsByClassName('container-menu-button')) {
        button.addEventListener('click', filter);
    }
});

function addPizzaCard(pizza) {
    const newItem = document.createElement('div');
    newItem.className = "pizza-card";
    newItem.id = "pizza"+pizza.id;

    if(pizza.is_new) newItem.classList.add('new');
    else if(pizza.is_popular) newItem.classList.add('popular');

    let content = [];
    Object.values(pizza.content).forEach(array => content = content.concat(array));

    let contentString = content.join(', ');
    contentString = contentString.charAt(0).toUpperCase() + contentString.slice(1);

    newItem.innerHTML = `
        <img src="${pizza.icon}" alt="pizza image" class="pizza-card-image">
        <div class="pizza-card-caption">
            <h3 class="pizza-card-name">${pizza.title}</h3>
            <span class="pizza-card-type">${pizza.type}</span>
            <p class="pizza-card-description">${contentString}</p>

            <div class="pizza-card-buy"></div>
        </div>
    `;

    if(pizza.small_size) {
        const small_pizza = document.createElement('div');
        small_pizza.className = 'pizza-card-buy-size';

        small_pizza.innerHTML = `
            <div class="pizza-size">
                <img src="assets/images/size-icon.svg" alt="size" class="size-icon">
                <span class="size-number">${pizza.small_size.size}</span>
            </div>

            <div class="pizza-weight">
                <img src="assets/images/weight.svg" alt="weight" class="weight-icon">
                <span class="weight-number">${pizza.small_size.weight}</span>
            </div>

            <span class="pizza-card-size-price-number">${pizza.small_size.price}</span>
            <span class="pizza-card-size-price-text">грн.</span>
            <button class="buy-button">Купити</button>
        `;

        small_pizza.getElementsByClassName('buy-button')[0].addEventListener('click', function(){buyPizza(pizza, false)});

        newItem.getElementsByClassName('pizza-card-buy')[0].appendChild(small_pizza);
    }

    if(pizza.big_size) {
        const big_pizza = document.createElement('div');
        big_pizza.className = 'pizza-card-buy-size';

        big_pizza.innerHTML = `
            <div class="pizza-size">
                <img src="assets/images/size-icon.svg" alt="size" class="size-icon">
                <span class="size-number">${pizza.big_size.size}</span>
            </div>

            <div class="pizza-weight">
                <img src="assets/images/weight.svg" alt="weight" class="weight-icon">
                <span class="weight-number">${pizza.big_size.weight}</span>
            </div>

            <span class="pizza-card-size-price-number">${pizza.big_size.price}</span>
            <span class="pizza-card-size-price-text">грн.</span>
            <button class="buy-button">Купити</button>
        `;

        big_pizza.getElementsByClassName('buy-button')[0].addEventListener('click',function(){buyPizza(pizza, true)});

        newItem.getElementsByClassName('pizza-card-buy')[0].appendChild(big_pizza);
    }

    document.getElementsByClassName('container-pizzas')[0].appendChild(newItem);
}

function buyPizza(pizza, big_size) {
    const pizzaCard = document.getElementById("order"+pizza.id+big_size);
    if(!pizzaCard) {
        let orderList = JSON.parse(localStorage.getItem('orderList'));
        orderList.push({
            pizza: pizza,
            big_size: big_size,
            number: 1
        })
        localStorage.setItem('orderList', JSON.stringify(orderList));

        addOrderCard(pizza, big_size, 1);
        refreshOrderListCounter();
        refreshGeneralSum();
    }
    else addPizza(pizzaCard, pizza, big_size);
}

function addOrderCard(pizza, big_size, number) {
    const newItem = document.createElement('div');
    newItem.className = "order-card";
    newItem.id = "order"+pizza.id+big_size;

    newItem.innerHTML = `
        <div class="order-card-content">
            <span class="order-card-pizza-name">${pizza.title} (${big_size ? "Велика" : "Мала"})</span>
    
            <div class="order-card-pizza-data">
                <div class="pizza-size">
                    <img src="assets/images/size-icon.svg" alt="size" class="size-icon">
                    <span class="size-number">${big_size ? pizza.big_size.size : pizza.small_size.size}</span>
                </div>
                <div class="pizza-weight">
                    <img src="assets/images/weight.svg" alt="weight" class="weight-icon">
                    <span class="weight-number">${big_size ? pizza.big_size.weight : pizza.small_size.weight}</span>
                </div>
            </div>
    
            <div class="order-card-pizza-buttons">
                <span class="order-card-pizza-price">
                    <span class="order-card-pizza-price-number">${(big_size ? pizza.big_size.price : pizza.small_size.price) * number}</span>грн
                </span>
                <div class="order-card-pizza-amount">
                    <button class="order-card-minus">-</button>
                    <span class="order-card-pizza-number">${number}</span>
                    <button class="order-card-plus">+</button>
                </div>
                <button class="order-card-delete">×</button>
            </div>
        </div>
        <img src="${pizza.icon}" alt="pizza image" class="order-card-pizza-image">
    `;

    newItem.getElementsByClassName('order-card-plus')[0].addEventListener('click', function(){addPizza(newItem, pizza, big_size)});
    newItem.getElementsByClassName('order-card-minus')[0].addEventListener('click', function(){removePizza(newItem, pizza, big_size)});
    newItem.getElementsByClassName('order-card-delete')[0].addEventListener('click', function(){removeOrderCard(newItem, pizza, big_size)});

    document.getElementsByClassName('order-main')[0].appendChild(newItem);
}

function addPizza(pizzaCard, pizza, big_size) {
    const newValue = parseInt(pizzaCard.getElementsByClassName("order-card-pizza-number")[0].textContent) + 1;
    pizzaCard.getElementsByClassName("order-card-pizza-number")[0].textContent = newValue;

    const cost = big_size ? pizza.big_size.price : pizza.small_size.price;
    pizzaCard.getElementsByClassName("order-card-pizza-price-number")[0].textContent = newValue * cost;

    let orderList = JSON.parse(localStorage.getItem('orderList'));
    const index = orderList.findIndex(card => card.pizza.title === pizza.title && card.big_size === big_size);
    orderList[index].number = newValue;
    localStorage.setItem('orderList', JSON.stringify(orderList));

    refreshGeneralSum();
}

function removePizza(pizzaCard, pizza, big_size) {
    const newValue = parseInt(pizzaCard.getElementsByClassName("order-card-pizza-number")[0].textContent) - 1;
    pizzaCard.getElementsByClassName("order-card-pizza-number")[0].textContent = newValue;

    const cost = big_size ? pizza.big_size.price : pizza.small_size.price;
    pizzaCard.getElementsByClassName("order-card-pizza-price-number")[0].textContent = newValue * cost;

    if(parseInt(pizzaCard.getElementsByClassName("order-card-pizza-number")[0].textContent) === 0) removeOrderCard(pizzaCard, pizza, big_size);
    else {
        let orderList = JSON.parse(localStorage.getItem('orderList'));
        const index = orderList.findIndex(card => card.pizza.title === pizza.title && card.big_size === big_size);
        orderList[index].number = newValue;
        localStorage.setItem('orderList', JSON.stringify(orderList));

        refreshGeneralSum();
    }
}

function removeOrderCard(pizzaCard, pizza, big_size) {
    pizzaCard.parentElement.removeChild(pizzaCard);

    let orderList = JSON.parse(localStorage.getItem('orderList'));
    orderList = orderList.filter(card => card.pizza.title !== pizza.title || card.big_size !== big_size);
    localStorage.setItem('orderList', JSON.stringify(orderList));

    refreshOrderListCounter();
    refreshGeneralSum();
}

function clearOrder() {
    document.getElementsByClassName('order-main')[0].innerHTML = '';

    localStorage.setItem('orderList', JSON.stringify([]));

    refreshOrderListCounter();
    refreshGeneralSum();
}

function refreshOrderListCounter() {
    document.getElementsByClassName('order-pizza-number')[0].textContent = document.getElementsByClassName('order-card').length.toString();
}

function refreshPizzaListCounter() {
    document.getElementsByClassName('pizza-number')[0].textContent = document.getElementsByClassName('pizza-card').length.toString();
}

function refreshGeneralSum() {
    let sum = 0;
    for(let pizzaCard of document.getElementsByClassName('order-card')) {
        sum += parseInt(pizzaCard.getElementsByClassName("order-card-pizza-price-number")[0].textContent);
    }
    document.getElementsByClassName('order-sum-number')[0].textContent = sum.toString();
}

function filter(event) {
    const button = event.target;
    if(!button.classList.contains('inactive')) {
        document.getElementsByClassName('container-pizzas')[0].textContent = '';
        let newPizzaList;

        if(button.classList.contains('all')) newPizzaList = pizza_list;
        if(button.classList.contains('meat')) newPizzaList = pizza_list.filter(pizza => pizza.content.meat);
        if(button.classList.contains('pineapples')) newPizzaList = pizza_list.filter(pizza => pizza.content.pineapple);
        if(button.classList.contains('mushrooms')) newPizzaList = pizza_list.filter(pizza => pizza.content.mushroom);
        if(button.classList.contains('seafood')) newPizzaList = pizza_list.filter(pizza => pizza.content.ocean);
        if(button.classList.contains('vega')) newPizzaList = pizza_list.filter(pizza => !pizza.content.meat && !pizza.content.ocean);

        newPizzaList.forEach(pizza => addPizzaCard(pizza));

        document.getElementsByClassName('inactive')[0].classList.remove('inactive');
        button.classList.add('inactive');

        refreshPizzaListCounter();
    }
}