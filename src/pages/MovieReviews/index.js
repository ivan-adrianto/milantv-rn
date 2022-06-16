import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {IconRatingActive, ImageHeader} from '../../assets';
import {Text} from '../../components';

const MovieReviews = () => {
  return (
    <View style={styles.page}>
      <View style={styles.reviewContainer}>
        <View style={styles.headerSection}>
          <Image source={ImageHeader} style={styles.photo} />
          <View style={styles.headerContent}>
            <View style={styles.headerHeadline}>
              <IconRatingActive />
              <Text
                style={styles.headlineRating}
                color={'black'}
                size={14}
                bold>
                9
              </Text>
              <Text color={'black'} size={14}>
                /10
              </Text>
              <Text style={styles.headlineText} color={'black'} bold size={18}>
                Great!
              </Text>
            </View>
            <View style={styles.headerReviewer}>
              <Text color={'black'}>Reviewer: </Text>
              <Text color={'black'} bold>
                Aiko Kanazawa
              </Text>
            </View>
          </View>
        </View>
        <Text color={'black'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum iste
          laudantium libero placeat aspernatur non pariatur excepturi incidunt
          quasi repellat!
        </Text>
      </View>
    </View>
  );
};

export default MovieReviews;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 15
  },
  reviewContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 14
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  photo: {
    height: 40,
    width: 40,
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
