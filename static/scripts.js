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
    const input = document.getElementById("amountInput");

    if (input) {
        input.addEventListener("input", function () {
            const amount = this.value;

            fetch('/update_amount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount })
            })
            .then(response => response.json())
            .then(data => {
                const costDiv = document.querySelector(".cost");
                if (costDiv) {
                    // Get the currency symbol from data-attribute
                    const currency = costDiv.getAttribute("data-currency");
                    // Update only the numeric part, preserving currency
                    costDiv.textContent = `${data.total_cost} ${currency}`;
                }
            })
            .catch(err => console.error('Fetch error:', err));
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("buy_date");

    dateInput.addEventListener("change", function () {
        const buyDate = dateInput.value;

        fetch("/send_date", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ buy_date: buyDate })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Date sent successfully:", data);
        })
        .catch(error => {
            console.error("Error sending date:", error);
        });
    });
});

//document.addEventListener("click", function(event) {
//    if (event.target.classList.contains("addStock")) {
//        let ticker = event.target.getAttribute("data-ticker");
//        let stockPrice = event.target.getAttribute("data-price");
//        let stockName = event.target.getAttribute("stock-name");
//        // console.log("Sending:", ticker, stockPrice); // Optional debug
//
//        fetch("/add_stock", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/x-www-form-urlencoded"
//            },
//            body: new URLSearchParams({
//                ticker: ticker,
//                stockPrice: stockPrice,
//                stockName: stockName
//            })
//        })
//        .then(response => response.json())
//        .then(data => console.log(data.message))
//        .catch(error => console.error("Error adding stock:", error));
//    }
//});

