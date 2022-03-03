import 'bulma/css/bulma.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react'
import Context from '../context'

const initialData = Object.freeze({
  email: "",
  password: ""
});

const SignUp = () => {

  const [data, setData] = useState(initialData)

  const handleChange = (event) => {

    setData({
      ...data,
      [event.target.name]: event.target.value.trim()
    });

  }

  const handleSubmit = (event, setContext) => {

    event.preventDefault()

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch("https://caffelytics.com/users/sign-up", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          if( result.success === true ) {
            setContext({
              route: "Dashboard",
              userId: result.user_id,
              token: result.token,
              report: context.report
            })
          } else {
            alert( result.error );
          }
        },
        (error) => {
          alert(error)
        }
      )

  }

  const { context, setContext } = useContext(Context)

  return (
    <section className="hero is-fullheight">
      <div className="hero-head">
      </div>
      <div className="hero-body">
        <section className="container">
          <div className="columns">
            <div className="column">
            </div>
            <div className="column is-two-fifths">
              <form className="box is-centered" onSubmit={(event) => {
                handleSubmit(event, setContext)
              }}>
                <h2 className="title is-2 has-text-centered">
                  Caffelytics <FontAwesomeIcon icon={faMugSaucer}/>
                </h2>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="e.g. alex@example.com">
                    </input>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      onChange={handleChange}
                      type="password"
                      name="password"
                      placeholder="********">
                    </input>
                  </div>
                </div>
                <div className="buttons">
                  <button className="button block">Submit</button>
                  <button onClick={
                    (event) => {
                      event.preventDefault()
                      setContext({
                        route: "SignIn",
                        userId: context.userId,
                        token: context.token,
                        report: context.report
                      })
                    }
                  } className="button block">Cancel</button>
                </div>
              </form>
            </div>
            <div className="column">
            </div>
          </div>
        </section>
      </div>
      <div className="hero-foot">
      </div>
    </section>
  );
}

export default SignUp;
