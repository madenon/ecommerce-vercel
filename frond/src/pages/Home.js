import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VertiCardProduct from '../components/VertalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Les Airpods, la nouvelle technologie"} />
      <HorizontalCardProduct category={"montres"} heading={"Les Montres connectées, Pour le sport"} />
      <VertiCardProduct category={"mobiles"} heading={"Les Téléphones de haut gamme"} />
      <VertiCardProduct category={"souris"} heading={"Les souris pour vos ordinateurs"} />
      <VertiCardProduct category={"télévision"} heading={"Les télévision Plasma pour vos films Football"} />
      <VertiCardProduct category={"camera"} heading={"Les camera Photos  pour  Cérémonies "} />
      <VertiCardProduct category={"earphones"} heading={"Les écouteurs avec fils "} />
      <VertiCardProduct category={"tondeuses"} heading={"Les Tondeuses  pour vos coiffures"} />
      <VertiCardProduct category={"baffe"} heading={"Les Baffe Haut parleurs"} />
      <VertiCardProduct category={"chaussures"} heading={"Chaussures"} />
      <VertiCardProduct category={"chaussures"} heading={"Chaussures"} />
      <VertiCardProduct category={"ordinateur"} heading={"Les Ordinqteurs"} />
      <VertiCardProduct category={"processeur"} heading={"Les Processeurs"} />
      <VertiCardProduct category={"imprimantes"} heading={"Les imprimantes"} />
      <VertiCardProduct category={"réfrigérateur"} heading={"Les Réfrigérateur"} />
      
      



      
    </div>
  )
}

export default Home