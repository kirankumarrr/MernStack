import React, { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import MaterialTable from 'material-table';
import 'date-fns';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loader from '../Loaders/Loaders';
import { Link } from 'react-router-dom';
import { getYearAndMonth } from '../../utils/date';
import { Button } from '@mui/material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function daysBetween(first, second) {
  // Copy date parts of the timestamps, discarding the time parts.
  var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
  var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

  // Do the math.
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var millisBetween = two.getTime() - one.getTime();
  var days = millisBetween / millisecondsPerDay;

  // Round down.
  return Math.floor(days);

  // it will return date difference in days
}

function getDateColors(inputDate) {
  const key = daysBetween(new Date(inputDate), new Date());
  switch (key) {
    case 0:
      return '#78FF03';
    case 1:
      return '#FAFF03';
    case 2:
      return '#FFAD03';

    default:
      return '#FF5703';
  }
}

function MonthBasedCards() {
  const { useState } = React;
  const [columns] = useState([
    { title: 'Name', field: 'name', editable: 'onAdd' },
    {
      title: 'Available',
      field: 'avaiable',
      initialEditValue: '0',
      minWidth: '100px',
    },

    {
      title: 'Available Amount last updated',
      field: 'updatedAt',
      render: (rowData) => (
        <table>
          <tbody>
            <tr>
              <td
                style={{
                  backgroundColor: getDateColors(rowData.updatedAt),
                  padding: '10px',
                  fontWeight: 'bold',
                }}
              >
                {moment(
                  moment(rowData.updatedAt),
                  'ddd DD-MMM-YYYY, hh:mm A'
                ).format('DD-MMM-YYYY hh:mm A')}
              </td>
            </tr>
          </tbody>
        </table>
      ),
      editable: 'never',
      minWidth: '250px',
    },
    {
      title: 'Generated Bill Amount',
      field: 'amount',
      initialEditValue: '0',
      minWidth: '200px',
    },
    {
      title: 'Last Date to Pay Bill',
      field: 'date',
      type: 'datetime',
      render: (rowData) => {
        return (
          <table>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor:
                      rowData.amount !== 0
                        ? getDateColors(rowData.date, rowData.amount)
                        : '#05ACFF',
                    padding: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {moment(
                    moment(rowData.date),
                    'ddd DD-MMM-YYYY, hh:mm A'
                  ).format('DD-MMM-YYYY')}
                </td>
              </tr>
            </tbody>
          </table>
        );
      },
      editComponent: ({ value, onChange }) => (
        <Grid container justifyContent="space-around">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
              format="MM/dd/yyyy"
            />
          </LocalizationProvider>
        </Grid>
      ),
      minWidth: '200px',
    },
  ]);
  const [data, setData] = useState();
  const [yearMonth, setYearMonth] = useState(getYearAndMonth(new Date()));
  const [isSuccess, setIsSuccess] = useState(false);
  const fetch = async (calenderDateDetails) => {
    setIsSuccess(true);
    axios
      .get(`api/reminders/dynamic/${calenderDateDetails}`, data)
      .then((response) => {
        setIsSuccess(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setData([]);
        setIsSuccess(false);
      });
  };

  const generateCards = async () => {
    const response = await axios.get(`api/reminders/cards`);
    debugger;
    if (response && response?.data?.data) {
      response.data.data.forEach((element) => {
        delete element._id;
      });
      const datesDetails = yearMonth.split('/');
      const defaultCards = {
        month: datesDetails[1],
        year: datesDetails[0],
        cards: response.data.data,
      };

      const newCards = await axios.post(`api/reminders/dynamic`, defaultCards);

      if (newCards) {
        fetch(yearMonth);
      }
    }
  };

  const createCard = (data) => {
    setIsSuccess(true);
    data.date = new Date();
    const newdata = {
      ...data,
      amount: +data.amount,
      avaiable: +data.avaiable,
    };
    return axios
      .post(`api/reminders/dynamic/${yearMonth}`, newdata)
      .then((response) => {
        fetch(yearMonth);
        setIsSuccess(false);
        return response;
      })
      .catch((error) => {
        setIsSuccess(false);
        return error;
      });
  };

  const updateCard = (newData, oldData) => {
    setIsSuccess(true);
    data.date = new Date();
    const newPayload = {
      ...newData,
      amount: +newData.amount,
      avaiable: +newData.avaiable,
    };
    return axios
      .put(`api/reminders/dynamic/${yearMonth}`, newPayload)
      .then((response) => {
        fetch(yearMonth);
        return response;
        // setIsSuccess(false)
      })
      .catch((error) => {
        setIsSuccess(false);
        return error;
      });
  };

  useEffect(() => {
    fetch(yearMonth);
  }, []);

  return (
    <div>
      <Loader isOpen={isSuccess} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <h4>Monthly View Cards</h4>
        <Link to={'/'} style={{ color: '#fff' }}>
          Home
        </Link>

        <button
          onClick={() => {
            fetch(yearMonth);
          }}
        >
          Refresh
        </button>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            //   minDate={dayjs('2012-03-01')}
            //   maxDate={dayjs('2023-06-01')}
            value={yearMonth}
            onChange={(newValue) => {
              const details = getYearAndMonth(newValue);
              setYearMonth(details);
              fetch(details);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </div>
      {data && data.length > 0 ? (
        <MaterialTable
          title="Monthly View Cards"
          columns={columns}
          data={data}
          editable={{
            onRowAdd: (newData) => createCard(newData),
            onRowUpdate: (newData, oldData) => updateCard(newData, oldData),
          }}
          options={{
            paging: false,
          }}
        />
      ) : (
        <>
          <h1>Details Doesnt Exist.</h1>
          <button
            onClick={() => {
              generateCards();
            }}
          >
            Generate Cards
          </button>
        </>
      )}
    </div>
  );
}
export default MonthBasedCards;
