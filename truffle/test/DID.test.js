const DID = artifacts.require('DID');
 
// contract 안에서 작성할 시 배포 진행
contract('DID', (account) => {
    // console.log(account); // eth.getAccounts()
 
    let did;
    describe('DID contract', () => {

        // it('DID Contracttttt', async () => {
        //     did = await DID.deployed();
        //     const asdf = await did.userCodeListLength();
        //     // console.log(asdf)

        // });

        // it('registerd', async ()=>{
        //     const identifier = 'a'
        //     const userData = {
        //         userCode : 'aa',
        //         userInfo : 'bb'
        //     }

        //     did = await DID.deployed()
            
        //     await did.registerUser(identifier,userData);
        // })

        // it('userCodeListLength', async () => {

        //     did = await DID.deployed();
        //     const userCodeListLength = await did.userCodeListLength();
        //     console.log(userCodeListLength)
        // })

        // it('getUserInfo',async () => {
        //     did = await DID.deployed();
        //     const getUserInfo = await did.getUserInfo('a');
        //     console.log(getUserInfo)
        // })

        // it('isRegistered',async () => {
        //     did = await DID.deployed();
        //     const isRegistered = await did.isRegistered('a');
        //     console.log(isRegistered)
        // })

        // it('withdrawUser', async () => {
        //     did = await DID.deployed();
        //     await did.withdrawUser('a');
        //     const isRegistered2 = await did.isRegistered('a');
        //     console.log(isRegistered2)

            
        // })

        // it('userCodeListLength', async () => {

        //     did = await DID.deployed();
        //     const userCodeListLength = await did.userCodeListLength();
        //     console.log(userCodeListLength)
        // })

        // it('DID registerUser', async () => {
        //     did = await DID.deployed();
        //     const userCode = 'aaa'
        //     const userInfo = {
        //         userCode : '111',
        //         userInfo : '222'
        //     }
        //     const userCode2 = 'aaaaaaaa'
        //     const userInfo2 = {
        //         userCode : '1111111',
        //         userInfo : '22222222'
        //     }

        //     await did.registerUser(userCode,userInfo);
        //     await did.registerUser(userCode2,userInfo2);


        // })

        // // it('DID userCodeListLength', async () => {
        // //     console.log(account)
        // //     console.log(did.address)
        // // })

        // it('DID getUserInfo', async () => {
        //     const getUserInfo = await did.getUserInfo('aaaaaaaa');
        //     console.log(getUserInfo)
        //     const isRegistered = await did.isRegistered('aaaaaaaa')
        //     console.log(isRegistered)
        // })

        // it('DID withdrawUser', async () => {
        //     await did.withdrawUser('aaaaaaaa')
        //     const isRegistered = await did.isRegistered('aaaaaaaa')
        //     console.log(isRegistered)

        //     const getUserInfo = await did.getUserInfo('aaaaaaaa');
        //     console.log(getUserInfo)

        //     const userCodeListLength = await did.userCodeListLength();
        //     console.log(userCodeListLength)
        // })


        it('asdf', async ()=> {
            did = await DID.deployed();

            const num = 1;
            const name = '승주';
            const job = '개발자';
            const level = 22
            await did.registeredTest(num,name,job,level)
        })

        it('qwer', async () => {
            const ff = await did.showTest(1)
            console.log(ff)
        })




    });
});