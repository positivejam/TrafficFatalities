import { Linking } from 'react-native';

export const openArticle = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open page.', err));
};
