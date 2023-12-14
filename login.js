function loginUser(username, password) {
    fetch('users.json')
        .then(response => response.json())
        .then(usersData => {
            const authenticatedUser = usersData.find(user => user.username === username && user.password === password);
            if (authenticatedUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
                alert('Logged in.');
            } else {
                alert('Invalid. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}
