// Add this script to your webhaze.in homepage
(function() {
    // Check if there's a token in the URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('token');
    const error = params.get('error');
    
    if (error) {
        alert('Authentication failed. Please try again.');
        window.location.hash = '';
        return;
    }
    
    if (token) {
        // Store token
        localStorage.setItem('token', token);
        
        // Fetch user data
        fetch('https://webhaze.onrender.com/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                // Store user data
                localStorage.setItem('user', JSON.stringify(data.user));
                alert(`Welcome ${data.user.name}! You are now logged in.`);
                // Redirect to dashboard or reload page
                window.location.href = '/dashboard';
            } else {
                alert('Authentication failed. Please try again.');
            }
        })
        .catch(err => {
            console.error('Auth error:', err);
            alert('Authentication failed. Please try again.');
        })
        .finally(() => {
            // Clean up URL
            window.location.hash = '';
        });
    }
})();