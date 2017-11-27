import React from "react";

// Totals calculates the totals and averages of the stats and displays

export default class Totals extends React.Component {

    render() {
        return (
            <div className="totals">
                <ul className="totals__stats">
                    <li>
                        <h5>Avg.</h5>
                        <h4>.{this.props.avg}</h4>
                    </li>  
                    <li>
                        <h5>RBIs</h5>
                        <h4>{this.props.rbis}</h4>
                    </li>
                    <li>
                        <h5>HRs</h5>
                        <h4>{this.props.hRs}</h4>
                    </li>
                    <li>
                        <h5>Errors</h5>
                        <h4>{this.props.errors}</h4>
                    </li>
                </ul>
                
                <div className="totals__icons">
                    <h4 className="clutz">{this.props.injury}</h4>
                    <h4 className="hotHead">{this.props.lostTemper}</h4>
                </div>
            </div>
        )
    }
}



