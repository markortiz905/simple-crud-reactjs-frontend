import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-date-picker';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    item: '',
    section: '',
    datePurchased: '',
    expirationDate: '',
  nextServiceDate: '',
    propertyNumber: '',
    description: '',
    serialNumber: '',
    amount: '',
    icsNumber: '',
    quantity: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

    onChangeDateExpiration = e => {
        this.setState({expirationDate: e})
    }

    onChangeNextServiceDate = e => {
        this.setState({nextServiceDate: e})
    }

    onChangeDatePurchased = e => {
        this.setState({datePurchased: e})
    }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://ec2-34-222-149-71.us-west-2.compute.amazonaws.com:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        item: this.state.item,
        section: this.state.section,
        datePurchased: this.state.datePurchased,
          expirationDate: this.state.expirationDate,
          nextServiceDate: this.state.nextServiceDate,
        propertyNumber: this.state.propertyNumber,
        description: this.state.description,
        serialNumber: this.state.serialNumber,
        amount: this.state.amount,
        icsNumber: this.state.icsNumber,
        quantity: this.state.quantity
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://ec2-34-222-149-71.us-west-2.compute.amazonaws.com:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        item: this.state.item,
        section: this.state.section,
        datePurchased: this.state.datePurchased,
          expirationDate: this.state.expirationDate,
          nextServiceDate: this.state.nextServiceDate,
        propertyNumber: this.state.propertyNumber,
        description: this.state.description,
        serialNumber: this.state.serialNumber,
        amount: this.state.amount,
        icsNumber: this.state.icsNumber,
        quantity: this.state.quantity
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, item, section, datePurchased, propertyNumber, description, serialNumber, amount, icsNumber, quantity } = this.props.item
      this.setState({ id, item, section, datePurchased, propertyNumber, description, serialNumber, amount, icsNumber, quantity })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="item">Item</Label>
          <Input type="text" name="item" id="item" onChange={this.onChange} value={this.state.item === null ? '' : this.state.item} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Section</Label>
          <Input type="text" name="section" id="section" onChange={this.onChange} value={this.state.section === null ? '' : this.state.section}  />
        </FormGroup>
        <FormGroup>
          <Label for="datePurchased">Date Purchased</Label>
            <br/>
            <DatePicker
                name="datePurchased" id="datePurchased"
                onChange={this.onChangeDatePurchased}
                value={this.state.datePurchased === null ? '' : this.state.datePurchased} />
        </FormGroup>
          <FormGroup>
              <Label for="expirationDate">Expiration Date</Label>
              <br/>
              <DatePicker
                  name="expirationDate" id="expirationDate"
                  onChange={this.onChangeDateExpiration}
                  value={this.state.expirationDate === null ? '' : this.state.expirationDate} />
          </FormGroup>
          <FormGroup>
              <Label for="nextServiceDate">Next Service Date</Label>
              <br/>
              <DatePicker
                  name="nextServiceDate" id="nextServiceDate"
                  onChange={this.onChangeNextServiceDate}
                  value={this.state.nextServiceDate === null ? '' : this.state.nextServiceDate} />
          </FormGroup>
        <FormGroup>
          <Label for="phone">Property Number</Label>
          <Input type="text" name="propertyNumber" id="propertyNumber" onChange={this.onChange} value={this.state.propertyNumber === null ? '' : this.state.propertyNumber}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Description</Label>
          <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description}  placeholder="describe the item..." />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Serial Number</Label>
          <Input type="text" name="serialNumber" id="serialNumber" onChange={this.onChange} value={this.state.serialNumber === null ? '' : this.state.serialNumber}  />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Amount</Label>
          <Input type="text" name="amount" id="amount" onChange={this.onChange} value={this.state.amount === null ? '' : this.state.amount}  />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">ICS Number</Label>
          <Input type="text" name="icsNumber" id="icsNumber" onChange={this.onChange} value={this.state.icsNumber === null ? '' : this.state.icsNumber}  />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Quantity</Label>
          <Input type="text" name="quantity" id="quantity" onChange={this.onChange} value={this.state.quantity === null ? '' : this.state.quantity}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm