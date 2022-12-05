import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  StatusBar,
  ImageURISource,
} from 'react-native';
import {RootStackParamList} from '../App';
import {HomeIcon} from '../assets/svg/Icons';
import {data} from '../data';
import styled from 'styled-components';
import {colors} from '../utils/colors';

const {width, height} = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;
const WEAK_CIRCLE_SIZE = width * 0.3;
const positionsWeakCircle = [
  {x: 15, y: 35},
  {x: 55, y: 11},
  {x: 70, y: 39},
  {x: 12, y: 80},
  {x: 85, y: 66},
];

const Circle = ({scrollX}: {scrollX: Animated.Value}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({color}, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{scale}],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const WeakCircle = ({
  scrollX,
  index,
}: {
  scrollX: Animated.Value;
  index: number;
}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({color}, productItemIndex) => {
        const inputRange = [
          (productItemIndex - 0.55) * width,
          productItemIndex * width,
          (productItemIndex + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={productItemIndex}
            style={[
              styles.weakCircle,
              {
                top: `${positionsWeakCircle[index].y}%`,
                left: `${positionsWeakCircle[index].x}%`,
                backgroundColor: color,
                opacity,
                transform: [{scale}],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Ticker = ({scrollX}: {scrollX: Animated.Value}) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map(({type, color}, index) => {
          return (
            <Text
              key={index}
              style={[
                styles.tickerText,
                {
                  color,
                },
              ]}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({
  imageUri,
  heading,
  description,
  index,
  scrollX,
}: {
  type: string;
  imageUri: ImageURISource;
  heading: string;
  description: string;
  key: string;
  color: string;
  index: number;
  scrollX: Animated.Value;
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[
          styles.imageStyle,
          {
            transform: [{scale}],
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              color: data[index].color,
              transform: [{translateX: translateXHeading}, {scale}],
            },
          ]}>
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
                {scale},
              ],
            },
          ]}>
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const PaginationContainer = styled(View)`
  position: absolute;
  right: 20px;
  bottom: 40px;
  flex-direction: row;
  height: ${DOT_SIZE}px;
`;

const Pagination = ({scrollX}: {scrollX: Animated.Value}) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <PaginationContainer>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            transform: [{translateX}],
            borderColor: colors.gray,
          },
        ]}
      />
      {data.map(item => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, {backgroundColor: item.color}]}
            />
          </View>
        );
      })}
    </PaginationContainer>
  );
};

type CarouselScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Product'
>;

const Container = styled(View)`
  flex: 1;
`;

const IconContainer = styled(View)`
  padding-left: 30px;
  padding-bottom: 45px;
`;

export default function Carousel({navigation}: CarouselScreenProps) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const dataLength = data.length;

  return (
    <Container>
      <StatusBar barStyle={'default'} hidden />
      {Array(dataLength + 1)
        .fill(0)
        .map((_, index) => (
          <WeakCircle scrollX={scrollX} key={index} index={index} />
        ))}
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={item => item.key}
        data={data}
        renderItem={({item, index}) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />
      <IconContainer>
        <HomeIcon color={colors.gray} onPress={navigation.goBack} />
      </IconContainer>
      <Pagination scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
    </Container>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: colors.gray,
    fontWeight: '500',
    textAlign: 'left',
    fontStyle: 'italic',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ],
  },
  paginationDot: {
    width: DOT_SIZE * 0.4,
    height: DOT_SIZE * 0.4,
    borderRadius: DOT_SIZE * 0.25,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1,
    position: 'absolute',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: '800',
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
  weakCircle: {
    width: WEAK_CIRCLE_SIZE * 0.3,
    height: WEAK_CIRCLE_SIZE * 0.3,
    borderRadius: WEAK_CIRCLE_SIZE / 2,
    position: 'absolute',
  },
});
