export const addEditReportReducerState = { isEditModalOpen: false, selected: null, account: null };

export const addEditReportReducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { isEditModalOpen: true, ...action.payload };
    case 'select':
      return { ...state, ...action.payload };
    case 'close':
      return { selected: null, isEditModalOpen: false, account: null };
    default:
      return state;
  }
};

export const test = '';
