import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { countryApi } from '../../services/api';

export interface Country {
    id: number;
    name: string;
    isoCode: string;
}

export const useTranslatedCountries = () => {
    const { t, i18n } = useTranslation();
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await countryApi.getCountriesWithLanguage();
            console.log("Response from API:", response);

            const sortedCountries = response
                .filter((country: any) => country.isoCode && country.name)
                .map((country: any, index: number) => ({
                    id: index + 1,
                    name: t(`countries.${country.isoCode}`, country.name) as string,
                    isoCode: country.isoCode,
                }))
                .sort((a, b) => a.name.localeCompare(b.name));

            setCountries(sortedCountries);
        } catch (err) {
            console.error('Error fetching countries:', err);
            setError('Failed to fetch countries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!i18n.language) return;
        fetchCountries();
    }, [i18n.language]);

    return { countries, loading, error };
};