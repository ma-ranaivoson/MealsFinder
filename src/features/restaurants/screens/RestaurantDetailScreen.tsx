/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ScrollView } from 'react-native';
import { Button, List } from 'react-native-paper';
import styled from 'styled-components/native';
import SafeArea from '../../../components/utility/SafeArea';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';

const OrderContainer = styled.View`
  background-color: rgba(255, 255, 255, 0);
`;
const OrderButton = styled(Button)`
  margin: 0 auto;
`;

export default function RestaurantDetailScreen({ route }: any) {
  const { restaurant } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = React.useState(false);
  const [lunchExpanded, setLunchExpanded] = React.useState(false);
  const [dinnerExpanded, setDinnerExpanded] = React.useState(false);
  const [drinkExpanded, setDrinkExpanded] = React.useState(false);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView overScrollMode="never" style={{ marginTop: -20 }}>
        <List.Accordion
          title="Breakfast"
          left={() => (
            <List.Icon
              icon="bread-slice"
              color={breakfastExpanded ? 'tomato' : '#262626'}
            />
          )}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
          titleStyle={{ color: breakfastExpanded ? 'tomato' : '#262626' }}
        >
          <List.Item title="Coffee with milk" />
          <List.Item title="Vary amin'anana" />
        </List.Accordion>

        <List.Accordion
          title="Lunch"
          left={() => (
            <List.Icon
              color={lunchExpanded ? 'tomato' : '#262626'}
              icon="hamburger"
            />
          )}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
          titleStyle={{ color: lunchExpanded ? 'tomato' : '#262626' }}
        >
          <List.Item title="Vary sy tsaramaso" />
          <List.Item title="Steak sandwich" />
          <List.Item title="Hamburger" />
        </List.Accordion>

        <List.Accordion
          title="Dinner"
          left={() => (
            <List.Icon
              color={dinnerExpanded ? 'tomato' : '#262626'}
              icon="food-variant"
            />
          )}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
          titleStyle={{ color: dinnerExpanded ? 'tomato' : '#262626' }}
        >
          <List.Item title="Soup" />
          <List.Item title="Spaghetti" />
          <List.Item title="Vary sosoa" />
        </List.Accordion>

        <List.Accordion
          title="Drink"
          left={() => (
            <List.Icon
              color={drinkExpanded ? 'tomato' : '#262626'}
              icon="cup"
            />
          )}
          expanded={drinkExpanded}
          onPress={() => setDrinkExpanded(!drinkExpanded)}
          titleStyle={{ color: drinkExpanded ? 'tomato' : '#262626' }}
        >
          <List.Item title="Coca cola" />
          <List.Item title="Fanta" />
          <List.Item title="Orange Juice" />
        </List.Accordion>
        <OrderButton mode="contained">Order your meal</OrderButton>
      </ScrollView>
    </SafeArea>
  );
}
