document.addEventListener('DOMContentLoaded', function () {
    const listingContainer = document.getElementById('listingContainer');
    const addListingForm = document.getElementById('addListingForm');

    // Function to fetch and display listings
    function displayListings() {
        fetch('listings.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(listingsData => {
                // Clear previous listings
                listingContainer.innerHTML = '';

                // Render fetched listings to HTML
                listingsData.forEach(listing => {
                    const listingElement = document.createElement('div');
                    listingElement.innerHTML = `<h3>${listing.title}</h3>
                                               <p>${listing.description}</p>
                                               <p>Price: $${listing.price}</p>`;
                    listingContainer.appendChild(listingElement);
                });
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
            });
    }

    // Function to add a new listing
    addListingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        const newListing = {
            title: title,
            description: description,
            price: price
        };

        fetch('listings.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(listingsData => {
                listingsData.push(newListing);

                return fetch('listings.json', {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(listingsData),
                });
            })
            .then(() => {
                // Display the updated listings after adding a new one
                displayListings();
            })
            .catch(error => {
                console.error('Error adding listing:', error);
            });
    });

    // Initial display of listings on page load
    displayListings();
});

// Function to log out
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
}
