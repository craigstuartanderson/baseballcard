import React from 'react';

// build component GAMELIST
// this creates the running list of game by game stats

export default class GameList extends React.Component {

    render() {
        return (
            <div className="backData">
                <h5 className="gameDate">{this.props.date}</h5>
                <div className="gameContainer">
                    <ul className="gameList">
                        <li>
                            <h5>Hits</h5>
                            <h4>{this.props.hits}</h4>
                        </li>
                        <li>
                            <h5>ABs</h5>
                            <h4>{this.props.abs}</h4>
                        </li>
                        <li>
                            <h5>HRs</h5>
                            <h4>{this.props.hRs}</h4>
                        </li>
                        <li>
                            <h5>RBIs</h5>
                            <h4>{this.props.rbis}</h4>
                        </li>
                        <li>
                            <h5>E</h5>
                            <h4>{this.props.errors}</h4>
                        </li>
                        <li>
                            <h5>Injuries</h5>
                            <h4>{this.props.injury}</h4>
                        </li>
                        <li>
                            <h5>Tantrums</h5>
                            <h4>{this.props.lostTemper}</h4>
                        </li>
                    </ul>
                    <button onClick={() => this.props.remove(this.props)}>x </button>
                </div>
            </div>
        )
    }
};