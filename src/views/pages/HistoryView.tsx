/* eslint-disable react-native/no-inline-styles */
import { MoneyDiffProps, MoneyDiff } from '@components/extended/MoneyDiff';
import { Content } from '@components/structure/Content';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import { FlyoutContext } from '@context/FlyoutContext';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase, RouteProp } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo, Text, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

const dummyPayments: MoneyDiffProps[] = [
  {
    name: 'Friend A',
    amount: -14.56,
  },
  {
    name: 'Another Friend',
    amount: -7.13,
  },
  {
    name: 'Another Friend',
    amount: -17.56,
  },
  {
    name: 'Another Friend',
    amount: -2.99,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
];

type HistoryViewProps = {
  route: RouteProp<ParamListBase, any>;
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
};

const data = [
  {
    title: 'History',
    data: dummyPayments,
  },
];

export function HistoryView({}: HistoryViewProps) {
  const flyout = React.useContext(FlyoutContext);

  function openFlyout(children: ReactNode) {
    flyout.setChildren(children, true);
  }

  // TODO lome: Remove inline
  function renderFlyoutContent(p: MoneyDiffProps) {
    return (
      <View style={{ height: 80 }}>
        <Text style={{ fontSize: 24 }}>Person: {p.name}</Text>
        <Text style={{ fontSize: 24 }}>Amount: {p.amount}</Text>
      </View>
    );
  }

  function renderListItem({ item, index, section }: SectionListRenderItemInfo<MoneyDiffProps, DefaultSectionT>) {
    return (
      <Content>
        <MoneyDiff
          key={uuid()}
          name={item.name}
          amount={item.amount}
          last={index === section.data.length - 1}
          onPress={() => openFlyout(renderFlyoutContent(item))}
        />
      </Content>
    );
  }

  return (
    <ViewBase>
      <SectionList
        style={{ flex: 1 }}
        sections={data}
        renderItem={renderListItem}
        keyExtractor={() => uuid()}
        renderSectionHeader={({ section: { title } }) => <SectionHeader key={uuid()} header={title} />}
      />
    </ViewBase>
  );
}
