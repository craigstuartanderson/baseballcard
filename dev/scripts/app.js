import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';
import Footer from './footer.js';
import Totals from './totals.js';
import Form from './form.js';
import GameList from './gamelist.js';


const config = {
  apiKey: "AIzaSyALHCn3kkBoo8e15dGBFzmSUc0VLaCCCHk",
  authDomain: "baseball-card.firebaseapp.com",
  databaseURL: "https://baseball-card.firebaseio.com",
  projectId: "baseball-card",
  storageBucket: "",
  messagingSenderId: "187951207144"
};
firebase.initializeApp(config);



class App extends React.Component {
  constructor(){
    super();
    this.state = {
      dayStats: [
        {
          date: '',
          rbis: 0,
          hRs: 0,
          errors: 0,
          hits: 0,
          abs: 0,
          injury: 0,
          lostTemper: 0,
          dL: 0,
          anger:0

        }
      ],
    }

    this.rbisTotal = this.rbisTotal.bind(this);
    this.hRsTotal = this.hRsTotal.bind(this);
    this.errorsTotal = this.hRsTotal.bind(this);
    this.avgTotal = this.avgTotal.bind(this);
    this.removeGame = this.removeGame.bind(this);
    this.injuryTotal = this.injuryTotal.bind(this);
    this.dLStatus = this.dLStatus.bind(this);
  }
  
  
  // go and get the data from firebase.
  // set it to the state of this class
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (gameStats) => {

      const gamesArray = [];
      const gameData = gameStats.val();

      for (let gameKey in gameData) {
        gameData[gameKey].key = gameKey
        
        gamesArray.push(gameData[gameKey]);
      }
      this.setState({
        dayStats: gamesArray
      })

    })
  }
  
  // write a function that removes an entry from the database
  removeGame(game) {
    const dbRef = firebase.database().ref(game.firebaseKey);
    dbRef.remove();
  }
  

  
  // write a series of functions that map through the daily stats array in the state, and return the totals for each category. pass these as props to the Totals component
  rbisTotal(){
    return this.state.dayStats
      .map((game) => game.rbis)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
  }
  hRsTotal(){
    return this.state.dayStats
      .map((game) => game.hRs)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
  }
  errorsTotal(){
    return this.state.dayStats
      .map((game) => game.errors)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
  }
  avgTotal(){
    const hitsTotal = this.state.dayStats
      .map((game) => game.hits)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
    const absTotal = this.state.dayStats
      .map((game) => game.abs)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
      return Math.round((hitsTotal / absTotal) * 1000)
  }
  injuryTotal(){
    return this.state.dayStats
      .map((game) => game.injury)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
  }
  lostTemperTotal(){
    return this.state.dayStats
      .map((game) => game.lostTemper)
      .reduce((tally, nextItem) => new Number(tally) + new Number(nextItem));
  }
  dLStatus(){
    if(this.injuryTotal() > 3){
      return '😷'
    }
  }
  angerStatus(){
    if(this.lostTemperTotal() > 3){
      return '😡'
    }
  }

  render() {
      console.log(this.injuryTotal())
      return (
        <div className="jsxDiv">
          <div className="pageContainer">
            
            <div className="sideInfo">
              <Header />
              <Form />
            </div>

            <section className="card cardFront">
              <div className="cardBorder">
                <div className="playerImage">
                  <img src="http://whatproswear.com/wp-content/uploads/2013/06/jose-bautista-sunglasses-shot.jpg"/>
                </div>
                <div className="playerInfo">
                  <h4>Craig</h4>
                  <h3>Anderson</h3>
                  {/* <h6>HackerYou</h6> */}
                </div>
                <div className="teamInfo">
                  <h5>First Base</h5>
                </div>
                <div className="totalStats">
                  <Totals 
                  rbis={this.rbisTotal()}
                  hRs={this.hRsTotal()}
                  errors={this.errorsTotal()}
                  avg={this.avgTotal()}
                  injury={this.dLStatus()}
                  lostTemper={this.angerStatus()}
                  />
                </div>
              </div>
            

            </section>

            
            <section className="card cardBack">
              <div className="cardBorder">
                <div className="backInfo">
                  <div className="teamLogo">
                    <img src="https://thescore-api-artifacts.s3.amazonaws.com/baseball/team/4/small_logo.png" alt="team logo"/>
                  </div>
                  <div className="playerAvatar">
                    <img src="http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/5890.png&w=350&h=254" alt="player headshot"/>
                  </div>
                </div>
                
                <div className="allgames border">
                  <h3>2017 Season</h3>
                    {this.state.dayStats.map((game) => {
                      return <GameList
                        key={game.key} 
                        date={game.date} 
                        hits={game.hits}
                        abs={game.abs}
                        rbis={game.rbis}
                        hRs={game.hRs}
                        errors={game.errors}
                        remove={this.removeGame}
                        firebaseKey={game.key}
                        injury={game.injury}
                        lostTemper={game.lostTemper}/>
                    })}
                </div>
              </div>

            </section>
          </div>  
          
          <Footer />
        </div>
            
      )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
