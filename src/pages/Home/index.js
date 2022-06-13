import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WARNA_ABU_ABU} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as AuthActions} from '../../redux/AuthRedux';
import {Creators as MoviesActions} from '../../redux/MoviesRedux';
import {removeBearerToken} from '../../services/apiServices';
import {
  IconGenre,
  IconReview,
  IconSearch,
  IconShare,
  ImageHeader,
} from '../../assets';
import {Text} from '../../components';
import {useState} from 'react';
import {useEffect} from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthActions.logout());
  const getGenres = () => dispatch(MoviesActions.genreRequest());
  const getMovies = () => dispatch(MoviesActions.moviesRequest());

  const genres = useSelector(state => state.movies.dataGenre);
  const movies = useSelector(state => state.movies.dataMovies);

  useEffect(() => {
    getGenres();
    getMovies();
  }, []);

  const [activeGenre, setActiveGenre] = useState('');

  const logoutHandler = () => {
    Keychain.resetInternetCredentials('token');
    logout();
    removeBearerToken();
  };

  console.log('movies', movies);

  const onClickGenre = genre => {
    setActiveGenre(genre);
  };

  // const genres = ['Action', 'Romance', 'Thriller', 'Comedy'];

  return (
    <View style={styles.page}>
      <View showsVerticalScrollIndicator={false}>
        <TextInput style={styles.searchBar} />
        <IconSearch style={styles.searchIcon} />
        <View style={styles.genreHeader}>
          <Text style={styles.titleText}>Best Genre</Text>
          <Text style={styles.moreGenre}>more {'>>'}</Text>
        </View>
        <View style={styles.genreContainer}>
          {genres?.slice(0, 4)?.map((genre, index) => (
            <TouchableOpacity
              onPress={() => setActiveGenre(genre)}
              style={styles.genreItem}
              key={index}>
              <IconGenre />
              <Text style={styles.genreItemText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.moviesContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titleText}>
              {activeGenre
                ? `Editor Picks ${activeGenre.name} Movies`
                : 'Editor Picks Movies'}
            </Text>
            {movies?.map((item, index) => (
              <View key={index} style={styles.movieItem}>
                <Image
                  source={{uri: item?.banner}}
                  style={styles.movieThumbnail}
                />
                <Text style={styles.movieDescription}>{item?.synopsis}</Text>
                <View style={styles.movieFooter}>
                  <View style={styles.reviewSection}>
                    <IconReview width={18} height={18} />
                    <Text style={styles.reviewText}>
                      {item?.total_comments}
                    </Text>
                  </View>
                  <IconShare height={18} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* <Button title="LOGOUT" onPress={logoutHandler} /> */}
      </View>
    </View>
  );
};

export default Home;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'black',
    height: 300,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 36,
    paddingLeft: 30,
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 17,
  },
  genreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moreGenre: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  genreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 5,
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 5,
  },
  genreItemText: {
    fontSize: 12,
    color: 'black',
    marginLeft: 4,
  },
  moviesContainer: {
    height: screenHeight - 230,
  },
  movieItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 17,
    paddingHorizontal: 13,
    marginBottom: 20,
  },
  movieThumbnail: {
    width: '100%',
    marginBottom: 18,
    height: (screenWidth - 30) / 2,
  },
  movieDescription: {
    color: 'black',
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 21,
    borderBottomColor: '#B7B7B7',
    borderBottomWidth: 1,
  },
  movieFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingBottom: 13,
    paddingLeft: 7,
    paddingRight: 7,
  },
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 12,
    color: 'black',
    marginLeft: 11,
  },
});
