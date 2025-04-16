function submitQuery() {
    let query = document.getElementById("searchBox").value.trim();
    if (!query) return;

    showLoader();  // Show the loader first

    setTimeout(() => {
        fetch("/search", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ "query": query })
        })
        .then(response => response.text())
        .then(resultHTML => {
            hideLoaderWithContent(resultHTML);  // Hide loader and show results
        })
        .catch(error => {
            console.error("Search failed:", error);
        });
    }); // optional short delay to give time for loader to appear
}

// Shows the loader by loading from the /loader route
function showLoader() {
    fetch("/loader")
        .then(response => response.text())
        .then(loaderHTML => {
            document.getElementById("results").innerHTML = loaderHTML;
            console.log("LOADER SHOWN");
        })
        .catch(error => console.error("Failed to load loader:", error));
}

// Hides the loader by clearing the results or replacing it
function hideLoaderWithContent(htmlContent) {
    document.getElementById("results").innerHTML = htmlContent;
    console.log("LOADER HIDDEN, RESULTS SHOWN");
}

function clearResults() {
    document.getElementById("results").innerHTML = ""; // Clear the results div
}

document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("searchBox");

    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {  // Check if Enter is pressed
            event.preventDefault();  // Prevent default form submission
            submitQuery();  // Call the existing function to fetch results
        }
    });
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("registerStock")) {
        let ticker = event.target.getAttribute("data-ticker");
        let stockPrice = event.target.getAttribute("data-price");
        let stockName = event.target.getAttribute("stock-name");

        fetch("/register_stock", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ 
                ticker, 
                stockPrice, 
                stockName })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.redirect;  // Force redirect
        })
        .catch(error => console.error("Error:", error));
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("buy_date");
    const stockTickerElement = document.getElementById("stock_ticker");
    const amountInput = document.getElementById("amountInput");
    const costDiv = document.querySelector(".cost");
    const priceDiv = document.querySelector(".current-price");

    if (!dateInput || !stockTickerElement || !amountInput || !costDiv || !priceDiv) return;

    const stockTicker = stockTickerElement.textContent.trim();
    
    // Step 1: Initialize the price if it's already available in sessionStorage or set to 0
    let currentPrice = parseFloat(sessionStorage.getItem("current_price")) || 0;
    
    // If currentPrice is already set, update the price display and cost right away
    if (currentPrice > 0) {
        const currency = priceDiv.textContent.trim().split(" ").pop(); // Extract currency symbol
        priceDiv.textContent = `${currentPrice} ${currency}`;
        updateCost(currentPrice); // Update the cost immediately with the available price
    }

    // Step 2: Fetch the price when the buy_date is changed
    dateInput.addEventListener("change", (e) => {
        const buyDate = e.target.value;

        fetch("/send_date", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buy_date: buyDate,
                stock_ticker: stockTicker
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.price) {
                currentPrice = data.price; // Store the new price
                const currency = priceDiv.textContent.trim().split(" ").pop(); // Extract currency symbol
                priceDiv.textContent = `${data.price} ${currency}`;

                // Store the new price in sessionStorage for future use
                sessionStorage.setItem("current_price", currentPrice);
                
                // Update the cost based on the new price
                updateCost(currentPrice);
            } else if (data.error) {
                priceDiv.textContent = `Error: ${data.error}`;
            }
        })
        .catch(err => {
            console.error("Error fetching price:", err);
        });
    });

    // Step 3: Calculate and update the cost when the amount is entered
    amountInput.addEventListener("input", () => {
        const amount = parseFloat(amountInput.value) || 0;
    
        fetch("/update_amount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        })
        .then(res => res.json())
        .then(data => {
            const currency = costDiv.dataset.currency || "";
            costDiv.textContent = `${data.total_cost} ${currency}`;
        })
        .catch(err => {
            console.error("Error updating amount:", err);
        });
    });

    // Function to update the cost
    function updateCost(currentPrice) {
        const amount = parseFloat(amountInput.value) || 0; // Ensure the value is a valid number, default to 0
        const totalCost = (amount * currentPrice).toFixed(2); // Calculating total cost
        const currency = costDiv.dataset.currency || "";

        // Update the cost display
        costDiv.textContent = `${totalCost} ${currency}`;
    }
});



document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.add-button').addEventListener('click', () => {
        console.log("Button clicked!"); // Test if this appears
        // Extract values from HTML elements
        const amount = document.getElementById('amountInput').value;
        const buyDate = document.getElementById('buy_date').value;
        const currentPrice = document.querySelector('.current-price').textContent.split(' ')[0]; // Extract just the number
        const stockCurrency = document.querySelector('.cost').getAttribute('data-currency');
        const stockTicker = document.getElementById('stock_ticker').textContent;
        
        // Prepare data to send
        const data = {
            amount: amount,
            buy_date: buyDate,
            current_price: currentPrice,
            stock_currency: stockCurrency,
            stock_ticker: stockTicker
        };

        // Send to Flask using Fetch API (AJAX)
        fetch('/add_stock', {  // This should match your Flask route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send data.');  // Optional: Show error message
        });
    });
});