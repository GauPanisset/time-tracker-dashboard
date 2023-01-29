type Props = {
  children: React.ReactNode
}

/**
 * Component implementing the main layout of the application.
 */
const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default Layout
