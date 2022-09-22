import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {IconProfile, IconRatingActive, ImageHeader} from '../../assets';
import {Text} from '../../components';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Creators as MoviesActions} from '../../redux/MoviesRedux';
import {useSelector} from 'react-redux';
import {uriFormatter} from '../../helpers/uri';

const MovieReviews = ({route}) => {
  const dispatch = useDispatch();
  const getMovieReviews = data =>
    dispatch(MoviesActions.reviewsByMovieRequest(data));

  const reviews = useSelector(state => state.movies.dataReviewsByMovie);
  const isLoading = useSelector(state => state.movies.isLoadingReviewsByMovie);
  useEffect(() => {
    getMovieReviews(route.params.id);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'white'} size={40} />
        </View>
      ) : (
        reviews?.length > 0 ?
        reviews?.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <View style={styles.headerSection}>
              {review?.avatar ? (
                <Image
                  source={{uri: uriFormatter(review?.avatar)}}
                  style={styles.photo}
                />
              ) : (
                <IconProfile height={40} width={40} style={styles.photo} />
              )}
              <View style={styles.headerContent}>
                <View style={styles.headerHeadline}>
                  <IconRatingActive />
                  <Text
                    style={styles.headlineRating}
                    color={'black'}
                    size={14}
                    bold>
                    {review?.rating}
                  </Text>
                  <Text color={'black'} size={14}>
                    /10
                  </Text>
                  <Text
                    style={styles.headlineText}
                    color={'black'}
                    bold
                    size={18}>
                    {review?.headline}
                  </Text>
                </View>
                <View style={styles.headerReviewer}>
                  <Text color={'black'}>Reviewer: </Text>
                  <Text color={'black'} bold>
                    {review?.name}
                  </Text>
                </View>
              </View>
            </View>
            <Text color={'black'}>{review?.comment}</Text>
          </View>
        )) :
        <Text color={"white"} size={28} bold>No review yet...</Text>
      )}
    </ScrollView>
  );
};

export default MovieReviews;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  reviewContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 14,
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  photo: {
    minHeight: 40,
    minWidth: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  headerHeadline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineText: {
    marginLeft: 8,
  },
  headlineRating: {
    marginLeft: 5,
  },
  headerReviewer: {
    flexDirection: 'row',
  },
});
