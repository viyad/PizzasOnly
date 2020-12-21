/**
 * Author Name: Viyada Tarapornsin
 * Version: 1.0
 * Language: JavaScript
 * Company Name: Red Opal Innovations
 * Project Name: Pizza pricing
 * Purpose: To calculate optimal price for pizzas  
 */

 /**
 * When loading form, reset textbox and set focus on the textbox
 */
function LoadForm()
{
    // To declare a quantity DOM object and get the quantity value from the form
    var quantity = document.getElementById("quantity");
    quantity.value = "";
    quantity.focus();
}

/**
 * Check quantity: this function is to validate the input (quantity of pizza)
 * It must not be empty and must be greater than zero.
 * If the input is invalid, display error message accordingly.
 * @return {bool} false after all vaildation complete
 */
function CheckQuantity()
{
    // To declare a quantity DOM object and get the quantity value from the form
    var quantityEle = document.getElementById("quantity");
    var quantity = quantityEle.value;

    // To declare an errMessage DOM object
    var errMessage = document.getElementById("errMessage");
    errMessage.className = "alert-danger";
    errMessage.innerHTML = "";

    // To declare a message DOM object
    var message = document.getElementById("message");
    message.className = "alert-success";
    message.innerHTML = "";

    // To declare a variable to hold a value of true of false based on the value of quantity
    var validQuantity = true;

    // To validation the quantity value
    if (quantity == "")
    {
        errMessage.innerText = "Number of pizzas is required.";
        validQuantity = false;      
    }
    // To check the number of pizzas, it must be numeric
    // If the input is not a number, display a warning message
    else if (isNaN(quantity))
    {
        errMessage.innerText = "Number of pizzas must be a number.";
        validQuantity = false;
    }
    // To check the number of pizzas, it must not greater than 0
    // Otherwise, display a warning message
    else if (quantity <= 0)
    {
        errMessage.innerText = "Number of pizzas must not be less than or equal to 0.";
        validQuantity = false;
    }
    // To check the number of pizzas, it must be an integer
    // If the input is not a number, display a warning message
    //else if (quantity.indexOf(".") != -1)
    else if (!Number.isInteger(Number(quantity)))
    {
        errMessage.innerText = "Number of pizzas must be a whole number.";
        validQuantity = false;
    }
    // If the quantity is valid
    else
    {
        // To instantiate an Order object
        var order = new Order(quantity);
        
        // To display the cost of pizzas to the customer
        message.innerHTML = "<h2>Total cost of " + order.quantity + " pizza(s) is $" + order.calculatePrice() + "</h2>";
        message.innerHTML += "<h4>Thank you for ordering our pizza.</h4>" ;
        validQuantity = true;
    }

    // To check if the quantity input is valid and display colour of the quantity textbox accordingly
    if (validQuantity)
    {
        quantityEle.style.backgroundColor = "white";
    }
    else
    {
        quantityEle.focus();
        quantityEle.style.backgroundColor = "yellow";
    }

    return false;
}

/** Order function (class) 
 * @param {quantity} integer, number of pizzas
 * @return {cost} float, course of pizzas 
 */
function Order(quantity)
{
    // Attributes of Order object
    this.quantity = quantity;
    this.calculatePrice = calculatePrice;

    this.priceOfOne = 6.45;
    this.priceOfTwo = 12;
    this.priceOfThree = 14;

    // CalculatePrice method is to calculate the best total price based on the given quantity
    function calculatePrice()
    {
        // To declare variable and assign its value
        var cost = 0;

        // To get the remainder by dividing the number by 3
        var remainder = quantity % 3;

        // To get the quotient by dividing quantity by 3
        var quotient = Math.floor(quantity / 3);
        
        // To get the cost based on the remainder
        switch (remainder)
        {
            // Two large pizzas will cost $12.00
            case 2:
                cost = quotient * this.priceOfThree + this.priceOfTwo;
                break;
            // One large pizza will cost $6.45
            case 1:
                cost = quotient * this.priceOfThree + this.priceOfOne;
                break;
            // Three large pizzas will cost $14.00.
            case 0:
                cost = quotient * this.priceOfThree;
                break;
        }

        return cost;
    }
}