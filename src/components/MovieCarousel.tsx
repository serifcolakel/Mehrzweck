import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import styled from 'styled-components';
import {LoadingIcon, StarIcon} from '../assets/svg/Icons';
import {FONT_SIZE, PADDING} from '../constant';
import {mockMovies} from '../data';
import {colors} from '../utils/colors';
import {isIos} from '../utils/platformUtil';
import CustomText from './CustomText';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
const EMPTY_STAR_VALUE = 0;
const SCROLL_EVENT_THROTTLE = 16;

const RateNumberLabel = styled(CustomText)`
  font-family: Menlo;
  font-size: ${FONT_SIZE.MEDIUM}px;
  margin-right: 4px;
`;

const RatingContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

const Container = styled(View)`
  flex: 1;
  background-color: ${colors.gray2};
`;

const PosterImage = styled(Image)`
  width: 100%;
  height: ${ITEM_SIZE * 1.2}px;
  resize-mode: cover;
  border-radius: 24px;
  margin: 0;
  margin-bottom: 10px;
`;

const StyledGenreContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 8px 4px;
`;

const DescriptionLabel = styled(CustomText)`
  margin: ${PADDING.TEN}px 0;
`;

const StyledGenreItemContainer = styled(View)<{isEven: boolean}>`
  padding: 8px 12px;
  border-width: 1px;
  border-radius: 14px;
  border-color: ${({isEven}) => (isEven ? colors.primary : colors.gray)};
  margin: 4px 4px 0 4px;
`;

const StyledText = styled(CustomText)<{isEven: boolean}>`
  color: ${({isEven}) => (isEven ? colors.primary : colors.gray)};
`;

const BackDropContainer = styled(View)`
  height: ${BACKDROP_HEIGHT}px;
  width: ${width}px;
  position: absolute;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: ${width}px;
  height: ${BACKDROP_HEIGHT}px;
  position: absolute;
`;

function Rating({rating}: {rating: number}) {
  const filledStars = Math.floor(rating);
  const emptyRateArray = Array(5 - filledStars).fill(EMPTY_STAR_VALUE);
  const rates = [...Array(filledStars).fill(1), ...emptyRateArray];

  return (
    <RatingContainer>
      <RateNumberLabel label={`${rating}`} />
      {rates.map((rate, index) => {
        return (
          <StarIcon
            key={index}
            size={24}
            color={rate === EMPTY_STAR_VALUE ? colors.gray : colors.yellow}
          />
        );
      })}
    </RatingContainer>
  );
}

function Genres({genres}: {genres: string[]}) {
  return (
    <StyledGenreContainer>
      {genres.map((genre, index: number) => {
        return (
          <StyledGenreItemContainer key={genre} isEven={index % 2 === 0}>
            <StyledText label={genre} isEven={index % 2 === 0} />
          </StyledGenreItemContainer>
        );
      })}
    </StyledGenreContainer>
  );
}

const BackDrop = ({movies, scrollX}: {movies: any; scrollX: any}) => {
  return (
    <BackDropContainer>
      <FlatList
        data={movies.reverse()}
        keyExtractor={item => item.key}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <StyledImage source={{uri: item.backdrop}} />
            </Animated.View>
          );
        }}
      />
    </BackDropContainer>
  );
};

type TMovie = {
  key: string;
  title?: string;
  poster?: string;
  backdrop?: string;
  rating?: number;
  genres?: string[];
  year?: number;
  description?: string;
};

export default function MovieCarousel() {
  const [movies, setMovies] = React.useState<TMovie[]>([]);
  const [loading, setLoading] = React.useState(true);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    setMovies([
      {key: 'empty-content-left'},
      ...mockMovies,
      {key: 'empty-content-right'},
    ]);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingIcon size={80} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StatusBar hidden />
      <BackDrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.key}
        horizontal
        bounces={false}
        decelerationRate={isIos ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.center}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        renderItem={({item, index}: {item: any; index: number}) => {
          if (!item.poster) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                style={[
                  {...styles.filmItemContainer},
                  {transform: [{translateY}]},
                ]}>
                <PosterImage source={{uri: item.poster}} />
                <CustomText label={item.title} />
                <Rating rating={item.rating} />
                <DescriptionLabel label={item.description} numberOfLines={5} />
                <Genres genres={item.genres} />
              </Animated.View>
            </View>
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  filmItemContainer: {
    marginHorizontal: PADDING.TEN,
    padding: PADDING.TWENTY,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
  },
  center: {alignItems: 'center'},
});
