import { deleteCookie, getCookie } from '@/lib/cookieFunction'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import jwt from "jsonwebtoken"
import { isTokenExpired } from '@/lib/tokenFunction'

export default function withAuth(WrappedComponent, LoadingComponent) {
    const WithAuth = (props) => {
        const router = useRouter()
        const [loading, setLoading] = useState(true)
        const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME
        const data = getCookie(cookie);

        useEffect(() => {
            if (!data) {
                router.push('/')
            } else {
                const decodedToken = jwt.decode(data)
                console.log(cookie)
                if (!decodedToken) {
                    router.replace('/')
                } else {
                    const isExpired = isTokenExpired(data);
                    if (isExpired) {
                        deleteCookie(cookie)
                        router.replace("/")
                    }
                }
                setLoading(false)
            }
        }, [data, router])

        if (loading) {
            return <LoadingComponent />
        }

        return <WrappedComponent {...props} />
    }

    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

    return WithAuth
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
