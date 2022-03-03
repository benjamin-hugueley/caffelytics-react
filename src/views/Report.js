import 'bulma/css/bulma.css'
import { useState, useContext, useEffect } from 'react'
import Context from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {

  const { context, setContext } = useContext(Context)

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Maximum Number of Favorite Drinks',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    }
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
        <div className="container">
          <Bar options={options} data={context.report} />
        </div>
      </div>
    </section>
  );

}

export default Report
