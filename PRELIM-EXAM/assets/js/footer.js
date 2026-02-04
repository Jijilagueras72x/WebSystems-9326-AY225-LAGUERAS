// assets/js/footer.js

// Function to load the footer into the page
function loadFooter() {
    console.log("Loading footer..."); // Debugging step

    // Fetch the footer content
    fetch('assets/footer.html')
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Footer HTML file not found');
            }
        })
        .then(data => {
            // Insert the footer content into the placeholder
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Call the function to load the footer on page load
window.onload = loadFooter;
