import * as cookie from 'cookie'

export async function getSession(request) {
    console.log("test")

    const cookies = cookie.parse(request.headers.cookie || '')

    if (!cookies.session_id) {
        console.log("no cookie")
        return {
            account: false
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
        console.log(res.status)
        if (res.status === 200) {
            const { message, email, name } = JSON.parse(await res.text())
            console.log(message)
            return {
                account: {email, name}
            }
        }
    } catch (err) {
        console.log("Klaida")
        console.log(err)
    }

    return {
        account: false
    }
}