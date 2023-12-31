// ************** Show Products ***************

let products = [
    {
        'name': 'DSLR Camera',
        'price': '150.00',
        'image': 'img/product-1.jpg',
        'sku': 'dslr_camera',
    },
    {
        'name': 'Men Shirt',
        'price': '120.00',
        'image': 'img/product-2.jpg',
        'sku': 'men_shirt',
    },
    {
        'name': 'Electric Lamp',
        'price': '200.00', 
        'image': 'img/product-3.jpg',
        'sku': 'elec_lamp'
    },
    {
        'name': 'Sport Shoes', 
        'price': '123.00', 
        'image': 'img/product-4.jpg',
        'sku': 'sports_shoes'
    },
    {
        'name': 'Drone Camera', 
        'price': '123.00', 
        'image': 'img/product-5.jpg',
        'sku': 'drone_camera'
    },
    {
        'name': 'Smart Watch', 
        'price': '123.00', 
        'image': 'img/product-6.jpg',
        'sku': 'smart_watch'
    },
    {
        'name': 'Women Top', 
        'price': '23.00', 
        'image': 'img/product-7.jpg',
        'sku': 'women_top'
    },
    {
        'name': 'Beauty Kit', 
        'price': '50.00', 
        'image': 'img/product-8.jpg',
        'sku': 'beauty_kit'
    },
]

function showProducts(){
    let show_products = document.getElementById("show_products");
    products.forEach(product => {
        row = '<div class="col-lg-3 col-md-4 col-sm-6 pb-1">' +
                    '<div class="product-item bg-light mb-4">' +
                        '<div class="product-img position-relative overflow-hidden">' +
                            '<img class="img-fluid w-100" src="' + product['image'] + '" alt="">' +
                            '<div class="product-action">' +
                                '<a class="btn btn-outline-dark btn-square" onclick="addToCart(' + '`' + product['name'] + '`,`' + product['price'] + '`,`' + product['image'] + '`' + ')" href="javascript:void(0)"><i class="fa fa-shopping-cart"></i></a>' +
                                '<a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>' +
                                '<a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>' +
                            '</div>' +
                        '</div>' +
                        '<div class="text-center py-4">' +
                            '<a class="h6 text-decoration-none text-truncate" href="detail.html?prod_name=' + product['sku'] + '">' + product['name'] + '</a>' +
                            '<div class="d-flex align-items-center justify-content-center mt-2">' +
                                '<h5>$' + product['price'] + '</h5><h6 class="text-muted ml-2"><del>$150.00</del></h6>' +
                            '</div>' +
                            '<div class="d-flex align-items-center justify-content-center mb-1">' +
                                '<small class="fa fa-star text-primary mr-1"></small>' +
                                '<small class="fa fa-star text-primary mr-1"></small>' +
                                '<small class="fa fa-star text-primary mr-1"></small>' +
                                '<small class="fa fa-star text-primary mr-1"></small>' +
                                '<small class="fa fa-star text-primary mr-1"></small>' +
                                '<small>(99)</small>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        show_products.innerHTML += row;
    });
}

// ************** Add to Cart Button Click ***************

        
        // Initialize the cart object
        let cart = {};

        // Load cart data from local storage when the page loads
        function loadCartData() {
            //alert("this is alert !");
            debugger;
            const cartData = JSON.parse(localStorage.getItem('cartData'));
            for (const product in cartData) {
                cart[product] = cartData[product];
            }

            // Update the cart icon counter when the page loads
            debugger;
            updateCounter();
        };

        // Function to add a product to the cart
        function addToCart(name, price, image) {
            product = JSON.stringify([name, price, image]);
            if (!cart[product]) {
                debugger;
                cart[product] = 1;
            }
            // Save the cart data to local storage
            localStorage.setItem('cartData', JSON.stringify(cart));

            // Update the cart icon counter and save the cart data to local storage
            updateCounter();
        }

        // Function to update the cart icon counter and save cart data
        function updateCounter() {
            //alert("hello babdy");
            let counter = 0;

            for(const product in cart){
                counter += 1;
            }

            // Update the cart icon counter in the DOM
            let cart_icon_counter = document.getElementsByClassName("cart_counter");
            //console.log(cart_icon_counter);
            for (let i = 0; i < cart_icon_counter.length; i++) {
                debugger;
                cart_icon_counter[i].innerHTML = counter;
            }
        }


        // Function to clear localStorage
        function clearLocalStorage() {
            localStorage.removeItem('cartData'); // Clear the specific item related to the cart
            // You can add additional items to clear if needed
        }

        // Listen for the beforeunload event
        // window.addEventListener('beforeunload', function (event) {
        //     clearLocalStorage();
        // });



    // ********** Show Cart Items ************ 

    function showCartItems() {
        let show_cart_items = document.getElementById("cart_items");
        show_cart_items.innerHTML = '';
        let cart_items = JSON.parse(localStorage.getItem('cartData'));
        let subtotal = 0;
        for (const [key, value] of Object.entries(cart_items)){
            let item = JSON.parse(key);
            subtotal += parseFloat(item[1]) * value
            row = '<tr>' +
                        ' <td class="align-middle"><img src="' + item[2] + '" alt="" style="width: 50px;"> ' + item[0] + '</td>' +
                        '<td class="align-middle">$' + item[1] + '</td>' +
                        '<td class="align-middle">' +
                            '<div class="input-group quantity mx-auto" style="width: 100px;">' +
                                '<div class="input-group-btn">' +
                                    '<button class="btn btn-sm btn-primary btn-minus" onclick="decQty(' + '`' + item[0] + '`,`' + item[1] + '`,`' + item[2] + '`' + ')">' +
                                    '<i class="fa fa-minus"></i>' +
                                    '</button>' +
                                '</div>' +
                                '<input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="' + value + '">' +
                                '<div class="input-group-btn">' +
                                    '<button class="btn btn-sm btn-primary btn-plus" onclick="incQty(' + '`' + item[0] + '`,`' + item[1] + '`,`' + item[2] + '`' + ')">' +
                                        '<i class="fa fa-plus"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</td>' +
                        '<td class="align-middle">$' + parseFloat(item[1]) * value + '</td>' +
                        '<td class="align-middle"><button class="btn btn-sm btn-danger" onclick="removeItem(' + '`' + item[0] + '`,`' + item[1] + '`,`' + item[2] + '`' + ')" ><i class="fa fa-times"></i></button></td>' +
                    '</tr>';
            show_cart_items.innerHTML += row;
        }
        localStorage.setItem('total_amount', JSON.stringify(subtotal));
       // debugger;
       totalAmount();
        
    }

    function totalAmount() {
        let sub_total = document.getElementsByClassName("subtotal");
        let tyb_total = document.getElementsByClassName("total");
        //alert("this is alert");
        // Assuming subtotal is calculated somewhere in your code
        //let subtotal = 100; // For example, assigning a value

        let subtotal = JSON.parse(localStorage.getItem('total_amount'));

        for (let i in sub_total) {
            if (sub_total.hasOwnProperty(i)) {
                sub_total[i].innerHTML = '$' + subtotal;
            }
        }

        for (let j in tyb_total) {
            if (tyb_total.hasOwnProperty(j)) {
                tyb_total[j].innerHTML = '$' + (subtotal + 10);
            }
        }
    }

    function incQty(name, price, image){
        product = JSON.stringify([name, price, image]);
        if (cart[product]) {
            debugger;
            cart[product] += 1;
        }
        localStorage.setItem('cartData', JSON.stringify(cart));
        showCartItems();
    }

    function decQty(name, price, image){
        product = JSON.stringify([name, price, image]);
        if (cart[product]) {
            debugger;
            if(cart[product]>1){
                cart[product] -= 1;
            }
        }
        localStorage.setItem('cartData', JSON.stringify(cart));
        showCartItems();
    }

    function removeItem(name, price, image){
        product = JSON.stringify([name, price, image]);
        if (cart[product]) {
            debugger;
            delete cart[product]
        }
        localStorage.setItem('cartData', JSON.stringify(cart));
        showCartItems();
        updateCounter();
    }
        
    // ********** Product Detail Functionality ************ 

        // declaring function for product detail must required 
        function detailProduct(detail) {
            debugger;
           const randomQueryParam = Date.now();
            window.location.href = `detail.html?prod_name=${detail}&cache=${randomQueryParam}`;
            sessionStorage.setItem('product_name',detail);
            //console.log("index page "+detail);
        }

        function checkProductDetail() {
            debugger;
            const urlParams = new URLSearchParams(window.location.search);
            // console.log(window.location.search);
            // console.log(urlParams);
            const product_name = urlParams.get('prod_name') || sessionStorage.getItem('product_name');
            // const product_name = sessionStorage.getItem('product_name');
            switch (product_name) {
                
                case 'dslr_camera':
                    document.getElementById("dslr_camera").classList.remove("d-none");
                    break;
                case 'men_shirt':
                    document.getElementById("shirt_main").classList.remove("d-none");
                    break;
                case 'elec_lamp':
                    document.getElementById('elect_lamp').classList.remove("d-none");
                    break;
                case 'sports_shoes':
                    document.getElementById('sport_shoes').classList.remove("d-none");
                    break;
                case 'drone_camera':
                    document.getElementById('drone_Camera').classList.remove("d-none");
                    break;
                case 'smart_watch':
                    document.getElementById('smart_watch').classList.remove("d-none");
                    break;
                case 'women_top':
                    document.getElementById('women_top').classList.remove("d-none");
                    break;
                case 'beauty_kit':
                    document.getElementById('women_kit').classList.remove("d-none");
                    break;
                default:
                    break;
            }
        }
        
        // function goBack() {
        //     window.location.href = "index.html"; // Navigate back to the index page
        // }
        


(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    
})(jQuery);

