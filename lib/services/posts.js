export async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    if(!response.ok) return Promise.reject({ status: response.status, message: reponse.statusText })
    return response.json()
}