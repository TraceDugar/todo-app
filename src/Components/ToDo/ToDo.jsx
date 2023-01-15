import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, createStyles, Grid, Slider, Text, TextInput } from '@mantine/core';

// import { SettingsContext } from '../../Context/Settings/index.jsx';
import List from '../List/index';
import Auth from '../Auth/index.jsx';
import axios from 'axios';

// To Do Styling

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.xxl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  }
}));


const ToDo = () => {

  const { classes } = useStyles();

  //  Hooks

  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  // Create Functionality

  async function addItem(item) {
    item.complete = false;
    console.log(item);
    const config = {
      url: '/todo',
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'post',
      data: item
    }
    const response = await axios(config)
    setList([...list, response.data]);
  };

  // Delete Functionality

  async function deleteItem(_id) {
    const config = {
      url: `/todo/${_id}`,
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'delete',
    }
    const response = await axios(config)
    console.log(response.data)
    getList();
  };

  // Update functionality for Complete / Pending Toggle

  async function toggleComplete(item) {
    const complete = !item.complete
    const config = {
      url: `/todo/${item._id}`,
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'put',
      data: { ...item, complete },
    }
    const response = await axios(config)
    console.log('updated: ', response.data)
    getList();

  };

  // Read Functionality

  async function getList() {
    const config = {
      url: '/todo',
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'get',
    }
    let response = await axios(config);
    setList(response.data.results);
  };

  // Functionality for total number of to do item in header bar on homepage

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  // Get Method

  useEffect(() => {
    (async () => {
      const config = {
        url: '/todo',
        baseURL: 'https://api-js401.herokuapp.com/api/v1',
        method: 'get',
      }
      let response = await axios(config);
      setList(response.data.results);
    })();
  }, []);

  return (
    <>

      <h1 data-testid="todo-h1" className={classes.h1}>To Do List: {incomplete} items pending</h1>

      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Auth capability="create">
          <Grid.Col xs={12} sm={4}>
            <Card withBorder>
              <form onSubmit={handleSubmit}>

                {/* To Do items Detail Form */}

                <h2>Add To Do Item</h2>


                {/* To do Item Name */}

                <TextInput
                  name="text"
                  placeholder="Item Details"
                  onChange={handleChange}
                  label="To Do Item :"
                />

                {/* To Do Item Is assigned to this person */}

                <TextInput
                  name="assignee"
                  placeholder="Name"
                  onChange={handleChange}
                  label="Assigned To :"
                />

                {/* Difficulty level slider */}

                <Text>Difficulty Level</Text>
                <Slider
                  name="Difficulty"
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={defaultValues.difficulty}
                />

                <Button type="submit">Add Item</Button>
              </form>

              {/*  To Do Item forms */}

            </Card>
          </Grid.Col>
        </Auth>
        <Auth capability="read">
          <Grid.Col xs={12} sm={8}>
            <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
          </Grid.Col>
        </Auth>
      </Grid>
    </>
  );
};

export default ToDo;