import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  IconDelete,
  IconEdit,
  IconRatingActive,
  ImageHeader,
} from '../../assets';
import {ModalDeleteReview, ModalEditReview, Text} from '../../components';
import {useDispatch} from 'react-redux';
import {Creators as MoviesActions} from '../../redux/MoviesRedux';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {dateFormatter} from '../../helpers/date';
import {useState} from 'react';

const MyReviews = () => {
  const dispatch = useDispatch();
  const getMyReviews = data => dispatch(MoviesActions.myReviewsRequest(data));

  const reviews = useSelector(state => state.movies.dataMyReviews);
  
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [movieId, setMovieId] = useState('');
  const [selectedReview, setSelectedReview] = useState({});

  useEffect(() => {
    getMyReviews();
  }, []);

  const editReview = review => {
    setSelectedReview(review);
    setMovieId(review.movie.id);
    setShowModalEdit(true);
  };

  const deleteReview = review => {
    setSelectedReview(review);
    setShowModalDelete(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}>
      {reviews?.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <View style={styles.headerSection}>
            <Image source={{uri: review?.movie?.poster}} style={styles.poster} />
            <View style={styles.movieDetails}>
              <Text
                style={styles.movieTitle}
                color={'black'}
                bold
                size={18}
                numberOfLines={1}>
                {review?.movie?.title}
                <Text color={'black'} bold size={18}>{` (${new Date(
                  review?.movie?.release_date,
                ).getFullYear()})`}</Text>
              </Text>
              <Text color={'black'} size={14}>
                Reviewed {dateFormatter(review?.updated_at)}
              </Text>
              <View style={styles.ratingContainer}>
                <IconRatingActive style={styles.ratingIcon} />
                <Text color={'black'} bold>
                  {review?.rating}
                  <Text color={'black'}>/10</Text>
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => editReview(review)} style={styles.actionButton}>
                  <IconEdit height={30} width={30} style={styles.iconEdit} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteReview(review)} style={styles.actionButton}>
                  <IconDelete height={30} width={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.contentSection}>
            <Text color={'black'} bold style={styles.headline}>
              {review?.title}
            </Text>
            <Text color={'black'}>{review?.comment}</Text>
          </View>
        </View>
      ))}
      <ModalEditReview
        visible={showModalEdit}
        onHide={() => setShowModalEdit(false)}
        dataReview={selectedReview}
        movieId={movieId}
      />
      <ModalDeleteReview
        visible={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        reviewId={selectedReview?.id}
      />
    </ScrollView>
  );
};

export default MyReviews;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  reviewContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerSection: {
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
  },
  poster: {
    height: 120,
    width: 80,
    marginRight: 18,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    flexGrow: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 11,
    marginBottom: 13,
  },
  ratingIcon: {
    marginRight: 11,
  },
  iconEdit: {
    marginRight: 11,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  headline: {
    marginTop: 14,
    marginBottom: 8,
  },
});
