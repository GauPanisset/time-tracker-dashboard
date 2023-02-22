type Props = {
  children: React.ReactNode
}

/**
 * Component implementing the main layout of the application.
 */
const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return <main className="p-4 sm:p-8">{children}</main>
}

export default Layout
