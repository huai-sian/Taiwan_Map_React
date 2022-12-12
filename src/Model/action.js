import axios from 'axios';

export const fetchData = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'PENDING', payload: true });
    try {
      const res = await axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json');
      
      dispatch({ type: 'FETCH_TESTDATA', payload: res.data});
      dispatch({ type: 'PENDING', payload: false });
      dispatch({ type: 'ERROR', payload: null });

    } catch(err) {
      dispatch({ type: 'PENDING', payload: false });
      dispatch({ type: 'ERROR', payload: 'Could not fetch the data' });
    }
    
  }
}