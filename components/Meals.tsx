import CachedImage from "@/utils/CachedImage";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Category } from "./Categories";
import Loading from "./Loading";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Props = {
  categories: Category[];
  meals: Meal[];
};

const Meals = ({ categories, meals }: Props) => {
  return (
    <View className="mx-4 space-y-3">
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        Meals
      </Text>
      <View>
        {categories.length > 0 && meals.length > 0 ? (
          <MasonryList
            data={meals}
            keyExtractor={(item): string => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <MealCard item={item as Meal} index={i} />
            )}
            onEndReachedThreshold={0.1}
          />
        ) : (
          <Loading size="large" className="mt-20" />
        )}
      </View>
    </View>
  );
};

type MealCardProps = {
  item: Meal;
  index: number;
};

const MealCard = ({ item, index }: MealCardProps) => {
  const router = useRouter();
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => {
          router.navigate({ pathname: "mealdetail", params: item });
        }}
      >
        {Platform.OS === "android" ? (
          <Image
            source={{ uri: item.strMealThumb }}
            style={{
              width: "100%",
              height: index % 3 === 0 ? hp(25) : hp(35),
              borderRadius: 35,
            }}
            className="bg-black/5"
          />
        ) : (
          <CachedImage
            uri={item.strMealThumb}
            style={{
              width: "100%",
              height: index % 3 === 0 ? hp(25) : hp(35),
              borderRadius: 35,
            }}
            className="bg-black/5"
            // sharedTransitionTag={item.strMeal}
          />
        )}
        <Text
          className="ml-2 font-semibold text-neutral-600"
          style={{ fontSize: hp(1.5) }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Meals;
