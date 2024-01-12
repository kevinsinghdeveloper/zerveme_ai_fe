import React, {useState, useEffect, ReactNode, ReactElement} from 'react';
import {Spinner} from 'react-bootstrap';

interface SpinnerWrapperProps {
    fetchData: () => Promise<any>; // Adjust the type based on your actual response data type
    children: ReactNode;
    shouldFetchData?: boolean;
}

const SpinnerWrapper = ({fetchData, children, shouldFetchData = true}: SpinnerWrapperProps): ReactElement => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null); // Adjust the type based on your actual response data type
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDataAndHandleLoading = async () => {
            try {
                setLoading(true);
                const result = await fetchData();
                setData(result);
            } catch (err) {
                const castedError = err as Error; // Explicitly cast the error to the expected type
                setError(castedError);
            } finally {
                setLoading(false);
            }
        };

        if (shouldFetchData) {
            fetchDataAndHandleLoading();
        }
    }, [fetchData, shouldFetchData]);

    return (
        <div>
            {loading && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {!loading && !error && React.Children.map(children, child =>
                React.cloneElement(child as ReactElement, {data})
            )}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
};

export default SpinnerWrapper;
