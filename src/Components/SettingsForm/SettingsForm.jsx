// import { IconSettings } from '@tabler/icons';
import { createStyles, Grid, Card, Switch, Text, NumberInput, TextInput, Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  }
}));

const SettingsForm = () => {

  const [show, setShow] = useState(false);

  const { showComplete,
    setShowComplete,
    pageItems,
    setPageItems,
    sort,
    setSort,
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
      <h1 className={classes.h1} > Manage Settings</h1>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col xs={12} sm={6}>
          <Card withBorder p="xs">
            <Card.Section p="xs">
              <Text>Updated Settings</Text>
              <form onSubmit={handleSubmit}>
                <Switch
                  label="Show Complete Todos"
                  checked={showComplete}
                  onChange={(e) => setShowComplete(e.currentTarget.checked)}
                />
                <NumberInput
                  mb="sm"
                  value={pageItems}
                  label="Items Per Page"
                  onChange={(value) => setPageItems(value)}
                />
                <TextInput
                  mb="sm"
                  placeholder={sort}
                  onChange={(e) => setSort(e.target.value)}
                  label="Sort Keyword"
                />
                <Button type="submit">Show New Settings</Button>
              </form>
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>

        </Grid.Col>
      </Grid>
    </>
  )
};

export default SettingsForm;
