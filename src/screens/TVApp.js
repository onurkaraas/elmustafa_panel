import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#004D40', // Teal
    secondary: '#D4C19C', // Beige
    darkPrimary: '#002420', // Dark Teal
    text: '#333333',
    textLight: '#666666',
    border: '#eeeeee',
    white: '#ffffff',
    black: '#000000',
};

const featuredVideos = [
    {
        id: 1,
        title: 'İslami İlimler Dersi',
        duration: '1:45:30',
        thumbnail: require('../assets/thumbnail.png'),
        views: '1.2B',
    },
    {
        id: 2,
        title: 'Kuran-ı Kerim Tilaveti',
        duration: '58:20',
        thumbnail: require('../assets/thumbnail.png'),
        views: '856',
    },
    {
        id: 3,
        title: 'Eğitim Çalıştayı',
        duration: '2:15:00',
        thumbnail: require('../assets/thumbnail.png'),
        views: '2.1B',
    },
];

function TVApp() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.nav}>
                    <TouchableOpacity
                        style={[styles.navItem, styles.navItemActive]}
                    >
                        <Text style={[styles.navText, styles.navTextActive]}>
                            Canlı
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>Videolar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>Program</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.player}>
                    <LinearGradient
                        colors={['#004D40', '#002420']}
                        style={styles.playerPlaceholder}
                    >
                        <View style={styles.liveIndicator}>
                            <Text style={styles.liveText}>CANLI</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.playerControls}>
                        <TouchableOpacity style={styles.controlBtn}>
                            <Text style={styles.controlBtnText}>Oynat</Text>
                        </TouchableOpacity>
                        <View style={styles.progressBar}>
                            <View style={[styles.progress, { width: '45%' }]} />
                        </View>
                        <TouchableOpacity style={styles.controlBtn}>
                            <Text style={styles.controlBtnText}>Tam Ekran</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.streamInfo}>
                    <Text style={styles.streamTitle}>
                        Sabah Eğitimi Canlı Yayını
                    </Text>
                    <Text style={styles.streamDetails}>
                        256 İzleyici • 2 saat önce başladı
                    </Text>
                </View>

                <View style={styles.featuredSection}>
                    <Text style={styles.sectionTitle}>Öne Çıkan Videolar</Text>
                    <View style={styles.featuredGrid}>
                        {featuredVideos.map((video) => (
                            <TouchableOpacity
                                key={video.id}
                                style={styles.videoCard}
                            >
                                <View style={styles.thumbnail}>
                                    <Image
                                        source={video.thumbnail}
                                        style={styles.thumbnailImage}
                                    />
                                    <View style={styles.duration}>
                                        <Text style={styles.durationText}>
                                            {video.duration}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.videoInfo}>
                                    <Text style={styles.videoTitle}>
                                        {video.title}
                                    </Text>
                                    <Text style={styles.videoViews}>
                                        {video.views} görüntülenme
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        height: 40,
        width: 120,
    },
    nav: {
        flexDirection: 'row',
        gap: 20,
    },
    navItem: {
        padding: 10,
    },
    navItemActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#D4C19C',
    },
    navText: {
        fontSize: 16,
        color: '#004D40',
    },
    navTextActive: {
        color: '#D4C19C',
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    player: {
        height: height * 0.5,
        backgroundColor: '#004D40',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginTop: 20,
    },
    playerPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    liveIndicator: {
        backgroundColor: '#D4C19C',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    liveText: {
        color: '#004D40',
        fontWeight: '600',
    },
    playerControls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    controlBtn: {
        backgroundColor: '#D4C19C',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
    },
    controlBtnText: {
        color: '#004D40',
        fontWeight: '500',
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
    },
    progress: {
        height: '100%',
        backgroundColor: '#D4C19C',
        borderRadius: 2,
    },
    streamInfo: {
        padding: 20,
    },
    streamTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#004D40',
        marginBottom: 5,
    },
    streamDetails: {
        color: '#666',
    },
    featuredSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#004D40',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#D4C19C',
        paddingBottom: 10,
    },
    featuredGrid: {
        gap: 20,
    },
    videoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        aspectRatio: 16 / 9,
        position: 'relative',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    duration: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    durationText: {
        color: '#fff',
        fontSize: 12,
    },
    videoInfo: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#004D40',
        marginBottom: 5,
    },
    videoViews: {
        color: '#666',
        fontSize: 14,
    },
});

export default TVApp;
