
import React from 'react'
// build class FORM
// give it a state that is all the stats we want to input.


export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            date: '',
            hits: '',
            abs: '',
            rbis: '',
            hRs: '',
            errors: '',
            injury: '',
            lostTemper: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.logStats = this.logStats.bind(this);
    }

    handleChange(e) {
        // set the state to what is being added in the inputs
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    logStats(e) {
        e.preventDefault();
        const dailyStats = {
            date: this.state.date,
            hits: this.state.hits,
            abs: this.state.abs,
            rbis: this.state.rbis,
            hRs: this.state.hRs,
            errors: this.state.errors,
            injury: this.state.injury,
            lostTemper: this.state.lostTemper
        }

        if (dailyStats.date === '' 
            || dailyStats.hits === '' 
            || dailyStats.abs === '' 
            || dailyStats.rbis === '' 
            || dailyStats.hRs === '' 
            || dailyStats.errors === ''
            || dailyStats.injury === ''
            || dailyStats.lostTemper === ''){

            alert ("please fill in all fields")
        
        } else {    
            // push all the completed inputs to firebase
            const dbRef = firebase.database().ref();
            dbRef.push(dailyStats);
           
            // reset all the inputs to blank
            this.setState({
                date: '',
                hits: '',
                abs: '',
                rbis: '',
                hRs: '',
                errors: '',
                injury: '',
                lostTemper: ''
            });
        }
    }

    // build all the inputs and give them an OnChange prop equal to the value of the function handleChange

    // assing their values to be the corresponing value in the state

    render() {
        return (
            // for the onSubmit listener, make = to the function logStats and define above
            <div className="inputGame">
                
                <form onSubmit={this.logStats}>

                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="date">Date</label>
                        <input name="date" type="text" onChange={this.handleChange} value={this.state.date} />
                    </div>
                    
                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="hits">Hits</label>
                        <input name="hits" type="text" onChange={this.handleChange} value={this.state.hits} />
                    </div>

                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="abs">At Bats</label>
                        <input name="abs" type="text" onChange={this.handleChange} value={this.state.abs} />
                    </div>    
                    
                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="rbis">RBIs</label>
                        <input name="rbis" type="text" onChange={this.handleChange} value={this.state.rbis} />
                    </div>    

                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="hRs">HRs</label>
                        <input name="hRs" type="text" onChange={this.handleChange} value={this.state.hRs} />
                    </div>  
                    
                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="errors">Errors</label>
                        <input name="errors" type="textr" onChange={this.handleChange} value={this.state.errors} />
                    </div>      

                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="injury">Personal Injury</label>
                        <input name="injury" type="text" onChange={this.handleChange} value={this.state.injury} />
                    </div>      

                    <div className="entryBox">
                        <label className="inputLabel" htmlFor="lostTemper">Temper Tantrum</label>
                        <input name="lostTemper" type="text" onChange={this.handleChange} value={this.state.lostTemper} />
                    </div>      

                    <button type="submit">Log Stats</button>
                
                </form>
            </div>

        )
    }
}