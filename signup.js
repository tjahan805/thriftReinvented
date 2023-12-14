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
