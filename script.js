// Function to simulate user authentication
function loginUser(username, password) {
    // Fetch the JSON file (users.json) where user data is stored
    fetch('users.json')
        .then(response => response.json())
        .then(usersData => {
            // Check if the provided username and password match any user in the data
            const authenticatedUser = usersData.find(user => user.username === username && user.password === password);

            if (authenticatedUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser)); // Simulating login by storing user data
                alert('Logged in successfully!');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Function to simulate user sign-up
function signupUser(username, password) {
    fetch('users.json')
        .then(response => response.json())
        .then(usersData => {
            // Check if the username already exists
            const existingUser = usersData.find(user => user.username === username);

            if (existingUser) {
                alert('Username already exists. Please choose a different username.');
            } else {
                const newUser = { username, password };
                usersData.push(newUser);

                // Update users.json file with the new user
                return fetch('users.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usersData)
                });
            }
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
}

// Function to log out
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
}


// Function to fetch and display listings
function displayListings() {
    const listingContainer = document.getElementById('listingContainer');

    // Fetch listings.json
    fetch('listings.json')
        .then(response => response.json())
        .then(listingsData => {
            // Loop through listingsData and display in the HTML
            listingsData.forEach(listing => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${listing.title}</strong>: ${listing.description} - $${listing.price}`;
                listingContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching listings:', error);
        });
}

// Function to add a new listing
function addListing(title, description, price) {
    // Fetch the current listings
    fetch('listings.json')
        .then(response => response.json())
        .then(listingsData => {
            // Add the new listing
            const newListing = { title, description, price };
            listingsData.push(newListing);

            // Save the updated data back to the JSON file
            return fetch('listings.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listingsData)
            });
        })
        .then(() => {
            // If successful, re-render the listings to display the new listing
            displayListings();
        })
        .catch(error => {
            console.error('Error adding listing:', error);
        });
}

// Call the function to display listings when the page loads
window.onload = function () {
    displayListings();

    const addListingForm = document.getElementById('addListingForm');
    addListingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = addListingForm['title'].value;
        const description = addListingForm['description'].value;
        const price = parseFloat(addListingForm['price'].value);

        // Simulated addition to listings.json
        addListing(title, description, price);
    });
};
