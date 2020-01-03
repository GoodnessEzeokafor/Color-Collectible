import React, { Component } from 'react';
import "./App.css"
export default class Main extends Component {
constructor(props) {
    super(props);
    this.format_date = this.format_date.bind(this);
    this.ownerOf = this.ownerOf.bind(this);

}

 format_date(t) {
    var date =  new Date(parseInt(t));
    return `${date.getDate()}`
  }
   async ownerOf(_id){
   const owner = await  this.props.ColorDapp.methods.ownerOf(parseInt(_id, 10)).call()
   return owner
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
                        placeholder="HOUSE URLe.g www.image.jpg"
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
              <div className="col-md-6 mb-3" key={key}>
                  {/* <div className="token" style={{backgroundImage:`url()`}}></div> */}
                  <img 
                    src={`${color.name}`} 
                    class="img-fluid" 
                    alt="placeholder" />

                <div>
                {/* {color.name} */}
             <p className="mt-3"><b>HOUSE OWNER :</b>
                {color.owner}
             </p>
                {/* <p>{this.ownerOf(`${color.id}`)}</p> */}
             <p><b>HOUSE ID</b>{color.id}</p>
             
                <p>
                    <button
                    onClick ={async (event) =>{
                        event.preventDefault()
                        const id = parseInt(color.id, 10)
                        console.log(id)
                        console.log(typeof id)
                        this.props.ColorDapp.methods.buy(id-1).send({from:this.props.account, value:1*1000000000000000000})
                        .once('receipt', (receipt)=> {
                          console.log(receipt)
                        })

                    }}
                    className = "btn btn-sm btn-primary"
                    >
                        Buy
                    </button>
                </p>
                </div>
              </div>
                    )
              })}
             </div>
            </div>
          </div>
  
            
        );
    }
}