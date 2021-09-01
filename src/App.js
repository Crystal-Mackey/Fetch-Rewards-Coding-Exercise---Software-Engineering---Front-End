import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: []
    };
  }

  async componentDidMount() {
    const response = await fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json');
    const data = await response.json();
    this.setState({ loading: false, list: [...data]});
  }

  render() {
    // Filters out null names and sorts by listId then name
    const items = this.state.list
      .filter((item) => item.name)
      .sort(function(a,b){
        return a.listId - b.listId || +a.name.slice(5) - +b.name.slice(5);
      })

    // Group items by listId
    const group1 = items.filter((item) => item.listId === 1);
    const group2 = items.filter((item) => item.listId === 2);
    const group3 = items.filter((item) => item.listId === 3);
    const group4 = items.filter((item) => item.listId === 4);

    const columns = [
      { field: 'listId', headerName: 'ListId', width: 70 },
      { field: 'name', headerName: 'Name', width: 150 },
    ];
    
    return (
      <div style = {{ height: 635, width: '50%', paddingLeft: '25%'}}>
        <h1>ListId: 1</h1>
        <DataGrid rows={group1} columns={columns} pageSize={10} loading={this.state.loading} />
        <h1>ListId: 2</h1>
        <DataGrid rows={group2} columns={columns} pageSize={10} loading={this.state.loading} />
        <h1>ListId: 3</h1>
        <DataGrid rows={group3} columns={columns} pageSize={10} loading={this.state.loading} />
        <h1>ListId: 4</h1>
        <DataGrid rows={group4} columns={columns} pageSize={10} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;