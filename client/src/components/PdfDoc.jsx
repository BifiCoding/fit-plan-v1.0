import React from 'react';
import { Page, Text, Image, Document, StyleSheet, Font} from '@react-pdf/renderer';
import Logo from '../img/Logo.png';


Font.register({ family: 'Roboto', src: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' });

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Roboto',
  },
  image: {
    height: 65,
    width: 100,
    marginHorizontal: 215,
    marginBottom:10,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

function PdfDoc({ textDiet }) {

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src={Logo} />
        <Text style={styles.title}> Diet by FitPlan </Text>
        <Text style={styles.text}>
          {textDiet.map((msg, index) => (
            <Text key={index}>{msg.message}</Text>
          ))}
        </Text>
      </Page>
    </Document>
  );
}

export default PdfDoc;
