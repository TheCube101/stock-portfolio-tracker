function submitQuery() {
    let query = document.getElementById("searchBox").value.trim();
    if (!query) return;

    fetch("/search", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "query": query })
    })
    .then(response => response.text())
    .then(html => {
        document.getElementById("results").innerHTML = html;
    })
    .catch(error => console.error("Error:", error));
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

