import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Les Airpods, la nouvelle technologie"} />
      <HorizontalCardProduct category={"montres"} heading={"Les Montres connectées, Pour le sport"} />
      
      <VerticalCardProduct category={"mobiles"} heading={"Les Téléphones de haut gamme"} />
      <VerticalCardProduct category={"souris"} heading={"Les souris pour vos ordinateurs"} />
      <VerticalCardProduct category={"télévision"} heading={"Les télévision Plasma pour vos films Football"} />
      <VerticalCardProduct category={"camera"} heading={"Les camera Photos  pour  Cérémonies "} />
      <VerticalCardProduct category={"earphones"} heading={"Les écouteurs avec fils "} />
      <VerticalCardProduct category={"tondeuses"} heading={"Les Tondeuses  pour vos coiffures"} />
      <VerticalCardProduct category={"baffe"} heading={"Les Baffe Haut parleurs"} />
      <VerticalCardProduct category={"chaussures"} heading={"Chaussures"} />
      <VerticalCardProduct category={"ordinateur"} heading={"Les Ordinqteurs"}  />
      <VerticalCardProduct category={"processeur"} heading={"Les Processeurs"} />
      <VerticalCardProduct category={"imprimantes"} heading={"Les imprimantes"} />
      <VerticalCardProduct category={"réfrigérateur"} heading={"Les Réfrigérateur"} />
      <VerticalCardProduct category={"vetement"} heading={"Les Vetement"} />
      <VerticalCardProduct category={"autres"} heading={"Autres, divers"} />
      
      



      
    </div>
  )
}

export default Home