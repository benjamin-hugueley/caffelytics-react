import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import Report from './views/Report';
import Context from './context'
import { useState } from 'react'

const App = () => {

  const [context, setContext] = useState({
    route: "SignIn",
    userId: "",
    token: "",
    report: {}
  })

  return (
    <Context.Provider value={{context, setContext}}>
      {context.route === "SignIn" && <SignIn/>}
      {context.route === "SignUp" && <SignUp/>}
      {context.route === "Dashboard" && <Dashboard/>}
      {context.route === "Report" && <Report/>}
    </Context.Provider>
  )

}

export default App
