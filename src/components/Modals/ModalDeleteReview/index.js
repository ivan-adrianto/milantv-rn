import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../../Text';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';
import {Creators as MoviesActions} from '../../../redux/MoviesRedux';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

const ModalDeleteReview = ({visible, onHide, reviewId}) => {
  const dispatch = useDispatch();
  const resetState = () => dispatch(MoviesActions.resetStateDeleteReview());
  const deleteReview = data =>
    dispatch(MoviesActions.deleteReviewRequest(data));
  const getMyReviews = () => dispatch(MoviesActions.myReviewsRequest());
  const getMovies = () => dispatch(MoviesActions.moviesRequest());

  const dataDelete = useSelector(state => state.movies.dataDeleteReview);
  const error = useSelector(state => state.movies.errorDeleteReview);
  const isLoading = useSelector(state => state.movies.isLoadingDeleteReview);

  useEffect(() => {
    if (dataDelete) {
      showToastWithGravity('Review deleted');
      onHide();
      resetState();
      getMyReviews();
      getMovies();
    } else if (error) {
      showToastWithGravity(error);
      resetState();
    }
  }, [dataDelete, error]);

  const showToastWithGravity = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text color={'black'} bold size={16} style={styles.modalText}>
            Are you sure to delete this review?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={() => onHide()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => deleteReview(reviewId)}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.textStyle}>Delete</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteReview;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingHorizontal: 20,
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: '#FFE7AB',
    borderRadius: 20,
    paddingHorizontal: 27,
    paddingTop: 21,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#ff2020',
    width: 97,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: '#979797',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ratingText: {
    marginTop: 10,
  },
  headline: {
    backgroundColor: 'white',
    width: '100%',
    height: 30,
    borderRadius: 10,
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 11,
    marginTop: 14,
    marginBottom: 10,
  },
  comment: {
    backgroundColor: 'white',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    fontSize: 12,
    paddingVertical: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    height: 100,
    marginBottom: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
