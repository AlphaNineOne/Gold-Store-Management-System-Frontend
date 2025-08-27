import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles';
import { pdfReportTableHead } from '../utilities/data';

function PdfTableHead() {
  return (
    <View style={styles.tableRow}>
      {pdfReportTableHead?.map(cell => (
        <View style={styles.tableHead} key={cell?.label}>
          <Text style={styles.colText}>{cell?.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default PdfTableHead;
