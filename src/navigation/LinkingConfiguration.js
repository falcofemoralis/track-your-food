import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

// https://reactnavigation.org/docs/configuring-links/

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Home: {
                        screens: {
                            HomeScreen: 'home'
                        }
                    },
                    Friends: {
                        screens: {
                            FriendsScreen: 'friends'
                        }
                    }
                },
            },
            Example: 'example',
        },
    },
};
