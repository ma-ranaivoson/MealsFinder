/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import SafeArea from '../../../components/utility/SafeArea';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';

export default function RestaurantDetailScreen({ route }: any) {
  const { restaurant } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = React.useState(false);
  const [lunchExpanded, setLunchExpanded] = React.useState(false);
  const [dinnerExpanded, setDinnerExpanded] = React.useState(false);
  const [drinkExpanded, setDrinkExpanded] = React.useState(false);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView overScrollMode="never">
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
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic breakfast" />
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
          <List.Item title="Burger with fries" />
          <List.Item title="Steak sandwich" />
          <List.Item title="Mushroom soup" />
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
          <List.Item title="Rice" />
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
          <List.Item title="Lemon juice" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
}
