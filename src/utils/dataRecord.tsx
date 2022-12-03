// hook that takes a list of dateRecords and returns them grouped by day
//

import { forEach, groupBy, map } from 'lodash';

export const useGroupedDataRecords = (dataRecords) => {
        const groupedDataRecords = [];
        forEach(dataRecords, (dataRecord) => {
            if (groupedDataRecords.find(group => group.date === dataRecord.date)) {
                groupedDataRecords.find(group => group.date === dataRecord.date).dataRecords.unshift(dataRecord);
            } else {
                groupedDataRecords.push({
                    date: dataRecord.date,
                    dataRecords: [dataRecord]
                });
            
            }
        });
        groupedDataRecords.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        return groupedDataRecords;

}
    
export const titleTruncate = (title: string, amount: number) => {
    if (title.length > amount) {
        return title.substring(0, amount) + '...';
    }
    return title;
}
