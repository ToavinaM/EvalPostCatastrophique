import { useState } from 'react';

export const useApi = (apiFn) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async (...params) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFn(...params);
            return result.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { callApi, loading, error };
};
