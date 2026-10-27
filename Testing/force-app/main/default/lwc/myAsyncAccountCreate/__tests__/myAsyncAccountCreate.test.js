import {createElement} from 'lwc';
import accountCreator from 'c/myAsyncAccountCreate';
import {createRecord} from 'lightning/uiRecordApi';
import mockCreateRecord from './data/data.json'; 
//mock the createRecord wire adapter 
jest.mock(
    'lightning/uiRecordApi', ()=>{
        return {createRecord:jestfn()};
    }, {virtual:true} //end of inside mock loop1
);//end of the jest outter mock

//describe block creates testSuites
describe('c-my-async-account-creator',()=>{
    afterEach(()=>{
        while(document.body.firstChild){
            document.body.removeChild(document.body.firstChild);
        } //end of while block within afterEachBlock
        jest.clearAllMocks();
    }); //end of afterEachBlock
    it('creates an account record', async ()=>{
        createRecord.mockResolvedValue(mockCreateRecord); 
        const element=createElement('c-my-async-account-create',{is:accountCreator});
        document.body.appendChild(element);
        const inputEl=element.shadowRoot.querySelector('lightning-input');
        inputEl.value='Acme Corp';
        inputEl.dispatchEvent( new CustomEvent('change',{detail:{
            value:'Acme Corp'
        }}));
        const buttonEl=element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();
        await Promise.resolve();

        expect(createRecord).toHaveBeenCalledTimes(1);
        expect(createRecord.toHaveBeenCalledWith({
            apiName:'Account',
            fields:{Name:'Acme Corp'}
        }/*tohaveBeenCalledWIthEnd*/));
    }/*end of the it block*/);
}); //end of describe function block 