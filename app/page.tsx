import React from 'react';
import Heading from './utils/Heading';
import Header from './utils/Header';

const Home = () => {
 return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Heading title="Food Chilli" description="A Delecious Chillies and Fruit Fusion" keywords="For Everyone, Everywhere"/>
      <Header title="A Delicious Chillies and Fruit Fusion" landingPage={true}/>
    </main>
 );
};

export default Home;