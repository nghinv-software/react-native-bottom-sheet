
# @nghinv/react-native-bottom-sheet

A custom alert component with react-native-reanimated

<img src="./assets/example.gif" height="600"/>

# Installation

## Installing the package

* Use yarn

```sh
yarn add @nghinv/react-native-bottom-sheet
```

* Use npm

```sh
npm install @nghinv/react-native-bottom-sheet
```

* Peer dependencies 
	- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
	- [@nghinv/react-native-icons](https://github.com/nghinv-software/react-native-icons)

# How to use

1. Wrapper `BottomSheetService` in the `Root Component`

```javascript
  import { BottomSheetService } from '@nghinv/react-native-bottom-sheet';

  ...
  return (
    <BottomSheetService>
      <RootComponent />
    </BottomSheetService>
  );
  ...
```

2. Use `BottomSheet.show()` and `BottomSheet.hide()`

```javascript
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BottomSheet } from '@nghinv/react-native-bottom-sheet';

export default function Example() {
  const onPress = () => {
    BottomSheet.show({
      bottomButton: {
        title: 'Cancel',
      },
      header: {
        title: 'Chọn thời gian',
        rightIconProps: {
          color: 'tomato',
        },
      },
      optionProps: {
        titleCenter: false,
      },
      options: [
        { title: 'What language do you want to study most?', checked: false },
        { title: 'Where did you go in the first week on your honeymoon?', checked: true },
        { title: 'banana' },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Button title='Show bottom sheet' onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  }
});
```