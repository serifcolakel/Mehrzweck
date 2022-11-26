import {useWindowDimensions, View} from 'react-native';
import React from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import styled from 'styled-components';
import CustomText from '../../components/CustomText';
import {colors} from '../../utils/colors';
import {PADDING} from '../../constant';

const ChatHomeScreenContainer = styled(View)`
  flex: 1;
  background-color: ${colors.white};
`;
const TabBarContainer = styled(TabBar)`
  background-color: #fff;
`;

type Props = {};

const ChatHomeScreen = ({}: Props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const renderScene = SceneMap({
    first: () => <CustomText label={'route.title1'} />,
    second: () => <CustomText label={'route.title2'} />,
    third: () => <CustomText label={'route.title3'} />,
    fourth: () => <CustomText label={'route.title4'} />,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
    {key: 'fourth', title: 'Fourth'},
  ]);
  return (
    <ChatHomeScreenContainer>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        sceneContainerStyle={{
          padding: PADDING.SIXTEEN,
        }}
        renderTabBar={tabProps => (
          <TabBarContainer
            {...tabProps}
            indicatorContainerStyle={{
              backgroundColor: colors.primary,
            }}
            indicatorStyle={{backgroundColor: colors.white}}
            renderLabel={({route, focused}) => (
              <CustomText
                label={route.title!}
                style={{
                  color: focused ? colors.white : colors.secondary,
                }}
              />
            )}
          />
        )}
        initialLayout={{width: layout.width, height: layout.height}}
        accessibilityLabel="ChatHomeScreenTabView"
      />
    </ChatHomeScreenContainer>
  );
};

export default ChatHomeScreen;
