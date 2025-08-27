import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import propTypes from 'prop-types';

// COMPONENTS & STYLES
import PdfTableHead from './PdfTableHead';
import { styles } from '../styles';

function PdfTable({ data }) {
  const receivableTotal = data[0]?.total_receivable_gold;
  const payableTotal = data[0]?.total_payable_gold;
  const totalBalance = receivableTotal - payableTotal;
  const emptyvalue = '0.000';
  return (
    <View style={styles.table}>
      <PdfTableHead />

      <View style={styles.tableBody}>
        {data?.map((item, idx, array) => (
          <View key={item?.id} style={array?.length !== -1 ? styles.tableRow : styles.lastTableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{item?.account_name}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{moment(item?.created_at).format('DD-MM-YY')}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{item?.receivable ?? emptyvalue}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={{ ...styles.tableCellText, color: 'red' }}>{item?.payable ?? emptyvalue}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{item?.rati ?? emptyvalue}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{item?.gold ?? emptyvalue}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{item?.cash_in ?? emptyvalue}</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={{ ...styles.tableCellText, color: 'red' }}>{item?.cash_out ?? emptyvalue}</Text>
            </View>
          </View>
        ))}

        <View style={styles.tableRow}>
          <View style={styles.flexRow}>
            <View style={styles.tableCell}>
              <Text style={styles.boldText}>Total Receivable :</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{receivableTotal ?? emptyvalue} </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.flexRow}>
            <View style={styles.tableCell}>
              <Text style={styles.boldText}>Total Payable :</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{payableTotal ?? emptyvalue}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.flexRow}>
            <View style={styles.tableCell}>
              <Text style={styles.boldText}>Total Balance :</Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.tableCellText}>{totalBalance ?? emptyvalue}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

PdfTable.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
};

PdfTable.defaultProps = {
  data: [],
};

export default PdfTable;
