import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories, colors } from "../../jobMarketConstant";

const CategoriesFilter = () => {
	return (
		<View>
			<ScrollView horizontal showsHorizontalScrollIndicator={true}>
				{categories.map((category, index) => {
					return (
						<View
							key={index}
							style={{
								backgroundColor:
									index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_LIGHT,
								marginRight: 10,
								borderRadius: 8,
								paddingHorizontal: 16,
								paddingVertical: 3,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 4 },
								shadowOpacity: 0.1,
								shadowRadius: 7,
								marginVertical: 16,
								marginLeft: 10,
								marginTop: 0,
							}}
						>
							<Text
								style={{
									color: index === 0 && colors.COLOR_LIGHT,
									fontSize: 18,
								}}
							>
								{category.category}
							</Text>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default CategoriesFilter;

const styles = StyleSheet.create({});

