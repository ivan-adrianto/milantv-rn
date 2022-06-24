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

const ModalReview = ({visible, onHide, movieId}) => {
  const dispatch = useDispatch();
  const createReview = data =>
    dispatch(MoviesActions.createReviewRequest(data));
  const resetState = () => dispatch(MoviesActions.resetStateCreateReview());
  const getMyReviews = () => dispatch(MoviesActions.myReviewsRequest());

  const dataReview = useSelector(state => state.movies.dataCreateReview);
  const error = useSelector(state => state.movies.errorCreateReview);
  const isLoading = useSelector(state => state.movies.isLoadingCreateReview);

  const [rating, setRating] = useState(10);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (dataReview) {
      showToastWithGravity('Review posted');
      onHide();
      resetState();
      getMyReviews();
    } else if (error) {
      showToastWithGravity(error);
      resetState();
    }
  }, [dataReview, error]);

  const ratingCompleted = value => {
    setRating(value);
  };

  const showToastWithGravity = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const submit = () => {
    const data = {
      movie_id: movieId,
      rating,
      title,
      comment,
    };
    createReview(data);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text color={'black'} bold size={16} style={styles.modalText}>
            How do you think about this movie?
          </Text>
          <AirbnbRating
            count={10}
            showRating={false}
            defaultRating={10}
            size={20}
            onFinishRating={ratingCompleted}
          />
          <Text style={styles.ratingText} color={'black'} bold>
            Your Rating: {rating}
          </Text>
          <TextInput
            style={styles.headline}
            placeholder="Write a headline for your review here"
            placeholderTextColor={'#979797'}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.comment}
            placeholder="Write your review here"
            placeholderTextColor={'#979797'}
            multiline={true}
            numberOfLines={5}
            onChangeText={text => setComment(text)}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={() => onHide()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={submit}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.textStyle}>Submit</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReview;

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
    backgroundColor: 'black',
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
