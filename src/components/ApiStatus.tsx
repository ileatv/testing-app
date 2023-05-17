import { GetServerSideProps, NextPage } from 'next';

interface ApiStatusProps {
    status: string;
    message: string;
}

const apiStatus = async (): Promise<ApiStatusProps> => {
    try {
        const response = await fetch('https://pfctngr.ru/people/GetPeople', { method: 'GET' });
        const data = await response.json();
        return { status: 'success', message: data.message };
    } catch (error: any) {
        return { status: 'error', message: error.message };
    }
};

const ApiStatus: NextPage<ApiStatusProps> = ({ status, message }) => {
    return (
        <div>
            <h1>API Status</h1>
            <p>Status: {status}</p>
            <p>Message: {message}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ApiStatusProps> = async () => {
    const status = await apiStatus();
    return { props: status };
};

export default ApiStatus;