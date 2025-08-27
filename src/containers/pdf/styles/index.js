import { StyleSheet } from '@react-pdf/renderer';
import { primary, secondary } from 'styles/colors';

const COL_WIDTH = `${100 / 8}%`;

const commonTableRowStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  minHeight: '30px',
};

export const styles = StyleSheet.create({
  viewerStyles: {
    height: '500px',
    width: '90%',
  },
  page: {
    padding: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
  },
  title: {
    color: primary,
    fontSize: '35px',
  },
  image: {
    width: '150px',
    maxWidth: '100%',
  },
  table: {
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    width: '100%',
    overflow: 'hidden',
    margin: '20px 0',
  },
  tableHead: {
    backgroundColor: secondary,
    padding: '10px 7px',
    color: 'white',
    width: COL_WIDTH,
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    ...commonTableRowStyles,
    borderBottom: '1px solid #e3e3e3',
  },
  lastTableRow: {
    ...commonTableRowStyles,
  },
  tableBody: {
    width: '100%',
  },
  tableCell: {
    padding: '10px',
    width: COL_WIDTH,
    textAlign: 'center',
  },
  colText: {
    fontSize: '12px',
  },
  tableCellText: {
    fontSize: '10px',
  },
  flexRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    marginTop: '12px',
    justifyContent: 'flex-end',
  },
  boldText: {
    textAlign: 'left', width: '140px', fontWeight: 'bold', fontSize: '12px',
  },
});

export const test = '';
