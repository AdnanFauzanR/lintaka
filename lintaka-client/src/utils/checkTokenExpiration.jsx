function checkTokenExpiration() {
    const token = localStorage.getItem('token');
    if(token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        if(decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return true;
        }
    }
}

export default checkTokenExpiration;