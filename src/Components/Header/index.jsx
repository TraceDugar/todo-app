import { createStyles, Group } from '@mantine/core';
import { Link } from "react-router-dom";
import Login from "../Login"

// Styling for the Navbar / Header

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.blue[7],
    padding: theme.spacing.md,
  },
  link: {
    fonstSize: theme.fontSizes.md,
    color: theme.colors.gray[0],
    textDecoration: 'none',
  }
}))

const Header = () => {

  const { classes } = useStyles();
  return (
    <>
      <header className={classes.header}>
        <Group position='apart'>

          {/* Navigation Routes in Navbar / Header */}

          <Group>
            <Link className={classes.link} to="/" default >Home</Link>
            <Link className={classes.link} to="/settings" default >Settings</Link>
          </Group>
          <Login />
        </Group>
      </header>
    </>
  )
}

export default Header;
