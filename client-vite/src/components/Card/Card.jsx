import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MaterialTable from 'material-table';
import 'date-fns';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loader from '../Loaders/Loaders';

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

function Cards() {
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
  const [isSuccess, setIsSuccess] = useState(false);
  //   const fetch = async () => {
  //     setIsSuccess(true);
  //     axios
  //       .get(`api/reminders/dynamic/2022/january`, data)
  //       .then((response) => {
  //         console.log('response', response);
  //         setIsSuccess(false);
  //         setData(response.data.data);
  //       })
  //       .catch((error) => {
  //         console.log('error :', error);
  //         setIsSuccess(false);
  //       });
  //   };

  const fetch = async () => {
    setIsSuccess(true);
    axios
      .get(`api/reminders/cards`, data)
      .then((response) => {
        setIsSuccess(false);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log('error :', error);
        setIsSuccess(false);
      });
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
      .post(`api/reminders/cards`, newdata)
      .then((response) => {
        fetch();
        setIsSuccess(false);
        return response;
      })
      .catch((error) => {
        console.log('Failed to created :', error);
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
      .put(`api/reminders/cards/${newPayload._id}`, newPayload)
      .then((response) => {
        fetch();
        return response;
        // setIsSuccess(false)
      })
      .catch((error) => {
        console.log('Failed to created :', error);
        setIsSuccess(false);
        return error;
      });
  };

  useEffect(() => {
    fetch();
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
        <h4>Card Details</h4>
        <Link to={'/cards'}>Goto Cards</Link>
        <button
          onClick={() => {
            fetch();
          }}
        >
          Refresh
        </button>
      </div>
      {data && data.length > 0 ? (
        <MaterialTable
          title="Cards View"
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
        <Loader isOpen />
      )}
    </div>
  );
}
export default Cards;
