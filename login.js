function loginUser(username, password) {
    fetch('users.json')
        .then(response => response.json())
        .then(usersData => {
            const authenticatedUser = usersData.find(user => user.username === username && user.password === password);

            if (authenticatedUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
                alert('Logged in successfully!');
                window.location.href = 'index.html'; // Redirect to the main page after login
            } else {
                alert('Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}
