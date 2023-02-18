import { IconSettings } from '@tabler/icons';
import { createStyles, Grid, Card, Switch, NumberInput, Text, Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { When } from 'react-if';


// This is Where The settings page is


// Styling for the settings form
const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.teal[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.xxl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  h2: {
    fontSize: theme.fontSizes.lg,
  },
}));

const SettingsForm = () => {

  // Settings Form Logic / Hook
  const [show, setShow] = useState(false);

  const { showComplete,
    setShowComplete,
    pageItems,
    setPageItems,
    saveLocally,
  } = useContext(SettingsContext)

  const { classes } = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    saveLocally();
  }

  return (
    <>
      <h1 className={classes.h1} ><IconSettings /> Manage Settings</h1>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col xs={12} sm={6}>
          <Card withBorder p="xs" style={{ backgroundColor: '#FCC419' }}>
            <Card.Section p="xs">
              <h2 className={classes.h2} >Update Settings</h2>
              <form onSubmit={handleSubmit}>

                {/* Switch for showing / hiding to do items */}
                <Switch
                  color='teal.8'
                  label="Show Completed Items"
                  checked={showComplete}
                  onChange={(e) => setShowComplete(e.currentTarget.checked)}
                />

                {/* Control for toggling number of Todo items per page */}
                <NumberInput
                  mb="sm"
                  value={pageItems}
                  label="Items Per Page"
                  onChange={(value) => setPageItems(value)}
                />

                {/* This button allows the user to see what the current settings are */}
                <Button type="submit" color="teal.8">Show New Settings</Button>

                {/* Updated Settings Show when clicked , elements are below */}
              </form>
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <When condition={show}>

            {/* This is the card that shows what the current settings are whenevre the button is pressed */}
            <Card withBorder p="sm" style={{ backgroundColor: '#FCC419' }}>
              <Card.Section>
                <Text m="xl" fontSize="xl" weight="bold">Updated Settings</Text>
              </Card.Section>
              <Text m="sm">{showComplete ? 'Show' : 'Hide'} Completed Items</Text>
              <Text m="sm">{pageItems} Items Per Page</Text>
              <Text m="sm"></Text>
            </Card>
          </When>
        </Grid.Col>
      </Grid>
    </>
  )
};

export default SettingsForm;
