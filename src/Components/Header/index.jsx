import { Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.blue[7],
    padding: theme.spacing.xl,
    fonstSize: theme.fontSizes.xl,
    color: theme.colors.gray[0],
  }
}))

const Header = () => {
  
  const { classes } = useStyles();
  return (
    <>
      <header className={classes.header}>
        <Text>Home</Text>
      </header>
    </>

  )
}

export default Header;
