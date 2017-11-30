/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import RemoteAll from './remote-all';

class RemoteStoreAll extends Component {
  
  constructor(props) {
    super(props);
    this.products = this.props.data;
    this.filteredData = [];
    this.filtering = {
      currentFilter: { },
      searchText: []
    };
    this.sorting = {
      sortField: '',
      sortOrder: ''
    };
    this.state = {
      data: this.products.slice(0, this.props.sizePerPage),
      totalDataSize: this.products.length,
      sizePerPage: this.props.sizePerPage,
      currentPage: 1
    };
  }
  
  getCurrentData() {
    return (this.filteredData.length > 0) ? this.filteredData : this.products;
  }

  onSortChange(sortName, sortOrder) {
    let products = this.getCurrentData();

    products = this.sort(products, sortName, sortOrder);

    const currentIndex = (this.state.currentPage - 1) * this.state.sizePerPage;
    this.sorting = {
      sortField: sortName,
      sortOrder: sortOrder
    };
    this.setState({
      data: products.slice(currentIndex, currentIndex + this.state.sizePerPage)
    });
  }

  sort(list, sortName, sortOrder) {
    if (sortOrder === 'asc') {
      list.sort(function(a, b) {
        if (parseInt(a[sortName], 10) > parseInt(b[sortName], 10)) {
          return 1;
        } else if (parseInt(b[sortName], 10) > parseInt(a[sortName], 10)) {
          return -1;
        }
        return 0;
      });
    } else {
      list.sort(function(a, b) {
        if (parseInt(a[sortName], 10) > parseInt(b[sortName], 10)) {
          return -1;
        } else if (parseInt(b[sortName], 10) > parseInt(a[sortName], 10)) {
          return 1;
        }
        return 0;
      });
    }

    return list;
  }

  onFilterChange(filterObj, colInfos) {
    let data = [];

    if (Object.keys(filterObj).length === 0) {
      this.filtering.currentFilter = { };
      if (this.filtering.searchText.length > 0) {
        this.filteredData = this.search(this.products, colInfos);
        data = this.filteredData;
      } else {
        this.filteredData = [];
        data = this.products;
      }
    } else {
      this.filtering.currentFilter = filterObj;
      data = this.filter(this.products);
      if (this.filtering.searchText.length > 0) {
        data = this.search(data, colInfos);
      }
      this.filteredData = data;
    }

    if (this.sorting.sortField && this.sorting.sortOrder) {
      data = this.sort(data, this.sorting.sortField, this.sorting.sortOrder);
    }

    this.setState({
      data: data.slice(0, this.state.sizePerPage),
      totalDataSize: data.length,
      currentPage: 1
    });
  }

  filter(products) {
    const currentFilter = this.filtering.currentFilter;
    return products.filter((product) => {
      let valid = true;
      let filterValue;
      for (const key in currentFilter) {
        const targetValue = product[key];
        switch (currentFilter[key].type) {
        case 'NumberFilter': {
          filterValue = parseInt(currentFilter[key].value.number, 10);
          valid = this.filterNumber(targetValue, filterValue, currentFilter[key].value.comparator);
          break;
        }
        default: {
          filterValue = (typeof currentFilter[key].value === 'string') ?
            currentFilter[key].value.toLowerCase() : currentFilter[key].value;
          valid = this.filterText(targetValue, filterValue);
          break;
        }
        }

        if (!valid) {
          break;
        }
      }
      return valid;
    });
  }

  filterNumber(targetVal, filterVal, comparator) {
    let valid = true;
    switch (comparator) {
    case '=': {
      if (targetVal !== filterVal) {
        valid = false;
      }
      break;
    }
    case '>': {
      if (targetVal <= filterVal) {
        valid = false;
      }
      break;
    }
    case '<=': {
      if (targetVal > filterVal) {
        valid = false;
      }
      break;
    }
    default: {
      console.error('Number comparator provided is not supported');
      break;
    }
    }
    return valid;
  }

  filterText(targetVal, filterVal) {
    if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
      return false;
    }

    return true;
  }

  onSearchChange(searchText, colInfos, multiColumnSearch) {
    let data = [];

    const text = searchText.trim();
    if (text === '') {
      this.filtering.searchText = [];
      if (Object.keys(this.filtering.currentFilter).length !== 0) {
        this.filteredData = this.filter(this.products);
        data = this.filteredData;
      } else {
        this.filteredData = [];
        data = this.products;
      }
    } else {
      if (multiColumnSearch) {
        this.filtering.searchText = text.split(' ');
      } else {
        this.filtering.searchText.push(text);
      }
      const products = this.getCurrentData();
      data = this.search(products, colInfos);
      this.filteredData = data;
    }

    if (this.sorting.sortField && this.sorting.sortOrder) {
      data = this.sort(data, this.sorting.sortField, this.sorting.sortOrder);
    }

    this.setState({
      data: data.slice(0, this.state.sizePerPage),
      totalDataSize: data.length,
      currentPage: 1
    });
  }

  search(products, colInfos) {
    const searchText = this.filtering.searchText;
    return products.filter((product) => {
      const keys = Object.keys(product);
      let valid = false;
      for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
        const key = keys[i];
        if (colInfos[key] && product[key]) {
          const { format, filterFormatted, formatExtraData, searchable, hidden } = colInfos[key];
          let targetVal = product[key];
          if (!hidden && searchable) {
            if (filterFormatted && format) {
              targetVal = format(targetVal, product, formatExtraData);
            }
            for (let j = 0, textLength = searchText.length; j < textLength; j++) {
              const filterVal = searchText[j].toLowerCase();
              if (targetVal.toString().toLowerCase().indexOf(filterVal) !== -1) {
                valid = true;
                break;
              }
            }
          }
        }
      }
      return valid;
    });
  }

  onPageChange(page, sizePerPage) {
    const products = this.getCurrentData();

    const currentIndex = (page - 1) * sizePerPage;
    this.setState({
      data: products.slice(currentIndex, currentIndex + sizePerPage),
      currentPage: page
    });
  }

  onSizePerPageList(sizePerPage) {
    const products = this.getCurrentData();

    let currentIndex = (this.state.currentPage - 1) * sizePerPage;
    if (currentIndex > products.length - 1) {
      const lastPage = Math.ceil(products.length / sizePerPage);
      currentIndex = (lastPage - 1) * sizePerPage;
    }
    this.setState({
      data: products.slice(currentIndex, currentIndex + sizePerPage),
      sizePerPage: sizePerPage
    });
  }

  onAddRow(row, colInfos) {
    row.price = parseInt(row.price, 10);
    this.products.push(row);

    if (this.filteredData.length > 0) {
      let isNewRowFiltered = false;
      if (Object.keys(this.filtering.currentFilter).length > 0 &&
        this.filter([ row ]).length === 0) {
        isNewRowFiltered = true;
      }
      if (!isNewRowFiltered && this.filtering.searchText.length > 0 &&
        this.search([ row ], colInfos).length === 0) {
        isNewRowFiltered = true;
      }
      if (!isNewRowFiltered) {
        this.filteredData.push(row);
      }
    }

    let data = this.getCurrentData();

    if (this.sorting.sortField && this.sorting.sortOrder) {
      data = this.sort(data, this.sorting.sortField, this.sorting.sortOrder);
    }

    const currentIndex = (this.state.currentPage - 1) * this.state.sizePerPage;
    this.setState({
      data: data.slice(currentIndex, currentIndex + this.state.sizePerPage),
      totalDataSize: data.length
    });
  }

  onDeleteRow(row) {
    this.products = this.products.filter((product) => {
      return product.id !== row[0];
    });

    if (this.filteredData.length > 0) {
      this.filteredData = this.filteredData.filter((product) => {
        return product.id !== row[0];
      });
    }

    const data = this.getCurrentData();

    // if we removed the last item of the current page, then we will jump to the page before
    const currentPage = (this.state.data.length === 1) ?
      this.state.currentPage - 1 : this.state.currentPage;

    const currentIndex = (currentPage - 1) * this.state.sizePerPage;
    this.setState({
      data: data.slice(currentIndex, currentIndex + this.state.sizePerPage),
      totalDataSize: data.length,
      currentPage: currentPage
    });
  }

  onExportToCSV() {
    return this.getCurrentData();
  }

  render() {
    return (
      <RemoteAll onSortChange={ this.onSortChange.bind(this) }
                 onFilterChange={ this.onFilterChange.bind(this) }
                 onSearchChange={ this.onSearchChange.bind(this) }
                 onPageChange={ this.onPageChange.bind(this) }
                 onSizePerPageList={ this.onSizePerPageList.bind(this) }
                 onAddRow={ this.onAddRow.bind(this) }
                 onDeleteRow={ this.onDeleteRow.bind(this) }
                 onExportToCSV={ this.onExportToCSV.bind(this) }
        { ...this.state } />
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
export default graphql(query)(RemoteStoreAll);