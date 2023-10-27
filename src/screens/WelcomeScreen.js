import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ImageBackground
				source={require("../../assets/background.png")}
				style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

				<View style={styles.container}>
					<View style={styles.box}>
						<View style={styles.box2}>
							<Image
								style={styles.img}
								source={require("../../assets/customer.png")} />
						</View>
						<TouchableOpacity
							onPress={() => navigation.navigate("Login")}
							style={styles.button}>
							<Text style={styles.text}>Customer</Text>
						</TouchableOpacity>

					</View >
					<View style={styles.box}>
						<View style={styles.box2}>
							<Image style={styles.img} source={require("../../assets/driver.png")} />
						</View>

						<TouchableOpacity
						    onPress={() => navigation.navigate("Login")}
							style={styles.button}>
							<Text style={styles.text}>Driver</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{
					width: 170,
					height: 210,
					backgroundColor: '#ccc',
					borderRadius: 15,
					padding: 10,
				}}>
					<View style={styles.box2}>
						<Image style={styles.img} source={require("../../assets/cleaner.png")} />
					</View>
					<TouchableOpacity

						style={styles.button}>
						<Text style={styles.text}>Cleaner</Text>
					</TouchableOpacity>
				</View>



			</ImageBackground>

		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	box: {
		flex: 1,
		backgroundColor: '#ccc',
		padding: 10,
		height: 210,
		borderRadius: 15,
		margin: 10

	},
	box2: {
		backgroundColor: 'white',
		padding: 10,
		height: 150,
		marginBottom: 10,
		borderRadius: 15,
		justifyContent: "center"
	},
	text: {
		textAlign: 'center',
		color: 'white',
		zIndex: 5,
		fontFamily: "Roboto",
		fontWeight: "700"
	},
	button: {
		flex: 1,
		backgroundColor: '#F1AE4A',
		padding: 1,
		borderRadius: 15,


	},
	img: {
		marginLeft: 15,
		height: 120
	}
});

export default WelcomeScreen;
