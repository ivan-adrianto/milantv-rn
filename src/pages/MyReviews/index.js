import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  IconDelete,
  IconEdit,
  IconRatingActive,
  ImageHeader,
} from '../../assets';
import {Text} from '../../components';

const MyReviews = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <View style={styles.reviewContainer}>
          <View style={styles.headerSection}>
            <Image source={ImageHeader} style={styles.poster} />
            <View style={styles.movieDetails}>
              <Text color={'black'} bold size={18}>
                Parasite
                <Text color={'black'} bold size={18}>{` (2019)`}</Text>
              </Text>
              <Text color={'black'} size={14}>
                Reviewed February 2020
              </Text>
              <View style={styles.ratingContainer}>
                <IconRatingActive style={styles.ratingIcon} />
                <Text color={'black'} bold>
                  8<Text color={'black'}>/10</Text>
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <IconEdit height={20} width={20} style={styles.iconEdit} />
                <IconDelete height={20} width={20} />
              </View>
            </View>
          </View>
          <View style={styles.contentSection}>
            <Text color={'black'} bold style={styles.headline}>
              Daebak Daebak
            </Text>
            <Text color={'black'}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit, dolores exercitationem eius ipsum id in fugiat
              nobis perferendis veritatis ratione!
            </Text>
          </View>
        </View>
      ))}
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
    marginBottom: 20
  },
  headerSection: {
    flexDirection: 'row',
  },
  poster: {
    height: 120,
    width: 80,
    marginRight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 11,
    marginBottom: 23,
  },
  ratingIcon: {
    marginRight: 11,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  iconEdit: {
    marginRight: 15,
  },
  contentSection: {
    marginTop: 11,
  },
  headline: {
    marginBottom: 14,
  },
});
