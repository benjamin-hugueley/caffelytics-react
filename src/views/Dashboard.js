import 'bulma/css/bulma.css'
import { useState, useContext, useEffect } from 'react'
import Context from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faMinus,
  faHouse,
  faSquarePollHorizontal,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {

  const { context, setContext } = useContext(Context)
  const [ modal, setModal ] = useState({
      status: "modal",
      title: "",
      type: "",
      function: null
  })
  const [ drinks, setDrinks ] = useState([])
  const [ history, setHistory ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);
  const [ reports, setReports ] = useState([]);
  const [ reportType, setReportType ] = useState("favorite_drinks");

  //////////////////////////////////////////////////////////////////
  //////////////////////// Get Reports /////////////////////////////
  //////////////////////////////////////////////////////////////////

  const getReports = async () => {

    const url = `https://caffelytics.com/users/${context.userId}/reports`

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + context.token
      }
    }

    await fetch( url, options )
      .then(res => res.json())
      .then(
        (result) => {
          setReports(result.reports)
        },
        (error) => {
          console.log(error)
        }
      )

  }

  const ReportsList = ( ) => {

    return reports.map( (report) => {

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + context.token
        }
      }

      return (
        <li className="box" key={report._id}>
          <h4 className="title is-4 level is-flex is-justify-content-space-between is-flex-wrap-wrap">
            {report.type === "favorite_drinks" && "Maximize Favorite Drinks"}
            <div class="buttons">
            <button onClick={
              (event) => {
                event.preventDefault()
                const url = `https://caffelytics.com/users/${context.userId}/reports/${report._id}`
                fetch( url, options )
                  .then(res => res.json())
                  .then(
                    (result) => {
                      getReports()
                    },
                    (error) => {
                      console.log(error)
                    }
                  )

              }
            } className="button is-medium">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faMinus} />
              </span>
            </button>
            <button onClick={
              (event) => {
                event.preventDefault()
                setContext({
                  route: "Report",
                  userId: context.userId,
                  token: context.token,
                  report: report.report
                })
              }
            } className="button is-medium">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faSquarePollHorizontal} />
              </span>
            </button>
            </div>
          </h4>
        </li>
      )

    })

  };

  ////////////////////////////////////////////////////////////////////
  //////////////////////// Get Favorites /////////////////////////////
  ////////////////////////////////////////////////////////////////////

  const getFavorites = async () => {

    const url = `https://caffelytics.com/users/${context.userId}/favorites`

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + context.token
      }
    }

    await fetch( url, options )
      .then(res => res.json())
      .then(
        (result) => {
          setFavorites(result.favorites)
        },
        (error) => {
          console.log(error)
        }
      )

  }

  const FavoritesList = ( ) => {

    return favorites.map( (favorite) => {

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + context.token
        }
      }

      return (
        <li className="box" key={favorite._id}>
          <h4 className="title is-4 level is-flex is-justify-content-space-between is-flex-wrap-wrap">
            {favorite.name}
            <button onClick={
              (event) => {
                event.preventDefault()
                const url = `https://caffelytics.com/users/${context.userId}/favorites/${favorite._id}`
                fetch( url, options )
                  .then(res => res.json())
                  .then(
                    (result) => {
                      getFavorites()
                    },
                    (error) => {
                      console.log(error)
                    }
                  )

              }
            } className="button is-medium">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faMinus} />
              </span>
            </button>
          </h4>
        </li>
      )

    })

  };

  //////////////////////////////////////////////////////////////////
  //////////////////////// Get History /////////////////////////////
  //////////////////////////////////////////////////////////////////

  const getHistory = async () => {

    const url = `https://caffelytics.com/users/${context.userId}/history`

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + context.token
      }
    }

    await fetch( url, options )
      .then(res => res.json())
      .then(
        (result) => {
          setHistory(result.history)
        },
        (error) => {
          console.log(error)
        }
      )

  }

  const HistoryList = ( ) => {

    return history.map( (history) => {

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + context.token
        }
      }

      return (
        <li className="box" key={history._id}>
          <h4 className="title is-4 level is-flex is-justify-content-space-between is-flex-wrap-wrap">
            {history.name}
            <button onClick={
              (event) => {
                event.preventDefault()
                const url = `https://caffelytics.com/users/${context.userId}/history/${history._id}`
                fetch( url, options )
                  .then(res => res.json())
                  .then(
                    (result) => {
                      getHistory()
                    },
                    (error) => {
                      console.log(error)
                    }
                  )

              }
            } className="button is-medium">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faMinus} />
              </span>
            </button>
          </h4>
        </li>
      )

    })

  };

  //////////////////////////////////////////////////////////////////
  //////////////////////// Get Drinks //////////////////////////////
  //////////////////////////////////////////////////////////////////

  const getDrinks = async () => {

    const drinksUrl = `https://caffelytics.com/drinks`

    await fetch( drinksUrl )
      .then(res => res.json())
      .then(
        (result) => {
          setDrinks(result.drinks)
        },
        (error) => {
          console.log(error)
        }
      )

  }

  useEffect( () => {
    getHistory()
    getFavorites()
    getReports()
    getDrinks()
  }, [])

  const DrinksList = ( props ) => {

    return drinks.map( (drink) => {

      const data = { drink_id: drink._id };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + context.token
        },
        body: JSON.stringify(data)
      }

      return (
        <li className="box" key={drink._id}>
          <h4 className="title is-4 level is-flex is-justify-content-space-between is-flex-wrap-wrap">
            {drink.name}
            <button onClick={
              (event) => {
                event.preventDefault()
                const url = `https://caffelytics.com/users/${context.userId}/${props.type}`
                fetch( url, options )
                  .then(res => res.json())
                  .then(
                    (result) => {
                      setModal({
                        status: "modal",
                        title: "",
                        type: "",
                        function: null
                      })
                      props.function()
                    },
                    (error) => {
                      console.log(error)
                    }
                  )

              }
            } className="button is-medium">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </h4>
        </li>
      )

    })

  };

  const ReportGenerator = ( props ) => {

    return (
      <div className="is-flex is-justify-content-space-between is-flex-wrap-wrap">
        <div className="select">
          <select onChange={( event ) => {
            setReportType( event.target.value )
            console.log( event.target.value )
          }}>
            <option value="">Select Report</option>
            <option value="favorite_drinks">Maximize my favorite drinks!</option>
          </select>
        </div>
        <button onClick={
          (event) => {
            event.preventDefault()

            const data = { report_type: reportType };

            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.token
              },
              body: JSON.stringify(data)
            }

            const url = `https://caffelytics.com/users/${context.userId}/${props.type}`

            fetch( url, options )
              .then(res => res.json())
              .then(
                (result) => {
                  setModal({
                    status: "modal",
                    title: "",
                    type: "",
                    function: null
                  })
                  props.function()
                },
                (error) => {
                  console.log(error)
                }
              )

          }
        } className="button">
          Generate Report
        </button>
      </div>
    )

  };

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-head">
        <div className="container is-max-desktop">
          <nav className="navbar is-flex is-justify-content-flex-end">
            <span className="navbar-item">
              <button onClick={
                (event) => {
                  event.preventDefault()
                  setContext({
                    route: "Dashboard",
                    userId: context.userId,
                    token: context.token,
                    report: context.report
                  })
                }
              } className="button">
                <span>Caffelytics</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
              </button>
            </span>
            <span className="navbar-item">
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
              } className="button">
                <span>Sign Out</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </span>
              </button>
            </span>
          </nav>
        </div>
      </div>
      <div className="section">
        <div className="container is-max-desktop">
          <div className="card">
            <div className="card-header">
              <h1 className="card-header-title title level">
                History
                <button onClick={
                  (event) => {
                    event.preventDefault()
                    setModal({
                      status: "modal is-active",
                      title: "Select Drink",
                      type: "history",
                      function: getHistory
                    })
                  }
                } className="button is-medium">
                  <span className="icon is-medium">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </h1>
            </div>
            <div className="card-content">
              { history && <HistoryList /> }
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container is-max-desktop">
          <div className="card">
            <div className="card-header">
              <h1 className="card-header-title title level">
                Favorites
                <button onClick={
                  (event) => {
                    event.preventDefault()
                    setModal({
                      status: "modal is-active",
                      title: "Select Favorite",
                      type: "favorites",
                      function: getFavorites
                    })
                  }
                } className="button is-medium">
                  <span className="icon is-medium">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </h1>
            </div>
            <div className="card-content">
              { favorites && <FavoritesList /> }
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container is-max-desktop">
          <div className="card">
            <div className="card-header">
              <h1 className="card-header-title title level">
                Reports
                <button onClick={
                  (event) => {
                    event.preventDefault()
                    setModal({
                      status: "modal is-active",
                      title: "",
                      type: "reports",
                      function: getReports
                    })
                  }
                } className="button is-medium">
                  <span className="icon is-medium">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </h1>
            </div>
            <div className="card-content">
              { reports && <ReportsList /> }
            </div>
          </div>
        </div>
      </div>
      <div className={modal.status}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modal.title}</p>
            <button className="delete" aria-label="close"  onClick={
              (event) => {
                event.preventDefault()
                setModal({
                  status: "modal",
                  title: "",
                  type: "",
                  function: null
                })
              }
            }></button>
          </header>
          <section className="modal-card-body">
            <div className="container">
              { modal.type !== "reports" && <DrinksList type={modal.type} function={modal.function} /> }
              { modal.type === "reports" && <ReportGenerator type={modal.type} function={modal.function} /> }
            </div>
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
    </section>
  );
}

export default Dashboard
