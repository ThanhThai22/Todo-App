import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import icons from '../../constants/icons'

export default function TabLayout() {

    const TabIcon = ({icon, color, name, focused}) => {
        return (
          <View className={`${focused ? 'items-center justify-center gap-2.5 mb-3' : 'items-center justify-center gap-1.5 mb-2'}`}>
            <Image
              source={icon}
              resizeMode='contain'
              tintColor={color}
              className={`${focused ? 'w-7 h-7' : 'w-6 h-6'}`}
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
              {name}
            </Text>
          </View>
        )
      }


  return (
    // <>
    //   <Tabs
    //   screenOptions={{ 
    //       tabBarShowLabel: false,
    //       tabBarActiveTintColor: '#FFA001',
    //       tabBarInactiveTintColor: '#CDCDE0',
    //       tabBarStyle: {
    //         backgroundColor: '#161622',
    //         borderTopWidth: 1,
    //         borderTopColor: '#232533',
    //         height: 50,
    //       }
    //      }}
    //   >

    //   {/* home  */}
    //   <Tabs.Screen 
    //       name="home"
    //       options={{ 
    //         title: "Home",
    //         headerShown: false,
    //         tabBarIcon: ({color, focused}) => (
    //           <TabIcon
    //             icon={icons.home}
    //             color={color}
    //             name="Home"
    //             focused={focused}
    //           />
    //         )
    //        }}
    //     />

    //   </Tabs>
    // </>
    <Stack>
        <Stack.Screen name='home' options={{ headerShown: false }}/>
    </Stack>
  )
}