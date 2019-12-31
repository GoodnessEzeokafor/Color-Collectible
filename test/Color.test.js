const Color = artifacts.require("./Color.sol")
// console.log(Color)
require("chai")
    .use(require("chai-as-promised"))
    .should()

contract("Color Collectible",((deployer, user)=>{
    // let contract 
    before(async()=> {
        this.contract = await Color.deployed()
        // console.log(this.contract)
    })
    describe('deployment', async() => {
        it("deploys succesfully", async()=> {
            const address =  this.contract.address
            // console.log(address)
            assert.notEqual(address, "")
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it("has a name", async() => {
            const name = await this.contract.name()
            assert.equal(name, "Color")
        })
        it("has a symbol", async() => {
            const symbol = await this.contract.symbol()
            assert.equal(symbol, "COLOR")
        })
    })

    describe('minting', async() => {
      it("creates a new token", async() => {
          const result = await this.contract.mint("#EC085BE")
          const totalSupply = await this.contract.totalSupply()
          assert.equal(totalSupply, 1)
        //   console.log(result)
        const event = result.logs[0].args
        assert.equal(event.tokenId.toNumber(),1,"id is correct")
        // assert.equal(event.from, "0x00000000000000000000000000000000000")
        // assert.equal(event.to, deployer, "to is correct")

        //failure
        // FAILURE cannot mint the same color twice
        await this.contract.mint("#EC085BE").should.be.rejected;
    })
    })

    describe('indexing', () => {
        it("list clors", async()=> {
            // Mint 3 tokens
            await this.contract.mint("#5386E4")
            await this.contract.mint("#FFFFFF")
            await this.contract.mint("#000000")
            const totalSupply = await this.contract.totalSupply()

            let color
            let result = []
            for(var i=1;i <= totalSupply;i++){
                color = await this.contract.colors(i - 1)
                result.push(color)
            }

            let expected = ["#EC085BE","#5386E4","#FFFFFF", "#000000"]
            assert.equal(result.join(","),expected.join(","))
        })
    })
    
    
    
}))