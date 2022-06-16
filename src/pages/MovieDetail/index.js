import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import debounce from 'debounce';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {
  IconRating,
  IconRatingActive,
  IconReview,
  IconSearch,
  IconShare,
} from '../../assets';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Creators as MoviesActions} from '../../redux/MoviesRedux';
import {Text} from '../../components';
import ModalReview from './ModalReview';

const MovieDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const getMovies = data => dispatch(MoviesActions.moviesRequest(data));
  const getMovieDetail = data => dispatch(MoviesActions.movieRequest(data));
  const setKeyword = data => dispatch(MoviesActions.setKeyword(data));

  const movie = useSelector(state => state.movies.dataMovie);
  const keyword = useSelector(state => state.movies.keyword);
  const dataCreateReview = useSelector(state => state.movies.dataCreateReview);

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getMovieDetail(route.params.id);
    setSearch(keyword);
  }, []);

  useEffect(() => {
    if (dataCreateReview) {
      getMovieDetail(route.params.id);
      getMovies();
    }
  }, [dataCreateReview]);

  const callSearch = debounce(function (keyword) {
    getMovies({title: keyword});
    setKeyword(keyword);
    navigation.navigate('Home');
  }, 500);

  const onSearch = keyword => {
    callSearch(keyword);
    setSearch(keyword);
  };

  return (
    <View style={styles.page}>
      <View>
        <TextInput
          style={styles.searchBar}
          onChangeText={onSearch}
          value={search}
        />
        <IconSearch style={styles.searchIcon} />
      </View>
      <View style={styles.contentContainer}>
        <View style={{flex: 1}}>
          <Image source={{uri: movie?.banner}} style={styles.movieBanner} />
          <View style={styles.titleSection}>
            <Text style={styles.title} color="black">
              {movie?.title}
            </Text>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText} color="black">
                {new Date(movie?.release_date).getFullYear()} |{' '}
              </Text>
              <Text color="black" style={styles.subtitleText}>
                {movie?.category?.name}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.descriptionContainer}>
              <Image
                source={{uri: movie?.poster}}
                style={styles.poster}></Image>
              <View style={styles.descriptionRightSide}>
                <View style={styles.ratingContainer}>
                  <View style={styles.rating}>
                    <IconRatingActive height={20} width={20} />
                    <View style={styles.ratingNumber}>
                      <Text color="black" bold>
                        {movie?.rating}
                      </Text>
                      <Text color={'black'}>/10</Text>
                    </View>
                  </View>
                  {!movie?.is_reviewed && (
                    <TouchableOpacity
                      style={styles.rating}
                      onPress={() => setModalVisible(true)}>
                      <IconRating height={20} width={20} />
                      <Text color={'black'} size={14}>
                        Rate This
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <Text style={styles.synopsis} color={'black'}>
              {movie?.synopsis}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MovieReviews', {
                id: movie?.id,
                title: `Reviews on ${movie?.title}`,
              })
            }
            style={styles.reviewFooter}>
            <IconReview height={16} width={16} />
            <Text style={styles.reviewFooterText} color={'black'}>
              {movie?.total_comments}
            </Text>
          </TouchableOpacity>
          <IconShare />
        </View>
      </View>
      <ModalReview
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        movieId={route.params.id}
      />
    </View>
  );
};

export default MovieDetail;

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
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 23,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingTop: 19,
    position: 'relative',
    justifyContent: 'space-between',
  },
  movieBanner: {
    height: 169,
    marginBottom: 15,
  },
  titleSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B7B7B7',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '50%',
  },
  subtitle: {
    flexDirection: 'row',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  poster: {
    width: 90,
    height: 131,
    marginRight: 12,
  },
  descriptionRightSide: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  rating: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingNumber: {
    flexDirection: 'row',
  },
  synopsis: {
    flex: 1,
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    borderTopColor: '#B7B7B7',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 3,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewFooterText: {
    marginLeft: 5,
  },
});
