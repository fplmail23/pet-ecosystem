import { View, Text, StyleSheet } from "react-native";
export default function ServicesScreen() {
  return <View style={s.c}><Text style={s.t}>Servicios</Text><Text style={s.d}>Proximamente</Text></View>;
}
const s = StyleSheet.create({ c:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#fff"}, t:{fontSize:22,fontWeight:"bold",color:"#1a1a2e"}, d:{fontSize:14,color:"#666",marginTop:8} });
