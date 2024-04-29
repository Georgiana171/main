describe("Auth test suite", () =>{
    beforeEach(() => {
        console.log("autentificare before each!"); //ruleaza o singura data
    })
    before(() => {
        console.log("this is a before!"); //ruleaza inainte de fiecare test
    })
    afterEach(() => { 
        console.log("this is an after each!"); //ruleaza o singura data
    })
    after(() => {
        console.log("this is an after!"); //ruleaza dupa fiecare test
    })
    it ("test 1", () => {
        console.log('test 1');
    })
    it ("test 2", () => {
        console.log('test 2');
    })
    it ("test 3", () => {
        console.log('test 3');
    })
})