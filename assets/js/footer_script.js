
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const resultsContainer = document.getElementById("search-results");

    // Fungsi untuk menampilkan hasil pencarian
    const renderResults = (results) => {
        resultsContainer.innerHTML = ""; // Clear previous results

        if (results.length > 0) {
            resultsContainer.classList.add("visible"); // Show results container
            results.forEach(item => {
                const resultItem = document.createElement("div");
                resultItem.innerHTML = `<a href="${item.url}">${item.title}</a>`;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = "<p>No results found.</p>";
            resultsContainer.classList.add("visible");
        }
    };

    // Fungsi untuk menyembunyikan hasil pencarian
    const hideResults = () => {
        resultsContainer.classList.remove("visible"); // Hide results container
    };

    // Fungsi untuk melakukan pencarian berdasarkan query
    const searchItems = (query, data) => {
        query = query.toLowerCase();
        return data.filter(item => item.title.toLowerCase().includes(query));
    };

    // Ambil data dari /index.json
    fetch("/index.json")
        .then(response => response.json())
        .then(data => {
            // Event listener untuk tombol Go
            searchButton.addEventListener("click", () => {
                const query = searchInput.value.trim();
                if (query) {
                    const results = searchItems(query, data);
                    renderResults(results);
                } else {
                    hideResults();
                }
            });

            // Event listener untuk input pencarian (real-time)
            searchInput.addEventListener("input", () => {
                const query = searchInput.value.trim();
                if (query) {
                    const results = searchItems(query, data);
                    renderResults(results);
                } else {
                    hideResults();
                }
            });
        });
});


window.addEventListener('load', () => {
  quicklink.listen();
});