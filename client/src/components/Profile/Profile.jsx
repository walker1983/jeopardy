import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { gamePausedAC } from '../../store/game'
import axios from 'axios'

export default function Profile() {
  const axiosCors = axios.create({ withCredentials: true })
  const dispatch = useDispatch()
  const history = useHistory()
  const style = { margin: '15px' }

  const { name, gameStatus } = useSelector((state) => state)
  const [stats, setStats] = useState({
    games: 0,
    highestScore: 0,
    averageScore: 0,
  })

  const fetchPlayerStats = async () => {
    const response = await axiosCors('http://localhost:3001/stats')
    setStats(response.data)
  }

  useEffect(() => {
    if (gameStatus === 'started') {
      dispatch(gamePausedAC())
    }
    fetchPlayerStats()
  }, [])

  return (
    <div className="profile__container">
      <div className="profile__content">
        <h1 className="profile__username">{name}</h1>
        <br />
        <h2>
          Games:<b>{stats.games}</b>
        </h2>
        <h2>
          Highest Score :<b>{Math.round(Number(stats.highestScore))}</b>
        </h2>
        <h2>
          Average Score :<b>{Math.round(Number(stats.averageScore))}</b>
        </h2>

        <Button
          type="primary"
          size="large"
          style={style}
          onClick={() => history.push('/')}
        >
          Go back
        </Button>
      </div>
    </div>
  )
}
