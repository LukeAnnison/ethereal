import { useState , useEffect, useContext} from "react";

import { ProviderContext } from "../contexts/providerContext";
import Data from "./Data"
import Balance from "./Balance";


const Earnings = ( {pageContent , setPageContent} ) => {
	const { provider } = useContext(ProviderContext);
	const [balance, setBalance] = useState(null);
	const [earnings, setEarnings] = useState(null);

	console.log('earnings provider', provider)


	useEffect(() => {
chrome.runtime.onMessage.addListener( function(request)
{
    if( request.message === "balance" )
    {
			console.log('earnings', request.balance)
			setBalance(request.balance)
			setEarnings(request.earnings)
    }
})
}, [chrome.runtime.onMessage]);

const getPreviousBalance = async () => {
	chrome.storage.local.get(['balance'], function(result) {
		setBalance(result.balance)
	});
	chrome.storage.local.get(['earnings'], function(result) {
		setEarnings(result.earnings)
	}
	);
}

useEffect(() => {
	getPreviousBalance()
}, [])

	return (
		<>
			<Data balance={balance} earnings={earnings} setPageContent={setPageContent} pageContent={pageContent}/>
		</>
	);
};

export default Earnings;
