'use strict';

module.exports = function(rows) {

    return rows.map(columns => {

        const out = {};

        columns.forEach(column => {
            out[column.metadata.colName] = column.value;
        });

        return out;
    });
};
