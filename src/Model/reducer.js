const initState = {
  data: [],
  isPending: false,
  error: null,
  recordData: [],
  filterData: [],
  testData: []
};

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload }
    case 'PENDING': 
      return { ...state, isPending: action.payload }
    case 'ERROR': 
      return { ...state, error: action.payload }
    case 'RECORD_DATA': 
      return { ...state, recordData: action.payload }
    case 'FILTERED_DATA': 
      return { ...state, filterData: action.payload }
    default:
      return state
  }
}

const modeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_TESTDATA':
      return { ...state, testData: action.payload }
    default:
      return state
  }
}

export { dataReducer, modeReducer };