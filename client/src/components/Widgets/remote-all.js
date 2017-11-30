import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class RemoteAll extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   
    return (
      <BootstrapTable data={ this.props.data }
                      remote={ true }
                      pagination={ true }
                      search={ true }
                      multiColumnSearch={ true }
                      fetchInfo={ { dataTotalSize: this.props.totalDataSize } }
                      insertRow={ true }
                      deleteRow={ true } selectRow={ { mode: 'radio' } }
                      exportCSV={ true }
                      options={ { sizePerPage: this.props.sizePerPage,
                                  sizePerPageList: [ 5, 10 ],
                                  page: this.props.currentPage,
                                  onPageChange: this.props.onPageChange,
                                  onSizePerPageList: this.props.onSizePerPageList,
                                  onSortChange: this.props.onSortChange,
                                  onFilterChange: this.props.onFilterChange,
                                  onSearchChange: this.props.onSearchChange,
                                  onAddRow: this.props.onAddRow,
                                  onDeleteRow: this.props.onDeleteRow,
                                  onExportToCSV: this.props.onExportToCSV } }>
        <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'
                           filter={ { type: 'TextFilter' } }>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price_usd'
                           dataSort={ true }
                           filter={ { type: 'NumberFilter',
                                      numberComparators: [ '=', '>', '<=' ] } }>
          Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
const query = gql`
{
    coins(limit: 10) {
        id
        rank
        name
        price_usd
        price_btc
        percent_change_1h
        percent_change_24h
        percent_change_7d
    }
}
`;
export default graphql(query)(RemoteAll);