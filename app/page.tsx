import Heading from "./utils/Heading";
import './page.css'
import Header from "./utils/Header";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Heading title="Food Chilli" discription="A Delecious Chillies and Fruit Fusion" keywords="For Everyone, Everywhere"/>
      <Header title={"A Delicious Chillies and Fruit Fusion"} landingPage={true}/>
    </main>
  );
}
