import React, { useContext} from "react";
import DataRecord from "./DataRecord";
import Balance from "./Balance";
import {
  getPages,
  deletePage
} from "../utils/page";
import { useGroupedDataRecords } from '../utils/dataRecord';
import { PageContext } from "../contexts/pageContext";
import { map } from "lodash";




const Data = ( { pageContent , setPageContent, balance, earnings}) => {
  const groupedDataRecords = useGroupedDataRecords(pageContent);
  const { page } = useContext(PageContext);


  const handleDelete = async (dataRecord) => {
    console.log("delete", dataRecord);
    await deletePage(dataRecord.url);
    setPageContent(await getPages())
  }

  return (
    <div className={(page == 'my data') ? "data-my-data" : "data"}>
        {map(groupedDataRecords, (group, id) =>   {
          return (
            <>
              <Balance balance={balance} earnings={earnings}/>
              <p className="group-date">{group.date}</p>
              {map(group.dataRecords, (dataRecord, key) => {
                return (
                  <div key={key}> 
                  <DataRecord handleDelete={handleDelete} dataRecord={dataRecord} />
                  </div>
                )
              })}
              </>
          );
        })}

    </div>
  );
};

export default Data;


