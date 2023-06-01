//Next components
import { useRouter } from 'next/router';

//React components
import { useEffect } from 'react';

//Redux components
import { useSelector } from 'react-redux';

//Store components
import { IRootState } from '../../store';

//Pages
import Authorization from '@/pages/Authorization';

interface PrivateRouteProps {
    children: React.ReactNode | void;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter();
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/Authorization');
        }
    }, [isLoggedIn, router]);

    return (
        <>
            {isLoggedIn ? children : <Authorization />}
        </>
    )

}

export default PrivateRoute;