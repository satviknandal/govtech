import { useEffect } from 'react';

/*
  Hook for fetching data from the specified @param url
 */

const useFetchData = (callback: (res: any) => void, apiUrl: string, payload = {}) => {
    useEffect(() => {
        if (apiUrl) {
            const fetchData = async () => {
                const res = await fetch(apiUrl);
                const data = await res.json();
                callback(data);
            };
            fetchData();
        }
    }, []);
};

export default useFetchData;
