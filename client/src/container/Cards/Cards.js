import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import MaterialTable from 'material-table';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
function Cards() {
  const { useState } = React;
  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name', editable: 'never' },
    {
      title: 'Avaiable',
      field: 'avaiable',
      initialEditValue: '0'
    },
    {
      title: 'Amount to Be paid',
      field: 'amount',
      initialEditValue: '0'
    },
    {
      title: 'update At',
      field: 'updatedAt',
      render: rowData => (
        <td>
          {moment(moment(rowData.updatedAt), 'ddd DD-MMM-YYYY, hh:mm A').format(
            'DD-MMM-YYYY hh:mm A'
          )}
        </td>
      ),
      editable: 'never'
    },
    {
      title: 'Last Date',
      field: 'date',
      type: 'datetime',
      render: rowData => {
        return (
          <td>
            {moment(moment(rowData.date), 'ddd DD-MMM-YYYY, hh:mm A').format(
              'DD-MMM-YYYY hh:mm A'
            )}
          </td>
        );
      },
      editComponent: ({ value, onChange }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={value}
              onChange={onChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      )
    }
  ]);
  const [data, setData] = useState();

  const onChangeDate = (...args) => {
    console.log('...args', [...args]);
  };

  const fetch = async () => {
    axios
      .get(`api/reminders/cards`, data)
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log('error :', error);
      });
  };

  const createCard = data => {
    let isSuccess = false;
    data.date = new Date();
    const newdata = {
      ...data,
      amount: +data.amount,
      avaiable: +data.avaiable
    };
    return axios
      .post(`api/reminders/cards`, newdata)
      .then(response => {
        fetch();
        isSuccess = true;
        return response;
      })
      .catch(error => {
        console.log('Failed to created :', error);
        return error;
      });

    // return isSuccess
  };

  const updateCard = (newData, oldData) => {
    let isSuccess = false;
    data.date = new Date();
    const newPayload = {
      ...newData,
      amount: +newData.amount,
      avaiable: +newData.avaiable
    };
    return axios
      .put(`api/reminders/cards/${newPayload._id}`, newPayload)
      .then(response => {
        fetch();
        return response;
      })
      .catch(error => {
        console.log('Failed to created :', error);
        return error;
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px'
        }}
      >
        <h1>Card Details</h1>
        <button
          onClick={() => {
            fetch();
          }}
        >
          Refresh
        </button>
      </div>
      <MaterialTable
        title="Cards View"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData => createCard(newData),
          onRowUpdate: (newData, oldData) => updateCard(newData, oldData),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
      />
    </div>
  );
}
export default Cards;
