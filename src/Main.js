import React, { Component } from 'react';
import "./App.css"
export default class Main extends Component {
constructor(props) {
    super(props);
    this.format_date = this.format_date.bind(this);

}

 format_date(t) {
    var date =  new Date(parseInt(t));
    return `${date.getDate()}`
  }
    render() {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
                <h3 className="mb-2 text-center">ISSUE TOKEN</h3>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    const color = this.color.value
                    this.props.ColorDapp.methods.mint(color).send({from:this.props.account})
                    .once('receipt', (receipt)=> {
                      console.log(receipt)
                    })
                }}
            >
                <div className="form-group mr-sm-2">
                    <p>
                        <input 
                        type="text"
                        className="form-control mb-1"
                        placeholder="e.g #FFFFFF"
                        ref={(input) => {this.color = input}}
                        required
                        />
                    </p>
                    <button 
                    type="submit"
                    value="MINT"
                    className ="btn btn-primary btn-block"
                    >
                        MINT
                    </button>
                </div>
            </form>
            
            </div>
            </main>
             <div className="row text-center mr-auto ml-auto">
             {this.props.colors.map((color, key)=> {
                return(
              <div className="col-md-3 mb-3" key={key}>
                  <div className="token" style={{backgroundColor:color}}></div>
                <div>{color}</div>
              </div>
                    )
              })}
             </div>
            </div>
          </div>
  
            
        );
    }
}