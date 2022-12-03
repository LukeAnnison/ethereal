import {useContext} from "react";

import { PageContext} from "../contexts/pageContext";

const Balance = ({balance, earnings}) => {
  const { page } = useContext(PageContext);
  return (

    <>
      {page == 'my data' ? (
			<p className='page-title'>Your Data</p>
      ): (
        <>
      <div className="earnings-section">
        <p className="earnings-title">Balance</p>

          <p className="earnings-amount">{balance} ETRL</p>
      </div>

      <div className="earnings-section">
        <p className="earnings-title">Current Period Earnings</p>
        <p className="earnings-amount">{earnings} ETRL</p>
      </div>
      <p>
        You earn by staking your data. The longer you stake, the more you can
        earn. Deleting items from the list below will decrease the amount of
        earnings this period
      </p>
      </>
      )}

    </>
  );
};

export default Balance;
