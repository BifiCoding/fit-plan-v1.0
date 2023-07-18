import React from 'react';
import { Page, Text, Image, Document, StyleSheet } from '@react-pdf/renderer';
import Logo from '../img/Logo.png';
import { Font } from '@react-pdf/renderer';
import RobotoT from '../fonts/Roboto-Regular.ttf';

Font.register({
  family: 'RobotoTFamily',
  src: RobotoT,
});

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
    fontFamily: 'RobotoTFamily',
  },
  image: {
    height: 65,
    width: 100,
    marginHorizontal: 215,
    marginBottom: 10,
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
  boldText: {
    marginBottom: 2,
    fontSize: 16,
    fontWeight: 'bold', // встановлення жирного шрифту
  },
});

function PdfDoc({ textDiet }) {
  const weekdays = [
    'Monday:',
    'Tuesday:',
    'Wednesday:',
    'Thursday:',
    'Friday:',
    'Saturday:',
    'Sunday:',
  ];
  const weekdaysRegex =
    /(Monday:|Tuesday:|Wednesday:|Thursday:|Friday:|Saturday:|Sunday:)/gi;

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src={Logo} />
        <Text style={styles.title}> Diet by FitPlan </Text>
          {textDiet.map((msg, index) => (
            <Text key={index}>
              {msg.message.split(weekdaysRegex).map((part, partIndex) =>
                weekdays.includes(part) ? (
                  <Text key={partIndex} style={[styles.boldText]}>
                    {part}
                  </Text>
                ) : (
                  <Text key={partIndex} style={styles.text}>
                    {part}
                  </Text>
                )
              )}
            </Text>
          ))}
      </Page>
    </Document>
  );
}

export default PdfDoc;
