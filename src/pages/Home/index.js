import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Share,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as MoviesActions} from '../../redux/MoviesRedux';
import {
  IconGenre,
  IconGenreActive,
  IconReview,
  IconSearch,
  IconShare,
} from '../../assets';
import {Text} from '../../components';
import {useState} from 'react';
import {useEffect} from 'react';
import debounce from 'debounce';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const getGenres = () => dispatch(MoviesActions.genreRequest());
  const getMovies = data => dispatch(MoviesActions.moviesRequest(data));
  const setKeyword = data => dispatch(MoviesActions.setKeyword(data));
  const setActiveGenre = data => dispatch(MoviesActions.setActiveGenre(data));

  const genres = useSelector(state => state.movies.dataGenre);
  const activeGenre = useSelector(state => state.movies.activeGenre);
  const movies = useSelector(state => state.movies.dataMovies);
  const isLoading = useSelector(state => state.movies.isLoadingMovies);
  const keyword = useSelector(state => state.movies.keyword);

  useEffect(() => {
    getGenres();
    getMovies();
  }, []);

  useEffect(() => {
    setShownGenres(genres?.slice(0, 4));
  }, [genres]);

  const [showAllGenres, setShowAllGenres] = useState(false);
  const [shownGenres, setShownGenres] = useState(genres?.slice(0, 4));

  const onClickGenre = genre => {
    if (genre === activeGenre) {
      setActiveGenre('');
      getMovies();
    } else {
      getMovies({title: keyword, category_id: genre.id});
      setActiveGenre(genre);
    }
  };

  const callSearch = debounce(function (keyword) {
    getMovies({title: keyword, category_id: activeGenre.id});
    setKeyword(keyword);
  }, 500);

  const handleMoreGenres = () => {
    let index = shownGenres?.findIndex(genre => genre.id === activeGenre.id);
    let data = [];
    if (index > 3) {
      data = [genres[index], ...genres.slice(0, 3)];
    } else {
      data = genres;
    }
    setShownGenres(showAllGenres ? data?.slice(0, 4) : data);
    setShowAllGenres(!showAllGenres);
  };

  const onShare = async movie => {
    try {
      await Share.share({
        message: `This movie is exciting! Let's review with me! https://milantv.com/detail/${movie.id}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.page}>
      <View>
        <TextInput
          style={styles.searchBar}
          onChangeText={callSearch}
          defaultValue={keyword}
        />
        <IconSearch style={styles.searchIcon} />
        <View style={styles.genreHeader}>
          <Text style={styles.titleText}>Best Genre</Text>
          <TouchableOpacity onPress={handleMoreGenres}>
            <Text style={styles.moreGenre}>
              {!showAllGenres ? `more >>` : `<< less`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.genreContainer}>
          {shownGenres?.map((genre, index) => (
            <TouchableOpacity
              onPress={() => onClickGenre(genre)}
              style={styles.genreItem(activeGenre === genre)}
              key={index}>
              {activeGenre === genre ? <IconGenreActive /> : <IconGenre />}
              <Text style={styles.genreItemText(activeGenre === genre)}>
                {genre.name}
              </Text>
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
            {isLoading ? (
              <View style={styles.loadingContainer} >
                <ActivityIndicator color={'white'} size={40} />
              </View>
            ) : (
              movies?.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MovieDetail', {id: item.id})
                  }
                  key={index}
                  style={styles.movieItem}>
                  <Image
                    source={{uri: item?.banner}}
                    style={styles.movieThumbnail}
                  />
                  <Text style={styles.movieDescription}>{item?.synopsis}</Text>
                  <View style={styles.movieFooter}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MovieReviews', {
                          id: item?.id,
                          title: `Reviews on ${item?.title}`,
                        })
                      }
                      style={styles.reviewSection}>
                      <IconReview width={18} height={18} />
                      <Text style={styles.reviewText}>
                        {item?.total_comments}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onShare(item)}>
                      <IconShare height={18} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
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
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  genreItem: active => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: active ? '#FFC200FA' : 'white',
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 5,
  }),
  genreItemText: active => ({
    fontSize: 12,
    color: active ? 'white' : 'black',
    marginLeft: 4,
  }),
  loadingContainer: {
    alignItems: "center",
    height: screenHeight - 320,
    justifyContent: "center",
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
