import { useEffect, useState } from 'react'

import NewsCards from './components/NewsCard'

import SideListItem from './components/SideListItem'

import MainDetail from './components/MainDetail'

import { CRIPTO_LIST } from './constants'
import { STATUS_UPDATES } from './constants'
import { getCriptoUpdateUrl } from './constants'

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null)
  const [coins, setCoins] = useState([])
  const [news, setNews] = useState([])

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id
  }

  // console.log('coins', coins)

  const mainDetailCoin = coins.find(coin => coin.id === selectedCripto)
  // console.log('Selected critp', selectedCripto)
  // console.log('mainDetailCoin', mainDetailCoin)

  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then(response => response.json())
      .then(result => {
        setCoins(result)
      })
  }, [])

  // console.log('Coins', coins)
  let arrayNews = []

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCripto}/status_updates`
    )
      .then(response => response.json())
      .then(result => {
        setNews(result.status_updates)
      })
  }, [selectedCripto])

  console.log('News', news)

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {coins.map(coin => {
            return (
              <SideListItem
                item={coin}
                isSelectedCripto={isSelectedCripto}
                selectCripto={setSelectedCripto}
              />
            )
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto ? (
          <MainDetail mainDetailCoin={mainDetailCoin} />
        ) : (
          'Select a coin bro!'
        )}
        <ul class="newsfeed">
          {/* News feed component needs to go here */}
          {/* {<NewsCards />} */}
        </ul>
      </main>
    </>
  )
}

export default App
