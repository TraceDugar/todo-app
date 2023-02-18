import { Badge, Card, CloseButton, Group, Pagination, Text } from '@mantine/core';
import { useContext, useState } from 'react';
import { If, Then, Else } from 'react-if';
import { AuthContext } from '../../Context/Auth';
import { SettingsContext } from '../../Context/Settings';
import Auth from '../Auth';

//  The are the To Do Items

const List = ({ list, toggleComplete, deleteItem, sortKeyword }) => {

  // Hooks for Role Based Access Control and Pagination 
  const { can, isLoggedIn } = useContext(AuthContext);
  const { showComplete, pageItems } = useContext(SettingsContext);
  const [page, setPage] = useState(1);

  // Logic for Pagination
  const listToRender = showComplete ? list : list.filter(item => !item.complete);
  const listStart = pageItems * (page - 1);
  const listEnd = listStart + pageItems;
  const pageCount = Math.ceil(listToRender.length / pageItems);
  const displayList = listToRender.slice(listStart, listEnd);

  return (
    <>
      {
        displayList.map(item => (

          // To Do Item cards
          <Card key={item._id} withBorder shadow="md" mb="sm" style={{ backgroundColor: "#FCC419" }} >
            <Card.Section withBorder >
              <Group position="apart">

                {/* Pending / Complete Button */}
                <Group>
                  <If condition={isLoggedIn && can('update')}>
                    <Then>
                      <Badge
                        color={item.complete ? "red.8" : "indigo.8"}
                        variant="filled"
                        onClick={() => toggleComplete(item)}
                        m="3px"
                      >
                        {item.complete ? 'Complete' : 'Pending'}
                      </Badge>
                    </Then>
                    <Else>
                      <Badge
                        color={item.complete ? "red.8" : "indigo.8"}
                        variant="filled"
                        m="3px"
                      >
                        {item.complete ? 'Complete' : 'Pending'}
                      </Badge>
                    </Else>
                  </If>

                  {/* The person the todo item was assigned to */}
                  <Text>{item.assignee}</Text>
                </Group>

                {/* X Button that deletes the To Do Items */}
                <Auth capability="delete">
                  <CloseButton
                    title="Close Item"
                    onClick={() => deleteItem(item._id)}
                  />
                </Auth>
              </Group>
            </Card.Section>

            {/* Card Body Text */}
            <Text mt="sm">{item.text}</Text>
            <Text align="right" >Difficulty: {item.difficulty}</Text>
          </Card>
        ))}


      {/* The current page and available pages underneath the To Do items. */}
      <Pagination page={page} onChange={setPage} total={pageCount} color="teal.8" />
    </>
  )
};

export default List;
