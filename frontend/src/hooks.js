import * as cookie from 'cookie'

export async function getSession(request) {
    const cookies = cookie.parse(request.headers.cookie || '')

    if (!cookies.session_id) {
        return {
            authenticated: false
        }
    }

    try {
        const res = await fetch('http://127.0.0.1:5000/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                session_id: cookies.session_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { message, email, name } = JSON.parse(await res.text())
        if (res.status === 200) {
            console.log(message)
            return {
                authenticated: true,
                email,
                name
            }
        }
    } catch (err) {
        console.log(err)
    }

    return {
        authenticated: false
    }
}