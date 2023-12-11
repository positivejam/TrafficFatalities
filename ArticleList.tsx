import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { fetchRSSFeed } from './services/rssService';
import { Feed, FeedItem } from 'react-native-rss-parser';
import { openArticle } from './utils/navigationUtils';
import { format, parseISO } from 'date-fns';

const ArticleList = ({ feedUrl }: { feedUrl: string }) => {
    const [articles, setArticles] = useState<FeedItem[]>([]);

    useEffect(() => {
        const loadFeed = async () => {
            const feed: Feed | undefined = await fetchRSSFeed(feedUrl);
            if (feed) {
                setArticles(feed.items);
            }
        };

        loadFeed();
    }, [feedUrl]);

    const renderItem = ({ item }: { item: FeedItem }) => (
        <TouchableOpacity onPress={() => openArticle(item.links[0].url)}>
            <View style={styles.item}>
                <Text style={styles.date}>{format(parseISO(item.published), 'yyyy-MM-dd hh:mma')}</Text>
                <Text style={styles.title}>{cleanHtmlTags(item.title)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={articles}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#222222',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        color: 'white',
    },
    date: {
        fontSize: 10,
        color: 'white',
    },
});

export const cleanHtmlTags = (htmlContent: string): string => {
    let cleanedContent = htmlContent;

    cleanedContent = cleanedContent.replace(/<b>/gi, ''); // Remove <b>
    cleanedContent = cleanedContent.replace(/<\/b>/gi, ''); // Remove </b>

    cleanedContent = cleanedContent.replace(/<i>/gi, ''); // Remove <i>
    cleanedContent = cleanedContent.replace(/<\/i>/gi, ''); // Remove </i>

    return cleanedContent;
};


export default ArticleList;
