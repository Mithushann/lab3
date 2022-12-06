import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    element: {
      marginBottom: 10,
      border: 3,
      borderColor: "blue",
      borderRadius: 5
    },
  
    list: {
      width: 400, 
      padding: 25 
    },
  
    selectedList: {
        width: 200, 
        height: 50, 
        backgroundColor: "white", 
        borderRadius: 5, 
        elevation: 5, 
        padding: 10 
      },
  
    smallText: {
      fontSize: 10, 
      color: "grey" 
  },
  
  bigText:{ 
    fontSize: 15, 
    fontWeight: "bold" 
  },
  
  rowView:{
    flex: 1,
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  
  card:{ 
    backgroundColor: "white", 
    padding: 10, 
    margin: 5, 
    borderRadius: 5, 
    elevation: 5 
  },
  
  });

  export default styles;