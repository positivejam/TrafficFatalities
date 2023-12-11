import RSSParser from 'react-native-rss-parser';

export const fetchRSSFeed = async (url: string) => {
    try {
        const response = await fetch(url);
        const result = await response.text();
        return await RSSParser.parse(result);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
};
