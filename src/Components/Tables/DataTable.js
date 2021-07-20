import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  state = {
    items: []
  }

  constructor(props) {
    super(props);
    this.setState({ items: props.items })
  }

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

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate")
    const expiredCount = this.props.items.filter(value => Date.parse(value.expirationDate) < Date.now()).length;
    const servicingCount = this.props.items.filter(value => Date.parse(value.nextServiceDate) < Date.now()).length;

    if (expiredCount > 0 || servicingCount > 0) {
      alert(expiredCount + " Expired Items and " + servicingCount + " for Servicing Items.")
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    const expiredCount = this.props.items.filter(value => Date.parse(value.item.expirationDate) < Date.now()).length;
    const servicingCount = this.props.items.filter(value => Date.parse(value.item.nextServiceDate) < Date.now()).length;
    console.log(this.props.items.length + ", " + expiredCount);
    if (expiredCount > 0 || servicingCount > 0) {
      alert(expiredCount + " Expired Items and " + servicingCount + " for Servicing Items.")
    }
  }

  render() {

    const now = Date.now();
    const items = this.props.items.sort((a,b) =>
          (Date.parse(a.item.nextServiceDate) > Date.parse(b.item.nextServiceDate)) ? -1 : 1 ).map(item => {
        const expired = Date.parse(item.expirationDate) < now;
        const nextServiceDateExpired = Date.parse(item.nextServiceDate) < now;
        return (
        <tr style={{color: expired || nextServiceDateExpired ? "red" : "black"}} key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.item}</td>
          <td>{item.section}</td>
          <td>{item.datePurchased}</td>
            <td>{expired ? "expired!, " : ""} {item.expirationDate}</td>
          <td>{nextServiceDateExpired ? "for servicing!, " : ""} {item.nextServiceDate}</td>
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
              <th>EXPIRATION DATE</th>
            <th>NEXT SERVICE DATE</th>
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