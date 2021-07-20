import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('https://ec2-15-223-0-97.ca-central-1.compute.amazonaws.com:3000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.item}</td>
          <td>{item.section}</td>
          <td>{item.datePurchased}</td>
          <td>{item.propertyNumber}</td>
          <td>{item.description}</td>
          <td>{item.serialNumber}</td>
            <td>{item.amount}</td>
            <td>{item.icsNumber}</td>
            <td>{item.quantity}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ITEM</th>
            <th>DEPT/SECTION</th>
            <th>DATE PURCHASED</th>
            <th>PROPERTY NUMBER</th>
            <th>DESCRIPTION</th>
            <th>SERIAL NUMBER</th>
            <th>AMOUNT</th>
            <th>ICS NUMBER</th>
            <th>QUANTITY</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable