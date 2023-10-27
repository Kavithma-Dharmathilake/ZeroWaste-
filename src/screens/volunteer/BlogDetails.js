import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    FlatList,
    ScrollView
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Header1 from "../../components/volunteer/Header1";
import {FontAwesome} from "@expo/vector-icons";
import OneEvent from "../../components/volunteer/OneEvent";
import BottomNav from "../../components/volunteer/BottomNav";
import Header2 from "../../components/volunteer/Header2";



const BlogDetails = ({route}) => {
    const {title} = route.params;
    const {author} = route.params;
    const {time} = route.params;
    const {img} = route.params;
    const {date} = route.params;
    const {description} = route.params;
    const {likes} = route.params;
    const {like} = route.params;
    const {comments} = route.params;

    const navigation = useNavigation();
    function handleComment() {

        navigation.navigate("AllComments");

    }

    function handleInvite() {
        //todo
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <ImageBackground source={require("../../../assets/volunteer/vbg1.png")}
                             style={{flex: 1, textAlign: 'center'}}>
                <ScrollView>
                    <Header2 headerText={title}/>

                    <View style={{flexDirection:"row"}}>
                        <FontAwesome
                            name="user"
                            color="black"
                            size={40}
                            style={{marginLeft:100, flex:1, marginTop:120}}
                        />
                        <View style={{flexDirection:"column", flex:1}}>
                        <Text style={{marginLeft:-100, flex:1, marginTop:110}}>Writtern By:</Text>
                        <Text style={{marginLeft:-100, flex:1,fontSize:20}}>{author}</Text>
                            <Text style={{marginLeft:-100, flex:1,}}>{date}</Text>
                        </View>

                    </View>
                    <Image source={{uri:img}} style={{marginLeft:35, marginTop:30, height:200, width:330}}></Image>

                    <View style={styles.about}>
                        <Text style={{fontSize: 20}}>{description}</Text>
                        <Text></Text>

                    </View>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={styles.joine}
                            onPress={handleComment}>
                            <Text style={{fontSize: 20, color: "#F3AF4A", fontWeight: "bold", marginLeft: 15}}>{comments} Comments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.joine1}
                            onPress={handleInvite}>
                            <Text style={{fontSize: 20, color: "black", fontWeight: "bold", marginLeft: 30}}>Invite
                                Event</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <BottomNav style={{flex: 1}}/>
            </ImageBackground>

        </SafeAreaView>
    );
}

export default BlogDetails;

const styles = StyleSheet.create({

    about: {
        backgroundColor: "white",
        borderRadius: 20,
        height: 350,
        margin: 20,
        padding: 20,
        marginTop: 30,
    },
    joine: {
        backgroundColor: "#1F716D",
        height: 70,
        width: 220,
        padding: 20,
        margin: 20,
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },
    joine1: {
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: "#1F716D",
        height: 70,
        width: 150,
        padding: 20,
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },

})
