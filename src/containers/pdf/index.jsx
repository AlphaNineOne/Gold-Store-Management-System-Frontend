import React from 'react';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import propTypes from 'prop-types';

// STYLES & ASSETS
import logoImg from 'assets/logo.png';
import { styles } from './styles';
import PdfTable from './components/PdfTable';

function DownloadPdf({ data }) {
  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.image} src={logoImg} />

          <Text style={styles.title}>Sarfaraz Jewellers</Text>
        </View>

        <PdfTable data={data} />
      </Page>
    </Document>
  );
}

DownloadPdf.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
};

DownloadPdf.defaultProps = {
  data: [],
};

export default DownloadPdf;
