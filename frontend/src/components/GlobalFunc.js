export function getHeaders() {
    let headers = new Headers();
    headers.append("Authorization", window.AUTH_TYPE + " " + localStorage.getItem('token'));
    headers.append("Content-Type", "application/json");
    return headers;
}
